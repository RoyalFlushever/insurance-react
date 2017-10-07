'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.createTable(
            'clients',
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                isPro:  {
                    type: Sequelize.BOOLEAN
                },
                businessName: {
                    type: Sequelize.STRING
                },
                siretNumber: {
                    type: Sequelize.STRING
                },
                statusId: {
                    type: Sequelize.INTEGER
                },
                vatNumber: {
                    type: Sequelize.STRING
                },
                stdPhone: {
                    type: Sequelize.STRING
                },
                title: {
                    type: Sequelize.INTEGER
                },
                lastName: {
                    type: Sequelize.STRING
                },
                firstName: {
                    type: Sequelize.STRING
                },
                email: {
                    type: Sequelize.STRING
                },
                phone: {
                    type: Sequelize.STRING
                },
                relationShipManagerId: {
                    type: Sequelize.INTEGER
                },
                stateId: {
                    type: Sequelize.INTEGER
                },
                address: {
                    type: Sequelize.STRING
                },
                addressCompl: {
                    type: Sequelize.STRING
                },
                postalCode: {
                    type: Sequelize.STRING
                },
                city: {
                    type: Sequelize.STRING
                },
                countryId: {
                    type: Sequelize.INTEGER
                },
                businessProviderId: {
                    type: Sequelize.INTEGER
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
        ).then(
            function () {
                //Foreign Key
                return Promise.all([
                    queryInterface.addConstraint('clients', ['statusId'], {
                        name: 'clientHasOnestatus',
                        type: 'FOREIGN KEY',
                        references: { //Required field
                            table: 'businessStatuses',
                            field: 'id'
                        },
                        onDelete: 'cascade',
                        onUpdate: 'cascade'
                    })
                ])
            }
        )
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('clients');
    }
};
