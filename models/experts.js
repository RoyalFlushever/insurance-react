'use strict';
module.exports = function(sequelize, DataTypes) {
    const expert = sequelize.define('expert', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        businessName: {
            type: DataTypes.STRING
        },
        address1: {
            type: DataTypes.STRING
        },
        address2: {
            type: DataTypes.STRING
        },
        zipCode: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        },
        switchboardPhone: {
            type: DataTypes.STRING
        },
        country: {
            type: DataTypes.STRING
        },
        fax: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    }, {
        classMethod: {
            associate: (models) => {
                expert.hasMany(models.contact, {
                    onUpDate: 'CASCADE',
                    onDelete: 'CASCADE',
                })
            }
        }
    });
    return expert;
};
