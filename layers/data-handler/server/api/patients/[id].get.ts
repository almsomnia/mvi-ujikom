export default defineEventHandler(async (event) => {
   const id = getRouterParam(event, 'id') as string

   const model = useDbModel().Patient
   const data = await model.findByPk(id)

   return parseResponse(data)
})