// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/style.css'],
  imports: {
    autoImport: true,
    dirs: ['store','composables'],
  },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxt/icon',['@pinia/nuxt',{
    autoImports: ['defineStore', 'storeToRefs', 'acceptHMRUpdate']
  }]],
  plugins: ['~/plugins/toast.js'],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  runtimeConfig: {
    // Private keys are only available on the server
    apiSecret: process.env.NUXT_API_SECRET,
    
    // Public keys that are exposed to the client
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000/api',
      appMode: process.env.APP_MODE
    }
  },
  app: {
    head: {
      script: [
      ]
    }
  }
})
