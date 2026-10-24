// Creates or updates the single admin login. Run locally — your password never leaves your machine.
// Usage: npm run seed-admin -- <username> <password>
import { neon } from '@neondatabase/serverless'
import bcrypt from 'bcryptjs'

const [username, password] = process.argv.slice(2)

if (!username || !password) {
  console.error('Usage: npm run seed-admin -- <username> <password>')
  process.exit(1)
}
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Add it to api-server/.env first.')
  process.exit(1)
}

const sql = neon(process.env.DATABASE_URL)
const hash = await bcrypt.hash(password, 12)

await sql`
  INSERT INTO admin_user (username, password_hash)
  VALUES (${username}, ${hash})
  ON CONFLICT (username) DO UPDATE SET password_hash = ${hash}
`

console.log(`Admin user "${username}" is ready.`)
