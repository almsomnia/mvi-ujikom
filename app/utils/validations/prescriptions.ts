export function $prescriptionSchema() {
   const yup = useYup()

   const create = yup.object({
      medicalRecordId: yup.number().required(),
      medicineId: yup.number().required(),
      medicineQty: yup.number().required().positive(),
      dosageQty: yup.number().required().positive(),
      dosageUnit: yup.string().required(),
      dosageTimeOfMeal: yup.string().required(),
      dosageTimeOfDay: yup.string().required(),
      notes: yup.string().notRequired(),
   })

   return {
      create
   }
}