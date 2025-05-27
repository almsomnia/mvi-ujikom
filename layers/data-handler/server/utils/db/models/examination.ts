import connection from "../connection"
import { DataTypes } from "sequelize"

const Examination = connection.define(
   "Examination",
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
      nurseId: {
         type: DataTypes.INTEGER.UNSIGNED,
         allowNull: false,
      },
      bodyHeight: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      bodyWeight: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      systolic: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      diastolic: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
   },
)

export default Examination
