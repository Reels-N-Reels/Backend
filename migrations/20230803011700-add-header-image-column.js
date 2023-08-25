'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("blog_posts", "headerImage", {
      type: Sequelize.STRING, // Change the data type according to your needs (e.g., Sequelize.TEXT)
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("blog_posts", "headerImage");
  },
};