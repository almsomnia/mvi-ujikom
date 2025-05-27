export function $authSchema() {
   const yup = useYup()

   const login = yup.object({
      email: yup.string().email().required(),
      password: yup.string().required()
   })

   return {
      login
   }
}