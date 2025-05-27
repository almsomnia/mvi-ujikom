declare namespace API {
   type Response<T> = {
      meta: {
         success: boolean
         error: string
         message: string
      }
      data: T
   }
}