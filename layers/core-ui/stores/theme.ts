export const useThemeStore = defineStore("theme", () => {
   const value = computed<Theme | null>(() => {
      if (import.meta.client) {
         if (localStorage.getItem("tw-theme") === null) {
            localStorage.setItem("tw-theme", "dagger")
         }
      }
      return localStorage.getItem("tw-theme") as Theme
   })

   function setTheme(theme: Theme) {
      localStorage.setItem("tw-theme", theme)
   }

   return {
      value,
      setTheme
   }
})
