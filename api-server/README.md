# Admin API (Vercel + Neon + Vercel Blob)

Backs the admin portal on ameytrip.tech: login, blog CRUD, profile photo + CV upload.
The main site stays on GitHub Pages; this is a separate, small API deployed on Vercel.

## One-time setup

1. **Install deps**

   ```sh
   cd api-server
   npm install
   ```

2. **Create `.env`** (copy `.env.example`) with:
   - `DATABASE_URL` — your Neon connection string
   - `JWT_SECRET` — any long random string (e.g. `openssl rand -hex 32`)
   - `ALLOWED_ORIGINS` — the site origins allowed to call this API

3. **Apply the database schema**

   ```sh
   npm run migrate
   ```

4. **Create your admin login** (your password is hashed locally and never leaves your machine):

   ```sh
   npm run seed-admin -- your-username "your password"
   ```

## Deploy to Vercel

```sh
npm i -g vercel   # if you don't have it
cd api-server
vercel link       # create/select a Vercel project, e.g. "ameytrip-api"
```

In the Vercel project dashboard:

- **Storage → Blob**: create a Blob store and connect it to this project (this sets
  `BLOB_READ_WRITE_TOKEN` automatically).
- **Settings → Environment Variables**: add `DATABASE_URL`, `JWT_SECRET`, `ALLOWED_ORIGINS`
  (same values as your local `.env`).

Then deploy:

```sh
vercel --prod
```

Note the deployment URL (e.g. `https://ameytrip-api.vercel.app`) and set it as
`VITE_API_BASE_URL` in the main site's `.env.local` / GitHub Pages build config.

## Routes

| Method | Path                 | Auth | Description               |
| ------ | -------------------- | ---- | -------------------------- |
| POST   | /api/auth/login      | —    | `{username, password}` → `{token}` |
| GET    | /api/blog            | —    | List posts                |
| GET    | /api/blog/slug/:slug | —    | Get one post               |
| POST   | /api/blog            | ✅   | Create post                |
| PUT    | /api/blog/:id        | ✅   | Update post                 |
| DELETE | /api/blog/:id        | ✅   | Delete post                 |
| GET    | /api/assets          | —    | `{profile_photo?, cv_file?}` |
| POST   | /api/assets/photo    | ✅   | Upload profile photo       |
| POST   | /api/assets/cv       | ✅   | Upload CV PDF               |

Protected routes expect `Authorization: Bearer <token>` from `/api/auth/login`.
