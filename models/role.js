"use strict";

module.exports = function(sequelize, DataTypes) {
    var Role = sequelize.define("role", {
        // column in init migration
        id: {
            type: DataTypes.INTEGER ,
            primaryKey: true,
            autoIncrement: true
        },
        // column in init migration
        label : {
            type: DataTypes.STRING,
            unique : true,
        },
        // column in init migration
        nameFr : {
            type: DataTypes.STRING
        },
        // column in init migration
        createdAt: {
            type: DataTypes.DATE
        },
        // column in init migration
        updatedAt: {
            type: DataTypes.DATE
        }
    });
    Role.associate = function(models) {
        Role.belongsToMany(models.right, { as :'rightList', through: 'role_right', foreignKey: 'roleId'})
    };
    return Role;
};


