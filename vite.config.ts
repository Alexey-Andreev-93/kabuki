import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/kabuki/',
  build: {
    outDir: 'docs',
  },
  plugins: [react()],
})