import connection from "../connection"
import { DataTypes } from "sequelize"

const Doctor = connection.define(
   "Doctor",
   {
      id: {
         type: DataTypes.INTEGER.UNSIGNED,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false,
      },
      licenseNumber: {
         type: DataTypes.STRING(255),
         allowNull: false,
      },
      licenseExpireDate: {
         type: DataTypes.DATE,
         allowNull: false,
      },
      registrationNumber: {
         type: DataTypes.STRING(255),
         allowNull: false,
      },
      registrationExpireDate: {
         type: DataTypes.DATE,
         allowNull: false,
      },
      startExperienceDate: {
         type: DataTypes.DATE,
         allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
   },
)

export default Doctor
