import type { VercelRequest, VercelResponse } from '@vercel/node'
import bcrypt from 'bcryptjs'
import { sql } from '../../lib/db.js'
import { signToken } from '../../lib/auth.js'
import { applyCors } from '../../lib/cors.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (applyCors(req, res)) return
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { username, password } = req.body ?? {}
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password are required' })
  }

  const rows = await sql`SELECT username, password_hash FROM admin_user WHERE username = ${username} LIMIT 1`
  const user = rows[0]
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ error: 'Invalid username or password' })
  }

  const token = await signToken(user.username)
  res.status(200).json({ token })
}
