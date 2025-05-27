export const useMenuStore = defineStore("menu", () => {
   const value = ref<(Menu | string)[]>([
      "Dashboard",
      {
         icon: "lucide:home",
         pageName: "index",
         title: "Dashboard",
      },
   ])

   return {
      value
   }
})
