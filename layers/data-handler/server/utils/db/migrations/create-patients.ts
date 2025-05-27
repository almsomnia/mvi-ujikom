import type { Migration } from "sequelize-cli"

export default <Migration>{
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("patients", {
         id: {
            type: Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         name: {
            type: Sequelize.STRING(255),
            allowNull: false,
         },
         identityNumber: {
            type: Sequelize.STRING(16),
            allowNull: false,
         },
         medicalNumber: {
            type: Sequelize.STRING(10),
            allowNull: true,
         },
         phoneNumber: {
            type: Sequelize.STRING(16),
            allowNull: false,
         },
         dateOfBirth: {
            type: Sequelize.DATE,
            allowNull: false,
         },
         placeOfBirth: {
            type: Sequelize.STRING(255),
            allowNull: false,
         },
         gender: {
            type: Sequelize.ENUM("M", "F"),
            allowNull: false,
         },
         address: {
            type: Sequelize.TEXT,
            allowNull: false,
         },
         createdAt: Sequelize.DATE,
         updatedAt: Sequelize.DATE,
      })
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("patients")
   },
}
