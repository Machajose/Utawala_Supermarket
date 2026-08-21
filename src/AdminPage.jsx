import { useState } from 'react'

export default function AdminPage() {
  const [key, setKey] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [tab, setTab] = useState('enquiries')
  const [enquiries, setEnquiries] = useState(null)
  const [products, setProducts] = useState(null)
  const [status, setStatus] = useState('idle')
  const [uploading, setUploading] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '', category: '', price: '', image_url: '', featured: false, in_stock: true,
  })

  async function unlock(e) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch(`/api/admin?key=${encodeURIComponent(key)}`)
      if (!res.ok) throw new Error()
      const data = await res.json()
      setEnquiries(data.entries)
      setUnlocked(true)
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  async function loadProducts() {
    const res = await fetch(`/api/admin-products?key=${encodeURIComponent(key)}`)
    const data = await res.json()
    setProducts(data.products)
  }

  function openProductsTab() {
    setTab('products')
    if (!products) loadProducts()
  }

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result.split(',')[1])
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  async function handleFileSelect(e) {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const fileBase64 = await fileToBase64(file)
      const res = await fetch('/api/upload-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, filename: file.name, fileBase64, contentType: file.type }),
      })
      const data = await res.json()
      if (res.ok) {
        setNewProduct((p) => ({ ...p, image_url: data.url }))
      } else {
        alert('Upload failed — try again.')
      }
    } catch {
      alert('Upload failed — try again.')
    } finally {
      setUploading(false)
    }
  }

  async function addProduct(e) {
    e.preventDefault()
    const res = await fetch('/api/admin-products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, ...newProduct }),
    })
    if (res.ok) {
      setNewProduct({ name: '', category: '', price: '', image_url: '', featured: false, in_stock: true })
      loadProducts()
    }
  }

  async function deleteProduct(id) {
    if (!confirm('Remove this product?')) return
    await fetch('/api/admin-products', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, id }),
    })
    loadProducts()
  }

  async function toggleField(product, field) {
    await fetch('/api/admin-products', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, id: product.id, [field]: !product[field] }),
    })
    loadProducts()
  }

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-paper p-8 flex items-center justify-center">
        <form onSubmit={unlock} className="w-full max-w-sm space-y-3">
          <h1 className="font-display font-700 text-2xl text-market-green mb-4">Utawala Admin</h1>
          <input type="password" value={key} onChange={(e) => setKey(e.target.value)}
            placeholder="Admin key" className="w-full rounded-xl border border-ink/15 px-4 py-2" />
          <button className="w-full bg-market-green text-paper font-semibold py-2 rounded-xl">
            {status === 'loading' ? 'Checking…' : 'Enter'}
          </button>
          {status === 'error' && <p className="text-red-600 text-sm">Incorrect key.</p>}
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-paper p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-display font-700 text-3xl text-market-green mb-6">Utawala Supermarket — Admin</h1>

        <div className="flex gap-2 mb-8">
          <button onClick={() => setTab('enquiries')}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${tab === 'enquiries' ? 'bg-market-green text-paper' : 'bg-ink/5 text-ink'}`}>
            Enquiries
          </button>
          <button onClick={openProductsTab}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${tab === 'products' ? 'bg-market-green text-paper' : 'bg-ink/5 text-ink'}`}>
            Products
          </button>
        </div>

        {tab === 'enquiries' && (
          <div className="space-y-4">
            <p className="text-sm text-ink/60">{enquiries?.length ?? 0} enquiries — most recent first</p>
            {enquiries?.length === 0 && <p className="text-ink/60">No enquiries yet.</p>}
            {enquiries?.map((e) => (
              <div key={e.id} className="bg-card rounded-2xl border border-ink/10 p-5 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-market-green">{e.business}</span>
                  <span className="text-xs text-ink/40">{new Date(e.created_at).toLocaleString()}</span>
                </div>
                <dl className="text-sm space-y-1">
                  {Object.entries(e.fields).map(([k, v]) => (
                    <div key={k} className="flex gap-2">
                      <dt className="text-ink/50 capitalize">{k}:</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        )}

        {tab === 'products' && (
          <div>
            <form onSubmit={addProduct} className="bg-card border border-ink/10 rounded-2xl p-5 mb-8 grid sm:grid-cols-2 gap-3">
              <input required placeholder="Name" value={newProduct.name}
                onChange={(e) => setNewProduct((p) => ({ ...p, name: e.target.value }))}
                className="rounded-xl border border-ink/15 px-3 py-2" />
              <input required placeholder="Category" value={newProduct.category}
                onChange={(e) => setNewProduct((p) => ({ ...p, category: e.target.value }))}
                className="rounded-xl border border-ink/15 px-3 py-2" />
              <input placeholder="Price (e.g. KES 450)" value={newProduct.price}
                onChange={(e) => setNewProduct((p) => ({ ...p, price: e.target.value }))}
                className="rounded-xl border border-ink/15 px-3 py-2" />

              <div className="flex items-center gap-3">
                <input type="file" accept="image/*" onChange={handleFileSelect}
                  className="text-sm flex-1" />
                {uploading && <span className="text-xs text-ink/50">Uploading…</span>}
              </div>

              {newProduct.image_url && (
                <div className="sm:col-span-2 flex items-center gap-3">
                  <img src={newProduct.image_url} alt="Preview" className="w-14 h-14 object-contain bg-white rounded-lg border border-ink/10" />
                  <span className="text-xs text-ink/50">Photo uploaded ✓</span>
                </div>
              )}

              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={newProduct.featured}
                  onChange={(e) => setNewProduct((p) => ({ ...p, featured: e.target.checked }))} />
                Featured (shows in Weekly Offers)
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={newProduct.in_stock}
                  onChange={(e) => setNewProduct((p) => ({ ...p, in_stock: e.target.checked }))} />
                In stock
              </label>
              <button disabled={uploading} className="sm:col-span-2 bg-market-green text-paper font-semibold py-2 rounded-xl disabled:opacity-50">
                Add Product
              </button>
            </form>

            <div className="space-y-3">
              {products?.map((p) => (
                <div key={p.id} className="bg-card rounded-2xl border border-ink/10 p-4 flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    {p.image_url && <img src={p.image_url} alt={p.name} className="w-12 h-12 object-contain bg-white rounded-lg" />}
                    <div>
                      <p className="font-semibold text-ink">{p.name}</p>
                      <p className="text-xs text-ink/50">{p.category} · {p.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <button onClick={() => toggleField(p, 'featured')}
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${p.featured ? 'bg-marigold text-market-green' : 'bg-ink/10 text-ink/60'}`}>
                      {p.featured ? '★ Featured' : 'Not Featured'}
                    </button>
                    <button onClick={() => toggleField(p, 'in_stock')}
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${p.in_stock ? 'bg-market-green text-paper' : 'bg-red-100 text-red-700'}`}>
                      {p.in_stock ? 'In Stock' : 'Out of Stock'}
                    </button>
                    <button onClick={() => deleteProduct(p.id)} className="text-red-600 text-xs font-semibold hover:underline">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              {products?.length === 0 && <p className="text-ink/60">No products yet.</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}