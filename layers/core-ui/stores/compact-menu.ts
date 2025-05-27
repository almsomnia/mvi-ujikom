function getCompactMenu() {
   if (import.meta.client) {
      const item = localStorage.getItem("compactMenu")
      if (item) {
         return item === 'true' ? true : false
      } else {
         return false
      }
   }
   return false
}

export const useCompactMenuStore = defineStore("compact-menu", () => {
   const value = ref(import.meta.client && localStorage.getItem("compactMenu") === null ? false : getCompactMenu())
   const onHover = ref(false)

   const compactMenu = computed(() => {
      if (import.meta.client) {
         if (localStorage.getItem("compactMenu") === null) {
            localStorage.setItem("compactMenu", "false")
         }
      }
      return value.value
   })

   function setCompactMenu(compactMenu: boolean) {
      if (import.meta.client) {
         localStorage.setItem("compactMenu", compactMenu.toString())
      }
      value.value = compactMenu
   }

   function $reset() {
      value.value = false
      onHover.value = false
   }

   return {
      value,
      onHover,
      compactMenu,
      setCompactMenu,
      $reset
   }
})