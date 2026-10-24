import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sql } from '../../lib/db.js'
import { requireAuth, AuthError } from '../../lib/auth.js'
import { applyCors } from '../../lib/cors.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (applyCors(req, res)) return

  const id = Number(req.query.id)
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' })

  try {
    await requireAuth(req)
  } catch (err) {
    return res.status(401).json({ error: (err as AuthError).message })
  }

  if (req.method === 'PUT') {
    const { title, slug, excerpt, content_md, cover_image_url, tags } = req.body ?? {}
    const rows = await sql`
      UPDATE blog_post SET
        title = ${title},
        slug = ${slug},
        excerpt = ${excerpt},
        content_md = ${content_md},
        cover_image_url = ${cover_image_url ?? null},
        tags = ${tags ?? []},
        updated_at = now()
      WHERE id = ${id}
      RETURNING *
    `
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' })
    return res.status(200).json(rows[0])
  }

  if (req.method === 'DELETE') {
    await sql`DELETE FROM blog_post WHERE id = ${id}`
    return res.status(204).end()
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
