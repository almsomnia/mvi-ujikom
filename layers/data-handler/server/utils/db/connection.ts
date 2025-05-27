import { Sequelize } from "sequelize"

const connection = new Sequelize({
   dialect: "sqlite",
   storage: "./db/db.sqlite",
})

export default connection