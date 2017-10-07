'use strict';
module.exports = function(sequelize, DataTypes) {
    const expert = sequelize.define('groupe', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        label: {
            type: DataTypes.STRING
        }
    });
    return expert;
};
