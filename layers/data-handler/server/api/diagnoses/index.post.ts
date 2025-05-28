export default defineEventHandler(async (event) => {
   const body = await readBody(event)
   const model = useDbModel().Diagnose
   const data = await model.create(body)

   const medicalRecord = await useDbModel().MedicalRecord.findByPk(
      body.medicalRecordId,
      { include: [useDbModel().Prescription] }
   )
   if (medicalRecord?.getDataValue("Prescriptions")?.length > 0) {
      await medicalRecord?.update({ status: "DIAGNOSE_HAS_PRESCRIPTION" })
   } else {
      await medicalRecord?.update({ status: "DIAGNOSE_NO_PRESCRIPTION" })
   }

   return parseResponse(data.toJSON(), "Diagnose created")
})
