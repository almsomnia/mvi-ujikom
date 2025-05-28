export const useMenuStore = defineStore("menu", () => {
   const value = ref<(Menu | string)[]>([
      "",
      {
         icon: "lucide:home",
         pageName: "index",
         title: "Home",
      },
      {
         icon: "lucide:clipboard",
         pageName: "medical-records",
         title: "Medical Records"
      },
      {
         icon: "lucide:users",
         pageName: "patients",
         title: "Patients"
      },
      {
         icon: "lucide:database",
         pageName: "medicines",
         title: "Medicines",
         ignore: !['pharmacist'].includes(useAuthStore().getUser()?.refType as string)
      }
   ])

   return {
      value
   }
})
