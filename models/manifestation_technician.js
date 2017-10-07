"use strict";

module.exports = function(sequelize, DataTypes) {
    var manifestationTechnician = sequelize.define("manifestation_technician", {
        // column in init migration path
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        manifestationId: {
            type: DataTypes.INTEGER,
        },
        // column in init migration
        firstName : {
            type: DataTypes.STRING,
        },
        // column in init migration
        lastName : {
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
    }, {
        tableName: 'manifestation_technicians' // THIS LINE HERE
    });
    return manifestationTechnician;
};