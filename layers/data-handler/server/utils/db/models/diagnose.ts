import connection from "../connection"
import { DataTypes } from "sequelize"

const Diagnose = connection.define(
   "Diagnose",
   {
      id: {
         type: DataTypes.INTEGER.UNSIGNED,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false,
      },
      medicalRecordId: {
         type: DataTypes.INTEGER.UNSIGNED,
         allowNull: false,
      },
      doctorId: {
         type: DataTypes.INTEGER.UNSIGNED,
         allowNull: false,
      },
      icdId: {
         type: DataTypes.INTEGER.UNSIGNED,
         allowNull: false,
      },
      subjective: {
         type: DataTypes.TEXT,
         allowNull: false,
      },
      objective: {
         type: DataTypes.TEXT,
         allowNull: false,
      },
      assessment: {
         type: DataTypes.TEXT,
         allowNull: false,
      },
      plan: {
         type: DataTypes.TEXT,
         allowNull: false,
      },
      notes: {
         type: DataTypes.STRING(255),
         allowNull: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
   },
)

export default Diagnose
