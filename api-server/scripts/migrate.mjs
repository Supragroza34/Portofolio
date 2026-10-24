// Run with: npm run migrate   (reads DATABASE_URL from .env)
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { neon } from '@neondatabase/serverless'

const __dirname = dirname(fileURLToPath(import.meta.url))

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Add it to api-server/.env first.')
  process.exit(1)
}

const sql = neon(process.env.DATABASE_URL)
const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf8')

for (const statement of schema.split(';').map((s) => s.trim()).filter(Boolean)) {
  await sql(statement)
}

console.log('Schema applied.')
