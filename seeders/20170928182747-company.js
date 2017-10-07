'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.bulkInsert('insurance_companies', [
			{
				status: 1,
				businessName: "company A",
				rate: 0,
				siret: "732 829 320 00074",
				brokerId: "",
				address: "address",
				zipCode: "000",
				city: "city",
				country: "Russia",
				addressAccounting: "",
				zipCodeAccounting: "",
				cityAccounting: "",
				countryAccounting: "",
				legalNotice: "",
				createdAt: new Date(),
				updatedAt: new Date()
			},{
				status: 1,
				businessName: "company b",
				rate: 0,
				siret: "732 829 320 00000",
				brokerId: "",
				address: "addressB",
				zipCode: "011",
				city: "cityB",
				country: "RussiaB",
				addressAccounting: "",
				zipCodeAccounting: "",
				cityAccounting: "",
				countryAccounting: "",
				legalNotice: "",
				createdAt: new Date(),
				updatedAt: new Date()
			}
		], {});

	},

	down: function (queryInterface, Sequelize) {
		return queryInterface.bulkDelete('insurance_companies', null, {});
	}
};
