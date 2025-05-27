export const useMenuStore = defineStore("menu", () => {
   const value = ref<(Menu | string)[]>([
      "Home",
      {
         icon: "lucide:home",
         pageName: "index",
         title: "Home",
      },
      "Master Data",
      {
         icon: "lucide:database",
         pageName: "medicines",
         title: "Medicines",
      }
   ])

   return {
      value
   }
})
