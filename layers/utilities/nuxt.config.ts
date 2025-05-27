// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from "node:url"
import { join, dirname } from "node:path"

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
   devtools: { enabled: false },

   modules: ["@vueuse/nuxt", "dayjs-nuxt"],

   // auto-import Pinia stores
   imports: {
      dirs: [join(currentDir, "./stores")],
   },

   dayjs: {
      locales: ["id", "en"],
      defaultLocale: "id",
      defaultTimezone: "Asia/Jakarta",
      plugins: ["timezone", "utc"],
   },
})
