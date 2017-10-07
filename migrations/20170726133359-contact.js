'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
      'contacts',
      {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        expert_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'experts',
                key: 'id'
            }
        },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        address1: {
            type: Sequelize.STRING
        },
        address2: {
            type: Sequelize.STRING
        },
        zipCode: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        switchboardPhone: {
            type: Sequelize.STRING
        },
        mobile: {
            type: Sequelize.STRING
        },
        fax: {
            type:Sequelize.STRING
        },
        skill: {
            type:Sequelize.STRING
        },
        gender: {
            type: Sequelize.STRING
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: new Date()
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: new Date()
        }
      },
      {
          charset: 'utf8',                    // default: null
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
