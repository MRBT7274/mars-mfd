import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8087,
    proxy: {
      '/avionics': {
        target: 'http://127.0.0.1:8085',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/avionics/, '')
      },
      '/cameras': {
        target: 'http://127.0.0.1:8086',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cameras/, '')
      },
    }
  }
})
