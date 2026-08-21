import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

function checkAuth(req) {
  const key = req.method === 'GET' ? req.query.key : req.body?.key
  return key && key === process.env.ADMIN_KEY
}

export default async function handler(req, res) {
  if (!checkAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) return res.status(500).json({ error: 'Could not load products' })
    return res.status(200).json({ products: data })
  }

  if (req.method === 'POST') {
    const { name, category, price, image_url, featured, in_stock } = req.body
    if (!name || !category) {
      return res.status(400).json({ error: 'Name and category are required' })
    }
    const { data, error } = await supabase
      .from('products')
      .insert([{ name, category, price, image_url, featured: !!featured, in_stock: in_stock !== false }])
      .select()
    if (error) return res.status(500).json({ error: 'Could not add product' })
    return res.status(200).json({ product: data[0] })
  }

  if (req.method === 'PATCH') {
    const { id, ...updates } = req.body
    if (!id) return res.status(400).json({ error: 'Product id required' })
    const { error } = await supabase.from('products').update(updates).eq('id', id)
    if (error) return res.status(500).json({ error: 'Could not update product' })
    return res.status(200).json({ ok: true })
  }

  if (req.method === 'DELETE') {
    const { id } = req.body
    if (!id) return res.status(400).json({ error: 'Product id required' })
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) return res.status(500).json({ error: 'Could not delete product' })
    return res.status(200).json({ ok: true })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}