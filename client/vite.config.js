import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Group9_COMP308Lab1_Ex2/',
  plugins: [react()],
  build: {
    outDir: '../docs',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },
})
