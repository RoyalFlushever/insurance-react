"use strict";

module.exports = function(sequelize, DataTypes) {
    var PeopleInfo = sequelize.define("person_info", {
        // column in init migration path
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true

        },
        // column in init migration
        email : {
            type: DataTypes.STRING,
        },
        // column in init migration
        firstName : {
            type: DataTypes.STRING,
        },
        // column in init migration
        lastName : {
            type: DataTypes.STRING,
        },
        // column init migration
        createdAt : {
            type: DataTypes.DATE
        },
        // column in init migration
        updatedAt : {
            type: DataTypes.DATE
        }
    });
    return PeopleInfo;
};