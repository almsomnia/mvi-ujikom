export default defineNuxtRouteMiddleware(async (to, from) => {
   const excludedRoutes = ['/login']
   const user = useAuthStore().getUser()

   if (!user && !excludedRoutes.includes(to.path)) {
      return navigateTo('/login')
   } else if (user && excludedRoutes.includes(to.path)) {
      if (excludedRoutes.includes(from.path)) {
         return navigateTo('/')
      }
      return navigateTo(from.path)
   }
})