"use strict";

module.exports = function(sequelize, DataTypes) {
  var BusinessProvider = sequelize.define("business_provider", {
    // column in init migration path
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    // column in init migration path
    type: {
      type: DataTypes.STRING,
    },
    // column in init migration path
    businessName: {
      type: DataTypes.STRING,
    },
     // column in init migration path
    businessProviderLastName: {
      type: DataTypes.STRING,
    },
     // column in init migration path
    businessProviderFirstName: {
      type: DataTypes.STRING,
    },
     // column in init migration path
    companyId: {
      type: DataTypes.STRING
    },
     // column in init migration path
    status: {
      type: DataTypes.STRING
    },
     // column in init migration path
    commissionPercent: {
      type: DataTypes.STRING
    },
     // column in init migration path
    address: {
      type: DataTypes.STRING
    },
     // column in init migration path
    address2: {
      type: DataTypes.STRING
    },
     // column in init migration path
    zipCode: {
      type: DataTypes.STRING
    },
     // column in init migration path
    city: {
      type: DataTypes.STRING
    },
     // column in init migration path
    country: {
      type: DataTypes.STRING
    },
     // column in init migration path
    email: {
      type: DataTypes.STRING
    },
     // column in init migration path
    phone: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  });

  BusinessProvider.associate = function(models) {
    // Using additional options like CASCADE etc for demonstration
    // Can also simply do Task.belongsTo(models.User);
    BusinessProvider.belongsTo(models.user, {as: 'businessProviderUser', foreignKey: 'id', foreignKeyConstraint:true});
  };


  return BusinessProvider;
};