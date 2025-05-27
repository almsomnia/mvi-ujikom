import connection from "../connection"
import { DataTypes } from "sequelize"

const FrontOffice = connection.define(
   "FrontOffice",
   {
      id: {
         type: DataTypes.INTEGER.UNSIGNED,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
   },
)

export default FrontOffice
