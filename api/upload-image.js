import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const config = {
  api: { bodyParser: { sizeLimit: '5mb' } },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { key, filename, fileBase64, contentType } = req.body || {}

  if (!key || key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  if (!filename || !fileBase64) {
    return res.status(400).json({ error: 'Missing file data' })
  }

  try {
    const buffer = Buffer.from(fileBase64, 'base64')
    const safeName = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.\-_]/g, '')}`

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(safeName, buffer, {
        contentType: contentType || 'image/jpeg',
        upsert: false,
      })

    if (uploadError) {
      return res.status(500).json({ error: 'Upload failed' })
    }

    const { data } = supabase.storage.from('product-images').getPublicUrl(safeName)

    return res.status(200).json({ url: data.publicUrl })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Something went wrong during upload' })
  }
}