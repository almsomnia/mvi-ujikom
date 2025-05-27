import type { Migration } from "sequelize-cli"

export default <Migration>{
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("medicineTransactions", {
         id: {
            type: Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         pharmacistId: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
         },
         prescriptionId: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
         },
         medicineId: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
         },
         medicineQty: {
            type: Sequelize.DECIMAL(8, 2),
            allowNull: false,
            get() {
               const value = this.getDataValue("medicineQty")
               return Number(value)
            },
         },
         notes: {
            type: Sequelize.TEXT,
            allowNull: true,
         },
         createdAt: Sequelize.DATE,
         updatedAt: Sequelize.DATE,
      })
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("medicineTransactions")
   },
}
