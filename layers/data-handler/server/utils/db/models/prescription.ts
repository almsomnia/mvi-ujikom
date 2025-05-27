import connection from "../connection"
import { DataTypes } from "sequelize"

const Prescription = connection.define(
   "Prescription",
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
      medicineId: {
         type: DataTypes.INTEGER.UNSIGNED,
         allowNull: false,
      },
      medicineQty: {
         type: DataTypes.DECIMAL(8, 2),
         allowNull: false,
         get() {
            const value = this.getDataValue("medicineQty")
            return Number(value)
         }
      },
      dosageQty: {
         type: DataTypes.DECIMAL(8, 2),
         allowNull: false,
         get() {
            const value = this.getDataValue("dosageQty")
            return Number(value)
         }
      },
      dosageUnit: {
         type: DataTypes.STRING(20),
         allowNull: false,
      },
      dosageTimeOfMeal: {
         type: DataTypes.STRING(255),
         allowNull: false,
      },
      dosageTimeOfDay: {
         type: DataTypes.STRING(255),
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

export default Prescription
