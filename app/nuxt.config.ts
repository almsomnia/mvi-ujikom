// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
   compatibilityDate: "2025-05-15",
   devtools: { enabled: true },
   extends: [
      "../layers/core-ui",
      "../layers/data-handler",
      "../layers/utilities",
   ],
})
