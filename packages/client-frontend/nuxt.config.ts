// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/color-mode',
    'nuxt-icon',
    'nuxt-lodash',
    'nuxt-vitest',
    '@vant/nuxt',
    'tdesign-vue-next/es/nuxt',
  ],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  build: {
    transpile: ['tdesign-vue-next'],
  },
  vite: {
    server: {
      proxy: {
        '/api': {
          target: process.env.VITE_PROXY_TYPE === 'local' ? 'http://localhost:3000' : 'http://easyhappy.top',
          changeOrigin: true,
          // rewrite: (path: string) => path.replace(/^\/api/, ""),
        },
      },
    },
  },
})
