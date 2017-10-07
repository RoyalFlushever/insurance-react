'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('experts', 'email', Sequelize.STRING)
  },

  down: function (queryInterface, Sequelize) {

  }
};
