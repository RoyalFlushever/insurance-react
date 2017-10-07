'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('manifestations', 'sortPDF', Sequelize.INTEGER)
  },

  down: function (queryInterface, Sequelize) {

  }
};
