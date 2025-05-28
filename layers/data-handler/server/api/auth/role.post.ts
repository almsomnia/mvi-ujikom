export default defineEventHandler(async (event) => {
   const body = await readBody<{ userId: string; role: string }>(event)
   const model = useDbModel().User

   const user = await model.findByPk(body.userId)

   switch (body.role) {
      case "doctor":
         await useDbModel().Doctor.findOne()
            .then(async (res) => {
               await user?.update({ refId: res?.getDataValue("id"), refType: body.role })
            })
      case "nurse":
         await useDbModel().Nurse.findOne()
            .then(async (res) => {
               await user?.update({ refId: res?.getDataValue("id"), refType: body.role })
            })
      case "frontOffice":
         await useDbModel().Nurse.findOne()
            .then(async (res) => {
               await user?.update({ refId: res?.getDataValue("id"), refType: body.role })
            })
      case "pharmacist":
         await useDbModel().Nurse.findOne()
            .then(async (res) => {
               await user?.update({ refId: res?.getDataValue("id"), refType: body.role })
            })
      default: break
   }

   return parseResponse(user?.toJSON() as any, "Role updated")
})
