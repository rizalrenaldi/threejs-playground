const { resolve } = require('path')
import { defineConfig } from 'vite'
// import mpa from 'vite-plugin-mpa'

export default defineConfig( {
  // plugins: [
  //   mpa({
  //     open: '/',
  //     scanDir: './src'
  //   })
  // ],
  root: "src",
  publicDir: "../public",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        one: resolve(__dirname, 'src/001/index.html'),
        two: resolve(__dirname, 'src/002/index.html'),
        three: resolve(__dirname, 'src/003/index.html'),
      }
    },
    outDir: "../src/dist",
  }
} )