import connection from "../connection"
import { DataTypes } from "sequelize"

const Patient = connection.define(
   "Patient",
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
      identityNumber: {
         type: DataTypes.STRING(16),
         allowNull: false,
      },
      medicalNumber: {
         type: DataTypes.STRING(10),
         allowNull: true,
      },
      phoneNumber: {
         type: DataTypes.STRING(16),
         allowNull: false,
      },
      dateOfBirth: {
         type: DataTypes.DATE,
         allowNull: false
      },
      placeOfBirth: {
         type: DataTypes.STRING(255),
         allowNull: false,
      },
      gender: {
         type: DataTypes.ENUM("M", "F"),
         allowNull: false,
      },
      address: {
         type: DataTypes.TEXT,
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

export default Patient
