'use strict';
var Contact = require('./contact');

module.exports = function(sequelize, DataTypes) {
    var Client = sequelize.define('client', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        isPro:  {
            type: DataTypes.BOOLEAN
        },
        businessName: {
            type: DataTypes.STRING
        },
        siretNumber: {
            type: DataTypes.STRING
        },
        statusId: {
            type: DataTypes.INTEGER
        },
        vatNumber: {
			type: DataTypes.STRING
		},
        stdPhone: {
			type: DataTypes.STRING
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
        phone: {
			type: DataTypes.STRING
		},
        relationShipManagerId: {
            type: DataTypes.INTEGER
        },
        stateId: {
            type: DataTypes.INTEGER
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
        countryId: {
            type: DataTypes.INTEGER
        },
        businessProviderId: {
            type: DataTypes.INTEGER
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    });

    Client.associate = function(models) {
        Client.hasMany(models.clientContact, { as :'contacts', foreignKey: 'clientId'})
        Client.belongsTo(models.businessStatus, {as: 'businessStatus', foreignKey: 'statusId', foreignKeyConstraint:true});
    };

    return Client;
};
