export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    
    return {
      provide: {
        apiBase: config.public.apiBase || 'http://localhost:3000',
        apiVersion: 'v1',
        // Add other global variables here
      }
    }
  })