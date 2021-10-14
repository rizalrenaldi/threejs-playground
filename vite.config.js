const { resolve } = require('path')
import { defineConfig } from 'vite'

export default defineConfig( {
  plugins:[],
  root: "src",
  publicDir: "../public",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, '001/001.html')
      }
    }
  }
} )