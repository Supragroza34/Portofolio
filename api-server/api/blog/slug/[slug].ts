import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sql } from '../../../lib/db.js'
import { applyCors } from '../../../lib/cors.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (applyCors(req, res)) return
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const slug = String(req.query.slug)
  const rows = await sql`SELECT * FROM blog_post WHERE slug = ${slug} LIMIT 1`
  if (rows.length === 0) return res.status(404).json({ error: 'Not found' })
  res.status(200).json(rows[0])
}
