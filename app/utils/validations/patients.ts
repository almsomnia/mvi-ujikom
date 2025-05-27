export function $patientSchema() {
   const yup = useYup()

   const create = yup.object({
      name: yup.string().required(),
      identityNumber: yup.string().required(),
      phoneNumber: yup.string().required(),
      dateOfBirth: yup.date().required(),
      placeOfBirth: yup.string().required(),
      gender: yup.string().oneOf(["M", "F"]).required(),
      address: yup.string().required()
   })

   return {
      create
   }
}