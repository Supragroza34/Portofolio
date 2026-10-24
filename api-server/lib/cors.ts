import type { VercelRequest, VercelResponse } from '@vercel/node'

// Comma-separated list of allowed origins, e.g. "https://ameytrip.tech,https://www.ameytrip.tech"
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ?? '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean)

/** Applies CORS headers and handles OPTIONS preflight. Returns true if the request was a
 *  preflight and already handled (caller should return immediately). */
export function applyCors(req: VercelRequest, res: VercelResponse): boolean {
  const origin = req.headers.origin
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  res.setHeader('Vary', 'Origin')

  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return true
  }
  return false
}
