import connection from "../connection"
import { DataTypes } from "sequelize"

const MedicineTransaction = connection.define(
   "MedicineTransaction",
   {
      id: {
         type: DataTypes.INTEGER.UNSIGNED,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false,
      },
      pharmacistId: {
         type: DataTypes.INTEGER.UNSIGNED,
         allowNull: false,
      },
      prescriptionId: {
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
      notes: {
         type: DataTypes.TEXT,
         allowNull: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
   },
)

export default MedicineTransaction
