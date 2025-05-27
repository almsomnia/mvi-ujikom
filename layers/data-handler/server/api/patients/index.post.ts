export default defineEventHandler(async (event) => {
   const body = await readBody(event)
   const model = useDbModel().Patient

   body.medicalNumber = new Date().getTime().toString(36) + Math.random().toString(36).substring(2, 15)

   const data = await model.create(body)
   return parseResponse(data.toJSON(), "Patient created")
})