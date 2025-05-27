import type { Migration } from "sequelize-cli"

export default <Migration>{
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("diagnoses", {
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
         doctorId: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
         },
         icdId: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
         },
         subjective: {
            type: Sequelize.TEXT,
            allowNull: false,
         },
         objective: {
            type: Sequelize.TEXT,
            allowNull: false,
         },
         assessment: {
            type: Sequelize.TEXT,
            allowNull: false,
         },
         plan: {
            type: Sequelize.TEXT,
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
      await queryInterface.dropTable("diagnoses")
   },
}
