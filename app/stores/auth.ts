export const useAuthStore = defineStore("auth", () => {
   const user = ref<Model.User>()
   const getUser = () => user.value

   function $reset() {
      user.value = undefined
   }

   async function login(payload: InferSchema<ReturnType<typeof $authSchema>["login"]>) {
      const result = await $fetch<API.Response<Model.User>>("/api/auth/login", {
         method: "post",
         body: payload
      })

      if (!result.data) {
         return false
      }

      user.value = result.data
      return true
   }

   return {
      user,
      getUser,
      login,
      $reset
   }
}, {
   persist: true
})