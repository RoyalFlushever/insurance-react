"use script";

var Sequelize = require('sequelize');

var model = {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	version_id: {
		type: Sequelize.INTEGER,
	},
	group: {
		type: Sequelize.INTEGER,
	},
	level: {
		type: Sequelize.INTEGER,
	},
	subLevel: {
		type: Sequelize.INTEGER,
	},
	title: {
		type: Sequelize.TEXT
	},
	condition: {
		type: Sequelize.TEXT
	},
	editor: {
		type: Sequelize.TEXT
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
	var Paragraph = sequelize.define('paragraph', model);
	return Paragraph;
};
