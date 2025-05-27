import type { Migration } from "sequelize-cli"

export default <Migration>{
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("users", {
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
         email: {
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: true,
         },
         password: {
            type: Sequelize.STRING(255),
            allowNull: false,
         },
         refType: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         refId: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
         },
         createdAt: Sequelize.DATE,
         updatedAt: Sequelize.DATE,
      })
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("users")
   },
}
