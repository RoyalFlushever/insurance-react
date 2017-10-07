"use strict";

module.exports = function(sequelize, DataTypes) {
    var ManifestationDate = sequelize.define("manifestation_dates", {
        // column in init migration path
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        manifestationId: {
          type: DataTypes.INTEGER,
        },
        // column in init migration
        date : {
          type: DataTypes.DATE,
        },
        // column in init migration
        country : {
          type: DataTypes.STRING,
        },
        // column in init migration
        zipCode : {
          type: DataTypes.STRING,
        },
        // column in init migration
        place : {
          type: DataTypes.STRING,
        },
        // column in init migration
        scene : {
          type: DataTypes.STRING,
        },
        // column in init migration
        damageBasis : {
          type: DataTypes.STRING,
        },
        // column in init migration
        amount : {
          type: DataTypes.INTEGER,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      }//, {timestamps : true,}
    );

    ManifestationDate.associate = function(models) {
      models.manifestation_dates.belongsTo(models.manifestation, {as: 'manifestationDates', foreignKey: 'manifestationId'});
    };

    return ManifestationDate;
};
