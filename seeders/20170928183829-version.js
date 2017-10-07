'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.bulkInsert('versions', [
			{
				insurance_id: 1,
				label: "first 0.0.1",
				activation: "2017-07-12",
				createdAt: new Date(),
				updatedAt: new Date()
			},{
				insurance_id: 2,
				label: "second",
				activation: "2017-08-16",
				createdAt: new Date(),
				updatedAt: new Date()
			}
		], {});

	},

	down: function (queryInterface, Sequelize) {
		return queryInterface.bulkDelete('versions', null, {});
	}
};
