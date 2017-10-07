'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return Promise.all(
            [
                queryInterface.createTable(
                    'manifestation_persons',
                    {
                        id: {
                            type: Sequelize.INTEGER,
                            primaryKey: true,
                            autoIncrement: true
                        },
                        manifestationId: {
                            type: Sequelize.INTEGER
                        },
                        band: {
                            type: Sequelize.STRING
                        },
                        function: {
                            type: Sequelize.STRING
                        },
                        replaceable: {
                            type: Sequelize.STRING
                        },
                        age: {
                            type: Sequelize.INTEGER
                        },
                        medicalExamination: {
                            type: Sequelize.STRING
                        },
                        createdAt: {
                            type: Sequelize.DATE,
                        },
                        updatedAt: {
                            type: Sequelize.DATE,
                        }
                    },
                    {
                        charset: 'utf8'
                    }
                ),
                queryInterface.createTable(
                    'manifestation_technicians',
                    {
                        id: {
                            type: Sequelize.INTEGER,
                            primaryKey: true,
                            autoIncrement: true
                        },
                        manifestationId: {
                            type: Sequelize.INTEGER
                        },
                        firstName: {
                            type: Sequelize.STRING
                        },
                        lastName: {
                            type: Sequelize.STRING
                        },
                        age: {
                            type: Sequelize.INTEGER
                        },
                        medicalExamination: {
                            type: Sequelize.STRING
                        },
                        createdAt: {
                            type: Sequelize.DATE,
                        },
                        updatedAt: {
                            type: Sequelize.DATE,
                        }
                    },
                    {
                        charset: 'utf8'
                    }
                )])


            .then(
                function () {
                    //Foreign Key
                    return Promise.all([
                        queryInterface.addConstraint('manifestation_persons', ['manifestationId'], {
                            name: 'manifestationPeople',
                            type: 'FOREIGN KEY',
                            references: { //Required field
                                table: 'manifestations',
                                field: 'id'
                            },
                            onDelete: 'cascade',
                            onUpdate: 'cascade'
                        }),
                        queryInterface.addConstraint('manifestation_technicians', ['manifestationId'], {
                            name: 'manifestationTechnician',
                            type: 'FOREIGN KEY',
                            references: { //Required field
                                table: 'manifestations',
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
        return new Promise.all([
            queryInterface.dropTable('manifestation_persons'),
            queryInterface.dropTable('manifestation_technicians')
        ])
    }
};
