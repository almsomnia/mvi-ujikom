import type { Migration } from "sequelize-cli"

export default <Migration>{
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("doctors", {
         id: {
            type: Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         licenseNumber: {
            type: Sequelize.STRING(255),
            allowNull: false,
         },
         licenseExpireDate: {
            type: Sequelize.DATE,
            allowNull: false,
         },
         registrationNumber: {
            type: Sequelize.STRING(255),
            allowNull: false,
         },
         registrationExpireDate: {
            type: Sequelize.DATE,
            allowNull: false,
         },
         startExperienceDate: {
            type: Sequelize.DATE,
            allowNull: false,
         },
         createdAt: Sequelize.DATE,
         updatedAt: Sequelize.DATE,
      })
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("doctors")
   },
}
