// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from "node:url"
import { join, dirname } from "node:path"

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
   compatibilityDate: "2025-05-15",
   devtools: { enabled: true },
   ssr: false,
   extends: [
      "../layers/core-ui",
      "../layers/data-handler",
      "../layers/utilities",
   ],

   components: [
      {
         path: join(currentDir, "./components"),
         pathPrefix: false,
      },
   ],

   imports: {
      dirs: [
         join(currentDir, "./stores"),
         join(currentDir, "./utils"),
         join(currentDir, "./utils/**"),
      ],
   },
})
