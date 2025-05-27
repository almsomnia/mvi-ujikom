export default defineEventHandler(async (event) => {
   const model = useDbModel().User
   const data = model.getTableName()

   return {
      data
   }
})