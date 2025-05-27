export default defineEventHandler(async (event) => {
   const body = await readBody<{ email: string; password: string }>(event)
   const model = useDbModel().User
   const user = await model.unscoped().findOne({ where: { email: body.email }, include: [useDbModel().Doctor] })
   if (!user) {
      setResponseStatus(event, 404)
      return parseResponse(null, "", "User not found")
   }

   if (await useCrypt().compare(body.password, user.getDataValue("password"))) {
      delete user.dataValues.password
      return parseResponse(user.toJSON(), "Login success")
   } else {
      setResponseStatus(event, 401)
      return parseResponse(null, "", "Record does not match")
   }
})
