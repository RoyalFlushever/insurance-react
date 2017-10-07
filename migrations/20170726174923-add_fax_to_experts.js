'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('experts', 'fax', Sequelize.STRING)
  },

  down: function (queryInterface, Sequelize) {

  }
};
