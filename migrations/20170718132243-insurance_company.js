'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return Promise.all(
            [
                queryInterface.createTable('insurance_companies', {
                        id: {
                            type: Sequelize.INTEGER,
                            primaryKey: true,
                            autoIncrement: true
                        },
                        status: {
                            type: Sequelize.BOOLEAN,
                        },
                        businessName: {
                            type: Sequelize.STRING
                        },
                        rate: {
                            type: Sequelize.FLOAT
                        },
                        siret: {
                            type: Sequelize.STRING
                        },
                        brokerId: {
                            type: Sequelize.STRING
                        },
                        address: {
                            type: Sequelize.STRING
                        },
                        zipCode: {
                            type: Sequelize.STRING
                        },
                        city: {
                            type: Sequelize.STRING
                        },
                        country: {
                            type: Sequelize.STRING
                        },
                        addressAccounting: {
                            type: Sequelize.STRING
                        },
                        zipCodeAccounting: {
                            type: Sequelize.STRING
                        },
                        cityAccounting: {
                            type: Sequelize.STRING
                        },
                        countryAccounting: {
                            type: Sequelize.STRING
                        },
                        legalNotice: {
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
                ),
                queryInterface.createTable(
                    'insurance_companies_users',
                    {
                        id: {
                            type: Sequelize.INTEGER,
                            primaryKey: true,
                            autoIncrement: true
                        },
                        insuranceCompanyId: {
                            type: Sequelize.INTEGER,
                        },
                        userId: {
                            type: Sequelize.INTEGER,
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
            ]
        ).then(
            function () {
                return Promise.all(
                    [
                        queryInterface.addConstraint('insurance_companies_users', ['insuranceCompanyId'], {
                            name: 'pivotInsuranceCompanies',
                            type: 'FOREIGN KEY',
                            references: { //Required field
                                table: 'insurance_companies',
                                field: 'id'
                            },
                            onDelete: 'cascade',
                            onUpdate: 'cascade'
                        }),
                        queryInterface.addConstraint('insurance_companies_users', ['userId'], {
                            name: 'pivotUsers',
                            type: 'FOREIGN KEY',
                            references: { //Required field
                                table: 'users',
                                field: 'id'
                            },
                            onDelete: 'cascade',
                            onUpdate: 'cascade'
                        })
                    ]
                )
            }
        )

    },

    down: function (queryInterface, Sequelize) {
        return new Promise.all(
            [
                queryInterface.removeConstraint('insurance_companies_users', 'pivotInsuranceCompanies'),
                queryInterface.removeConstraint('insurance_companies_users', 'pivotUsers'),

            ]
        ).then(
            function () {
                return new Promise.all(
                    [
                        queryInterface.dropTable('insurance_companies'),
                        queryInterface.dropTable('insurance_companies_users'),
                    ]
                )

            }
        )
    }
};
