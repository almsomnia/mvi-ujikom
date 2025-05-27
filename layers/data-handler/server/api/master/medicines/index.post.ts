export default defineEventHandler(async (event) => {
   const body = await readBody(event)
   const model = useDbModel().Medicine

   const medicine = await model.create(body)
   return parseResponse(medicine.toJSON(), "Medicine created")
})