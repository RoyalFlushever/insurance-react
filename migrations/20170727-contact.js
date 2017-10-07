'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.createTable(
            'clientContacts',
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                clientId: {
                    type: Sequelize.INTEGER
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
                fax: {
                    type: Sequelize.STRING
                },
                phone: {
                    type: Sequelize.STRING
                },
                mobile: {
                    type: Sequelize.STRING
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
                    queryInterface.addConstraint('clientContacts', ['clientId'], {
                        name: 'contactHasClient',
                        type: 'FOREIGN KEY',
                        references: { //Required field
                            table: 'clients',
                            field: 'id'
                        },
                        onDelete: 'cascade',
                        onUpdate: 'cascade'
                    })
                    ])
            })
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('clientContacts');
    }
};
