export default function <T> (
   data: T,
   message: string = "",
   error: string = ""
) {
   return {
      meta: {
         success: !error,
         error,
         message,
      },
      data
   }
}