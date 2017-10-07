"use script";

var Sequelize = require('sequelize');

var model = {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	insurance_id: {
		type: Sequelize.INTEGER,
	},
	label: {
		type: Sequelize.TEXT
	},
	activation: {
		type: Sequelize.DATEONLY,
		defaultValue : new Date()
	},
	createdAt: {
		type: Sequelize.DATE,
		defaultValue : new Date()
	},
	updatedAt: {
		type: Sequelize.DATE,
		defaultValue : new Date()
	}
};

module.exports = function(sequelize, DataTypes) {
	var Version = sequelize.define('version', model);
	return Version;
};
