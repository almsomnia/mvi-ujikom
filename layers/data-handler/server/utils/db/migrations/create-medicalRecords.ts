import type { Migration } from "sequelize-cli"

export default <Migration>{
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("medicalRecords", {
         id: {
            type: Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         patientId: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
         },
         visitDate: {
            type: Sequelize.DATE,
            allowNull: false,
         },
         createdAt: Sequelize.DATE,
         updatedAt: Sequelize.DATE,
      })
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("medicalRecords")
   },
}
