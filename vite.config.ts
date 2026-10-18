import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// Project-page GitHub Pages site, served at
// https://supragroza34.github.io/Portofolio/ — base must match the repo name.
export default defineConfig({
  base: '/Portofolio/',
  plugins: [react(), tailwindcss()],
})
