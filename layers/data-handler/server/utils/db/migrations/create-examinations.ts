import type { Migration } from "sequelize-cli"

export default <Migration>{
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("examinations", {
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
         nurseId: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
         },
         bodyHeight: {
            type: Sequelize.INTEGER,
            allowNull: false,
         },
         bodyWeight: {
            type: Sequelize.INTEGER,
            allowNull: false,
         },
         systolic: {
            type: Sequelize.INTEGER,
            allowNull: false,
         },
         diastolic: {
            type: Sequelize.INTEGER,
            allowNull: false,
         },
         createdAt: Sequelize.DATE,
         updatedAt: Sequelize.DATE,
      })
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("examinations")
   },
}
