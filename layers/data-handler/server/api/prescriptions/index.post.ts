export default defineEventHandler(async (event) => {
   const body = await readBody(event)
   const model = useDbModel().Prescription
   const data = await model.create(body)

   const medicalRecord = await useDbModel().MedicalRecord.findByPk(
      body.medicalRecordId,
      { include: [useDbModel().Diagnose] }
   )

   if (!!medicalRecord?.getDataValue("Diagnose")) {
      await medicalRecord.update({ status: "DIAGNOSE_HAS_PRESCRIPTION" })
   } else {
      await medicalRecord?.update({ status: "PRESCRIPTION_NO_DIAGNOSE" })
   }

   return parseResponse(data.toJSON(), "Prescription created")
})