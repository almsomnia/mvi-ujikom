export function $diagnoseSchema() {
   const yup = useYup()

   const create = yup.object({
      medicalRecordId: yup.number().required(),
      doctorId: yup.number().required(),
      icdId: yup.number().required().positive(),
      subjective: yup.string().required(),
      objective: yup.string().required(),
      assessment: yup.string().required(),
      plan: yup.string().required(),
      notes: yup.string().notRequired(),
   })

   return {
      create
   }
}