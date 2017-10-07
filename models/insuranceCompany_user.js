"use strict";

module.exports = function(sequelize, DataTypes) {
    var InsuranceCompaniesUsers = sequelize.define("insuranceCompanies_users", {
        // column in init migration path
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true

        },
        insuranceCompanieId: {
            type: DataTypes.INTEGER,
        },
        userId: {
            type: DataTypes.INTEGER,
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    });
    return InsuranceCompaniesUsers;
};