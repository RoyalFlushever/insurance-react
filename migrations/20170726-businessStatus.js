'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.createTable(
            'businessStatuses',
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                label: {
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
                charset: 'utf8'
            }
        )
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('businessStatuses');
    }
};
