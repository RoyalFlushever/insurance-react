'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.createTable(
            'experts',
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                businessName: {
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
                city: {
                    type: Sequelize.STRING
                },
                switchboardPhone: {
                    type: Sequelize.STRING
                },
                country: {
                    type: Sequelize.STRING
                },
                createdAt: {
                    type: Sequelize.DATE
                },
                updatedAt: {
                    type: Sequelize.DATE
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
