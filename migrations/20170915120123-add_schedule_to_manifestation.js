'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return Promise.all([
      queryInterface.addColumn('manifestations', 'category', Sequelize.STRING),
      queryInterface.addColumn('manifestations', 'eventDate', Sequelize.DATE),
      // queryInterface.addColumn('manifestations', 'eventEndDate', Sequelize.DATE);
      // queryInterface.addColumn('manifestations', 'artist', Sequelize.STRING);
      // queryInterface.addColumn('manifestations', 'type', Sequelize.STRING);
      queryInterface.addColumn('manifestations', 'numberInsured', Sequelize.INTEGER),
      queryInterface.addColumn('manifestations', 'budget', Sequelize.INTEGER)
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
