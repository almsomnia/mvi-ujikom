import { Op } from "sequelize"

export default defineEventHandler(async (event) => {
   const query = getQuery(event)

   const page = Number(query.page as string) || 1
   const perPage = Number(query.perPage as string) || 10
   const search = query.search as string || ""

   const limit = perPage
   const offset = (page - 1) * perPage

   const model = useDbModel().Icd
   const data = await model.findAndCountAll({
      limit,
      offset,
      where: {
         [Op.or]: [
            { code: { [Op.like]: `%${search}%` } },
            { name: { [Op.like]: `%${search}%` } }
         ]
      }
   })

   return parseResponse({
      page,
      perPage,
      total: data.count,
      data: data.rows
   })
})