import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const key = req.query.key
  const expected = process.env.ADMIN_KEY

  // TEMPORARY DEBUG — remove after we fix this
  return res.status(200).json({
    receivedKey: key,
    receivedLength: key ? key.length : 0,
    expectedKey: expected,
    expectedLength: expected ? expected.length : 0,
    match: key === expected,
  })
}