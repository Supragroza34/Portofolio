import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sql } from '../../lib/db.js'
import { requireAuth, AuthError } from '../../lib/auth.js'
import { applyCors } from '../../lib/cors.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (applyCors(req, res)) return

  if (req.method === 'GET') {
    const rows = await sql`SELECT * FROM blog_post ORDER BY published_at DESC`
    return res.status(200).json(rows)
  }

  if (req.method === 'POST') {
    try {
      await requireAuth(req)
    } catch (err) {
      return res.status(401).json({ error: (err as AuthError).message })
    }

    const { title, slug, excerpt, content_md, cover_image_url, tags } = req.body ?? {}
    if (!title || !slug || !excerpt || !content_md) {
      return res.status(400).json({ error: 'title, slug, excerpt and content_md are required' })
    }

    const rows = await sql`
      INSERT INTO blog_post (title, slug, excerpt, content_md, cover_image_url, tags)
      VALUES (${title}, ${slug}, ${excerpt}, ${content_md}, ${cover_image_url ?? null}, ${tags ?? []})
      RETURNING *
    `
    return res.status(201).json(rows[0])
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
