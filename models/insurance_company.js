"use script";

var Sequelize = require('sequelize');

var model = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    status: {
        type: Sequelize.BOOLEAN,
        default: true,
    },
    businessName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    rate: {
        type: Sequelize.FLOAT,
    },
    siret: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    brokerId: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    zipCode: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING
    },
    addressAccounting: {
        type: Sequelize.STRING
    },
    zipCodeAccounting: {
        type: Sequelize.STRING
    },
    cityAccounting: {
        type: Sequelize.STRING
    },
    countryAccounting: {
        type: Sequelize.STRING
    },
    legalNotice: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: new Date()
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: new Date()
    }
};

module.exports = function (sequelize, DataTypes) {
    var InsuranceCompany = sequelize.define('insuranceCompany', model, {
        tableName: 'insurance_companies'
    });
    InsuranceCompany.associate = function (models) {
        InsuranceCompany.belongsToMany(models.user, {
            as: 'contacts',
            through: 'insurance_companies_users',
            foreignKey: 'insuranceCompanyId'
        })
    };
    return InsuranceCompany;
};
