'use strict';

var sha1 = require('sha1');


module.exports = {
  up: function (queryInterface, Sequelize) {

      return queryInterface.bulkInsert('clients', [
          {
            isPro: true,
            //Pro Specific
            businessName : "TheCodingMachine",
            siretNumber: "1234567890",
            statusId: 1,
            vatNumber: "98765432",
            stdPhone: "0171183972",

            //Private Specific
            title: null,
            lastName: null,
            firstName: null,
            email: null,
            phone: null,

            //Common
            relationShipManagerId: 1,
            stateId: 1,
            address: "4 rue de la michodière",
            addressCompl: "3ème étage",
            postalCode: "75002",
            city: "Paris",
            countryId: 1,
            businessProviderId: 1
          },
          {
            isPro: true,
            //Pro Specific
            businessName : "Ovatio",
            siretNumber: "1111111111",
            statusId: 2,
            vatNumber: "22222222222",
            stdPhone: "0654291765",

            //Private Specific
            title: null,
            lastName: null,
            firstName: null,
            email: null,
            phone: null,

            //Common
            relationShipManagerId: 1,
            stateId: 1,
            address: "2 rue des lilas",
            addressCompl: null,
            postalCode: "75001",
            city: "Paris",
            countryId: 1,
            businessProviderId: 1
          },
          {
            isPro: false,
            //Pro Specific
            businessName : null,
            siretNumber: null,
            statusId: null,
            vatNumber: null,
            stdPhone: null,

            //Private Specific
            title: 1,
            lastName: "John",
            firstName: "Doe",
            email: "john@do.com",
            phone: "02653726",

            //Common
            relationShipManagerId: 1,
            stateId: 2,
            address: "3 unkonwn street",
            addressCompl: null,
            postalCode: "nowhere",
            city: "nowhere",
            countryId: 1,
            businessProviderId: 1
          }
      ], {});

  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('clients', null, {});
  }
};
