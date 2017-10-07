'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.createTable('paragraphs', {
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
			sublevel: {
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
		});
	},

	down: function (queryInterface, Sequelize) {
		return queryInterface.dropTable('paragraphs');
	}
};
