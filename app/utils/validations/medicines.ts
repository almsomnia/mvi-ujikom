export function $medicineSchema() {
   const yup = useYup()

   const create = yup.object({
      name: yup.string().required(),
      unit: yup.string().required(),
      price: yup.number().required().positive(),
   })

   return {
      create
   }
}