export function $examinationSchema() {
   const yup = useYup()

   const create = yup.object({
      patientId: yup.number().required(),
      nurseId: yup.number().required(),
      bodyHeight: yup.number().required().positive(),
      bodyWeight: yup.number().required().positive(),
      systolic: yup.number().required().positive(),
      diastolic: yup.number().required().positive(),
   })

   return {
      create
   }
}