import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sql } from '../../lib/db.js'
import { applyCors } from '../../lib/cors.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (applyCors(req, res)) return
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const rows = await sql`SELECT key, url, updated_at FROM site_asset`
  const result: Record<string, { url: string; updated_at: string }> = {}
  for (const row of rows) {
    result[row.key as string] = { url: row.url as string, updated_at: row.updated_at as string }
  }
  res.status(200).json(result)
}
