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
      hooks: {
         afterFind: (_result) => {
            const result = Array.isArray(_result) ? _result : [_result]

            for (const instance of result) {
               if (
                  instance.refType === "doctor" &&
                  instance.Doctor !== undefined
               ) {
                  instance.dataValues.ref = instance.Doctor
                  delete instance.Doctor
                  delete instance.dataValues.Doctor
               } else if (
                  instance.refType === "nurse" &&
                  instance.Nurse !== undefined
               ) {
                  instance.dataValues.ref = instance.Nurse
                  delete instance.Nurse
                  delete instance.dataValues.Nurse
               } else if (
                  instance.refType === "frontOffice" &&
                  instance.FrontOffice !== undefined
               ) {
                  instance.dataValues.ref = instance.FrontOffice
                  delete instance.FrontOffice
                  delete instance.dataValues.FrontOffice
               } else if (
                  instance.refType === "pharmacist" &&
                  instance.Pharmacist !== undefined
               ) {
                  instance.dataValues.ref = instance.Pharmacist
                  delete instance.Pharmacist
                  delete instance.dataValues.Pharmacist
               }
            }
         },
      },
   }
)

export default User
