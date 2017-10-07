'use strict';

var sha1 = require('sha1');
const RolesService= require('./../services/RolesService');


module.exports = {
  up: function (queryInterface, Sequelize) {

      return RolesService.getAll().then(
          function (_roleList) {
              var adminId, accountManagerId, managerId;
              _roleList.forEach(function (_role) {
                    switch (_role.label){
                        case "ADMINISTRATOR":
                            adminId = _role.id;
                            break;
                        case "ACCOUNT_MANAGER":
                            accountManagerId = _role.id;
                            break;
                        case "MANAGER":
                            managerId = _role.id;
                            break;
                    }
              });
              return queryInterface.bulkInsert('users', [
                  {
                      id: '1',
                      email: 'admin@ovatio.fr',
                      password: sha1("apideo"),
                      firstName: "Admin",
                      lastName: "Admin",
                      roleId: adminId,
                      isGroupOvatio: true,
                      createdAt: new Date(),
                      updatedAt: new Date()
                  },
                  {
                      id: '2',
                      email: 'accountManager@ovatio.fr',
                      password: sha1("apideo"),
                      firstName: "Account",
                      lastName: "Manager",
                      roleId: accountManagerId,
                      isGroupOvatio: true,
                      createdAt: new Date(),
                      updatedAt: new Date()
                  },
                  {
                      id: '3',
                      email: 'provider@ovatio.fr',
                      password: sha1("apideo"),
                      firstName: "Provider",
                      lastName: "Provider",
                      roleId: managerId,
                      isGroupOvatio: true,
                      createdAt: new Date(),
                      updatedAt: new Date()
                  }
              ], {});
          }
      )
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('users', null, {});
  }
};
