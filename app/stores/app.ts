import { type ToastMessageOptions } from "primevue/toast"

namespace Store {
   export namespace App {
      export type Dialog = {
         show: boolean
         title: string
         body: ReturnType<typeof h>
         width: "auto" | `${number}px` | `${number}rem` | `${number}%`
         callback: Function
         closable: boolean
      }
   }
}

export const useAppStore = defineStore('app', () => {
   const dialog = ref<Store.App.Dialog>({
      show: false,
      title: "",
      body: h("div"),
      width: "auto",
      callback: () => {},
      closable: true,
   })

   function showDialog(
      title: string,
      body: ReturnType<typeof h>,
      opts?: Partial<Pick<Store.App.Dialog, "width" | "callback" | "closable">>
   ) {
      dialog.value.title = title
      dialog.value.body = body
      dialog.value.width = opts?.width ?? "auto"
      dialog.value.callback = opts?.callback ?? (() => {})
      dialog.value.closable = opts?.closable ?? true
      dialog.value.show = true
   }

   function closeDialog() {
      dialog.value.show = false
      setTimeout(() => {
         dialog.value.title = ""
         dialog.value.body = h("div")
         dialog.value.width = "auto"
         dialog.value.callback = () => {}
         dialog.value.closable = true
      }, 500)
   }

   function notify(
      severity: Exclude<ToastMessageOptions["severity"], undefined>,
      title: string,
      detail: string,
      life?: number
   ) {
      const toast = useNuxtApp().vueApp.config.globalProperties.$toast
      toast.add({
         severity,
         summary: title,
         detail,
         life: life ?? 5000,
      })
   }

   function $reset() {
      dialog.value = {
         show: false,
         title: "",
         body: h("div"),
         width: "auto",
         callback: () => {},
         closable: true,
      }
   }

   return {
      dialog,
      showDialog,
      closeDialog,
      notify,
      $reset,
   }
})