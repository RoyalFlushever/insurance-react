'use strict';

module.exports = function(sequelize, DataTypes) {
    var BusinessStatus = sequelize.define('businessStatus', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        label:  {
            type: DataTypes.STRING
        }
    });

    return BusinessStatus;
};
