'use strict';
module.exports = function(sequelize, DataTypes) {
    const ClientContact = sequelize.define('clientContact', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        clientId: {
            type: DataTypes.INTEGER
        },
        title: {
            type: DataTypes.INTEGER
        },
        lastName: {
            type: DataTypes.STRING
        },
        firstName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        fax: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        mobile: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        addressCompl: {
            type: DataTypes.STRING
        },
        postalCode: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    });

    ClientContact.associate = function(models) {
        ClientContact.belongsTo(models.client, {as: 'client', foreignKey: 'clientId', foreignKeyConstraint:true});
    };

    return ClientContact;
};
