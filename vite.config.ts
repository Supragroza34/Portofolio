import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// Served at the custom domain https://ameytrip.tech via the public/CNAME file,
// so the site is hosted at the domain root rather than under /Portofolio/.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})
