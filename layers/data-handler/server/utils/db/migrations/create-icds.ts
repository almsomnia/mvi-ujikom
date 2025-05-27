import type { Migration } from "sequelize-cli"

export default <Migration>{
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("icds", {
         id: {
            type: Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         code: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         name: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         createdAt: Sequelize.DATE,
         updatedAt: Sequelize.DATE,
      })
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("icds")
   },
}
