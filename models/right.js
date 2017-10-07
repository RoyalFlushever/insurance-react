"use strict";

module.exports = function(sequelize, DataTypes) {
    var Right = sequelize.define("right", {
        // column in init migration
        id: {
            type: DataTypes.INTEGER ,
            primaryKey: true,
            autoIncrement: true
        },
        // column in init migration
        label : {
            type: DataTypes.STRING,
            unique : true
        },
        // column in init migration
        nameFr : {
            type: DataTypes.STRING,
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    });
    Right.associate = function(models) {
        // This will create the table PersonChildren which stores the ids of the objects.
        Right.belongsToMany(models.role, { through: 'role_right', foreignKey: 'rightId'})

    };


    return Right;
};


