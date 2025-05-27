export default defineEventHandler(async (event) => {
   const query = getQuery(event)

   const page = Number(query.page as string) || 1
   const perPage = Number(query.perPage as string) || 10

   const limit = perPage
   const offset = (page - 1) * perPage

   const model = useDbModel().Medicine
   const data = await model.findAndCountAll({ limit, offset })

   return parseResponse({
      page,
      perPage,
      total: data.count,
      data: data.rows
   })
})