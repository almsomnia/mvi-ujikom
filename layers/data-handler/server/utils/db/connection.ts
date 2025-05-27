import { Sequelize } from "sequelize"

const connection = new Sequelize({
   dialect: "sqlite",
   storage: "../layers/data-handler/server/utils/db/db.sqlite",
})

export default connection