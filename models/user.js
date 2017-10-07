"use strict";

var passportLocalSequelize = require('passport-local-sequelize');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("user", {
        // column in init migration
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        // column in init migration
        genre : {
            type: DataTypes.STRING,
        },
        // column in init migration
        // column in init migration
        password : {
            type: DataTypes.STRING,
        },
        // column in init migration
        lastName: {
            type: DataTypes.STRING
        },
        // column in init migration
        firstName: {
            type: DataTypes.STRING
        },
        // column in init migration
        address: {
            type: DataTypes.STRING
        },
        // column in init migration
        address2: {
            type: DataTypes.STRING
        },
        // column in init migration
        zipCode: {
            type: DataTypes.STRING
        },
        // column in init migration
        city: {
            type: DataTypes.STRING
        },
        // column in init migration
        email: {
            type: DataTypes.STRING
        },
        // column in init migration
        phone: {
            type: DataTypes.STRING
        },
        // column in init migration
        mobilePhone: {
            type: DataTypes.STRING
        },
        // column in init migration
        roleId: {
            type: DataTypes.INTEGER
        },
        // column in init migration
        isGroupOvatio: {
            type: DataTypes.BOOLEAN
        },
        // column in init migration
        createdAt : {
            type: DataTypes.DATE,
            defaultValue : new Date()
        },
        // column in init migration
        updatedAt : {
            type: DataTypes.DATE,
            defaultValue : new Date()
        }
    });

    User.associate = function(models) {
        User.belongsTo(models.role, {as: 'role', foreignKey: 'roleId', foreignKeyConstraint:true});
        User.belongsToMany(models.user, {  as: 'insuranceCompanies', through: 'insurance_companies_users', foreignKey: 'userId'})


    };

    return User;
};

