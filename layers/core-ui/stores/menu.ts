export const useMenuStore = defineStore("menu", () => {
   const value = ref<(Menu | string)[]>([
      "Dashboard",
      {
         icon: "lucide:home",
         pageName: "index",
         title: "Dashboard",
      },
      {
         icon: "lucide:package",
         title: "Paket",
         subMenu: [
            {
               icon: "lucide:package",
               title: "Paket Hehe"
            },
            {
               icon: "lucide:package",
               title: "Paket Hehe 2"
            },
         ]
      },
      {
         icon: "lucide:home",
         title: "Dashboard 2",
      },
      {
         icon: "lucide:package",
         title: "Paket",
         subMenu: [
            {
               icon: "lucide:package",
               title: "Paket Hehe"
            },
            {
               icon: "lucide:package",
               title: "Paket Hehe 2"
            },
         ]
      },
   ])

   return {
      value
   }
})
