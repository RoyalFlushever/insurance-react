'use strict';
module.exports = function(sequelize, DataTypes) {
    const contact = sequelize.define('contact', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        expert_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'expert',
                key: 'id'
            }
        },
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
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
        email: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        },
        switchboardPhone: {
            type: DataTypes.STRING
        },
        mobile: {
            type: DataTypes.STRING
        },
        fax: {
            type:DataTypes.STRING
        },
        skill: {
            type:DataTypes.STRING
        },
        gender: {
            type: DataTypes.STRING
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    }, {
        classMethods: {
            associate: (models) => {
                contact.belongsTo(models.experts, {
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                })
            }
        }
    });
    return contact;
};
