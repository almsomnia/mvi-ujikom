import type { Migration } from "sequelize-cli"

export default <Migration>{
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("medicines", {
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
         unit: {
            type: Sequelize.STRING(255),
            allowNull: false,
         },
         price: {
            type: Sequelize.DECIMAL(13, 2),
            allowNull: false,
            get() {
               const value = this.getDataValue("price")
               return Number(value)
            },
         },
         createdAt: Sequelize.DATE,
         updatedAt: Sequelize.DATE,
      })
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("medicines")
   },
}
