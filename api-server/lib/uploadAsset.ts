import { put } from '@vercel/blob'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sql } from './db.js'
import { requireAuth, AuthError } from './auth.js'

const MAX_BYTES = 8 * 1024 * 1024 // 8MB

export async function handleAssetUpload(
  req: VercelRequest,
  res: VercelResponse,
  key: 'profile_photo' | 'cv_file',
  allowedContentTypes: string[],
) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    await requireAuth(req)
  } catch (err) {
    return res.status(401).json({ error: (err as AuthError).message })
  }

  const { filename, contentType, dataBase64 } = req.body ?? {}
  if (!filename || !contentType || !dataBase64) {
    return res.status(400).json({ error: 'filename, contentType and dataBase64 are required' })
  }
  if (!allowedContentTypes.includes(contentType)) {
    return res.status(400).json({ error: `Unsupported content type: ${contentType}` })
  }

  const buffer = Buffer.from(dataBase64, 'base64')
  if (buffer.byteLength > MAX_BYTES) {
    return res.status(413).json({ error: 'File too large (max 8MB)' })
  }

  const blob = await put(`${key}/${Date.now()}-${filename}`, buffer, {
    access: 'public',
    contentType,
    addRandomSuffix: true,
  })

  await sql`
    INSERT INTO site_asset (key, url, updated_at)
    VALUES (${key}, ${blob.url}, now())
    ON CONFLICT (key) DO UPDATE SET url = ${blob.url}, updated_at = now()
  `

  res.status(200).json({ url: blob.url })
}
