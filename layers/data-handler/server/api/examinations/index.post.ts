export default defineEventHandler(async (event) => {
   const body = await readBody(event)
   const { patientId, ...rest } = body
   const mrModel = useDbModel().MedicalRecord
   const model = useDbModel().Examination

   const mrData = await mrModel.create({
      visitDate: new Date(),
      patientId: patientId,
      status: "WAITING_FOR_DIAGNOSIS"
   })

   const data = await model.create({
      ...rest,
      medicalRecordId: mrData.getDataValue("id")
   })

   return parseResponse(data.toJSON(), "Examination created")
})