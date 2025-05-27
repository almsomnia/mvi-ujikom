import type { Migration } from "sequelize-cli"

export default <Migration>{
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("prescriptions", {
         id: {
            type: Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         medicalRecordId: {
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
         dosageQty: {
            type: Sequelize.DECIMAL(8, 2),
            allowNull: false,
            get() {
               const value = this.getDataValue("dosageQty")
               return Number(value)
            },
         },
         dosageUnit: {
            type: Sequelize.STRING(20),
            allowNull: false,
         },
         dosageTimeOfMeal: {
            type: Sequelize.STRING(255),
            allowNull: false,
         },
         dosageTimeOfDay: {
            type: Sequelize.STRING(255),
            allowNull: false,
         },
         notes: {
            type: Sequelize.STRING(255),
            allowNull: true,
         },
         createdAt: Sequelize.DATE,
         updatedAt: Sequelize.DATE,
      })
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("prescriptions")
   },
}
