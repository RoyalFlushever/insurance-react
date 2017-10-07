'use strict';

var sha1 = require('sha1');


module.exports = {
  up: function (queryInterface, Sequelize) {

      return queryInterface.bulkInsert('clientContacts', [
        {
          id: 1,
          clientId: 1,
          title: 1,
          lastName: "Martin1",
          firstName: "Pierre",
          email: "p.martin@tcm.fr",
          fax: "0101010101",
          phone: "0102030405",
          mobile: "0102030405",
          address: "2 rue des figuiers",
          addressCompl: null,
          postalCode: "69874",
          city: "Lyon"
        },
        {
          id: 2,
          clientId: 1,
          title: 1,
          lastName: "Martin2",
          firstName: "Pierre",
          email: "p.martin@tcm.fr",
          fax: "0101010101",
          phone: "0102030405",
          mobile: "0102030405",
          address: "2 rue des figuiers",
          addressCompl: null,
          postalCode: "69874",
          city: "Lyon"
        },
        {
          id: 3,
          clientId: 1,
          title: 1,
          lastName: "Martin3",
          firstName: "Pierre",
          email: "p.martin@tcm.fr",
          fax: "0101010101",
          phone: "0102030405",
          mobile: "0102030405",
          address: "2 rue des figuiers",
          addressCompl: null,
          postalCode: "69874",
          city: "Lyon"
        }
      ], {});

  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('contacts', null, {});
  }
};
