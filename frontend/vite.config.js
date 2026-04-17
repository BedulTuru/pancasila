import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['garuda.svg', 'garuda.png'],
      manifest: {
        name: 'Pancasila Edu Portal',
        short_name: 'PancasilaEdu',
        description: 'Portal Edukasi Pancasila dan Wawasan Kebangsaan Indonesia',
        theme_color: '#EF4444',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'garuda.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'garuda.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'garuda.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  server: {
    host: true,
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      }
    }
  },
  preview: {
    host: true,
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      }
    }
  }
})
