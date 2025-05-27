import connection from "../connection"
import { DataTypes } from "sequelize"

const MedicalRecord = connection.define(
   "MedicalRecord",
   {
      id: {
         type: DataTypes.INTEGER.UNSIGNED,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false,
      },
      patientId: {
         type: DataTypes.INTEGER.UNSIGNED,
         allowNull: false,
      },
      visitDate: {
         type: DataTypes.DATE,
         allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
   },
)

export default MedicalRecord
