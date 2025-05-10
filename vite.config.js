import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@bootstrap': 'bootstrap',
    },
  },
  optimizeDeps: {
    include: ['jquery', 'popper.js'],
  },
  server: {
    cors: {
      origin: ['http://localhost:5173', 'http://orphanage-app.s3-website.eu-north-1.amazonaws.com'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
    },
    headers: {
      'Access-Control-Allow-Origin': 'http://orphanage-app.s3-website.eu-north-1.amazonaws.com',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
      'Cross-Origin-Embedder-Policy': 'credentialless',
      'Cross-Origin-Resource-Policy': 'cross-origin',
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
      'X-Frame-Options': 'ALLOW-FROM https://d2juehb48y1ziv.cloudfront.net',

    },
    https: false,
    hmr: {
      host: 'localhost',
      port: 5173
    }
  }
});