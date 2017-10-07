"use strict";

module.exports = function(sequelize, DataTypes) {
    var PeopleInfo = sequelize.define("role_right", {
        // column in init migration path
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true

        },
        // column in init migration
        rightId : {
            type: DataTypes.STRING,
        },
        // column in init migration
        roleId : {
            type: DataTypes.STRING,
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    });
    return PeopleInfo;
};