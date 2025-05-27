// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from "node:url"
import { join, dirname } from "node:path"
import { preset } from "./theme"

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
   compatibilityDate: "2025-05-09",
   devtools: { enabled: true },

   css: [
      join(currentDir, "./assets/css/main.css"),
      join(currentDir, "./assets/css/components/global.css"),
      join(currentDir, "./assets/css/vendors/simplebar.css"),
   ],
   modules: [
      "@primevue/nuxt-module",
      "@pinia/nuxt",
      "@nuxt/icon",
      "@nuxt/fonts"
   ],
   components: [
      {
         path: join(currentDir, "./components"),
         pathPrefix: false,
      },
   ],
   imports: {
      dirs: [join(currentDir, "./stores")],
   },

   primevue: {
      options: {
         theme: {
            preset: preset,
            options: {
               darkModeSelector: ".dark-mode",
               cssLayer: {
                  name: "primevue",
                  order: "theme, base, primevue",
               },
            },
         },
      },
   },

   postcss: {
      plugins: {
         "@tailwindcss/nesting": {},
         "@tailwindcss/postcss": {},
         "postcss-advanced-variables": {},
         autoprefixer: {},
      },
   },
})
