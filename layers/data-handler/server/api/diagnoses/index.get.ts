export default defineEventHandler(async (event) => {
   const query = getQuery(event)

   const medicalRecordId = query.medicalRecordId as string

   const page = Number(query.page as string) || 1
   const perPage = Number(query.perPage as string) || 10

   const limit = perPage
   const offset = (page - 1) * perPage

   const model = useDbModel().Diagnose
   const data = await model.findAndCountAll({
      limit,
      offset,
      where: { medicalRecordId: medicalRecordId },
   })

   return parseResponse({
      page,
      perPage,
      total: data.count,
      data: data.rows,
   })
})
