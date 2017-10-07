'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.createTable('versions', {
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
		});
	},

	down: function (queryInterface, Sequelize) {
	  return queryInterface.dropTable('versions');
	}
};
