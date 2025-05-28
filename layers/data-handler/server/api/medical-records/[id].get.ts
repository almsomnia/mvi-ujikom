export default defineEventHandler(async (event) => {
   const id = getRouterParam(event, "id") as string

   const model = useDbModel().MedicalRecord
   const data = await model.findByPk(id, {
      include: [
         useDbModel().Patient,
         {
            model: useDbModel().Examination,
            include: [
               {
                  model: useDbModel().Nurse,
                  include: [useDbModel().User],
               },
            ],
         },
         {
            model: useDbModel().Diagnose,
            include: [
               useDbModel().Icd,
               {
                  model: useDbModel().Doctor,
                  include: [useDbModel().User],
               },
            ],
         },
         {
            model: useDbModel().Prescription,
            include: [useDbModel().Medicine],
         },
      ],
   })

   return parseResponse(data)
})
