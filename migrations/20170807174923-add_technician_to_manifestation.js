'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('manifestations', 'isTechnicianIndispensable', Sequelize.BOOLEAN)
  },

  down: function (queryInterface, Sequelize) {

  }
};
