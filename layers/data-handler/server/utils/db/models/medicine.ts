import connection from "../connection"
import { DataTypes } from "sequelize"

const Medicine = connection.define(
   "Medicine",
   {
      id: {
         type: DataTypes.INTEGER.UNSIGNED,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false,
      },
      name: {
         type: DataTypes.STRING(255),
         allowNull: false,
      },
      unit: {
         type: DataTypes.STRING(255),
         allowNull: false,
      },
      price: {
         type: DataTypes.DECIMAL(13, 2),
         allowNull: false,
         get() {
            const value = this.getDataValue("price")
            return Number(value)
         }
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
   },
)

export default Medicine
