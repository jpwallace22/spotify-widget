import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    envPrefix: 'M_VITE'
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    envPrefix: 'P_VITE'
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [solid()],
    envPrefix: 'R_VITE'
  }
})
