'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('manifestation_dates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      manifestationId: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      country: {
        type: Sequelize.STRING
      },
      zipCode: {
        type: Sequelize.STRING
      },
      place: {
        type: Sequelize.STRING
      },
      scene: {
        type: Sequelize.STRING
      },
      damageBasis: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
        allowNull: true,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    //return queryInterface.dropTable('manifestation_dates');
  }
};
