export default defineEventHandler(async (event) => {
   const body = await readBody(event)
   const model = useDbModel().Diagnose
   const data = await model.create(body)

   return parseResponse(data.toJSON(), "Diagnose created")
})