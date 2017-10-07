"use strict";

module.exports = function(sequelize, DataTypes) {
    var manifestationPerson = sequelize.define("manifestation_person", {
        // column in init migration path
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        manifestationId: {
            type: DataTypes.INTEGER,
        },
        band: {
            type: DataTypes.STRING,
        },
        // column in init migration
        function : {
            type: DataTypes.STRING,
        },
        // column in init migration
        replaceable : {
            type: DataTypes.STRING,
        },
        // column in init migration
        age : {
            type: DataTypes.INTEGER,
        },
        // column in init migration
        medicalExamination : {
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
    },{
        tableName: 'manifestation_persons' // THIS LINE HERE
    });
    return manifestationPerson;
};