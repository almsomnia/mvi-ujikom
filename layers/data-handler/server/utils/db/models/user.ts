import connection from "../connection"
import { DataTypes } from "sequelize"

const User = connection.define(
   "User",
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
      email: {
         type: DataTypes.STRING(255),
         allowNull: false,
         unique: true,
      },
      password: {
         type: DataTypes.STRING(255),
         allowNull: false,
      },
      refType: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      refId: {
         type: DataTypes.INTEGER.UNSIGNED,
         allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
   },
   {
      defaultScope: {
         attributes: {
            exclude: ["password"],
         },
      },
   }
)

export default User
