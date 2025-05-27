export const useMenuStore = defineStore("menu", () => {
   const value = ref<(Menu | string)[]>([
      "Home",
      {
         icon: "lucide:home",
         pageName: "index",
         title: "Home",
      },
      "Patients",
      {
         icon: "lucide:users",
         pageName: "patients",
         title: "Patients"
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
