var BusinessProvidersService = require('./../services/BusinessProvidersService');
var UsersService = require('./../services/UsersService');
var RolesService = require('./../services/RolesService');

module.exports.create = function (data) {
    return RolesService.getByLabel('BUSINESS_GETTER')
        .then(
            function (roleDao) {
                if (roleDao) {
                    return UsersService.create({
                        login: data.email,
                        password: 'apideo',
                    }, null, roleDao)
                        .then(function (userDao) {
                            data.id = userDao.id;
                            return BusinessProvidersService.create(data);
                        })
                } else {
                    throw 'role not found'
                }
            }, function (err) {
                throw err;
            }
        )
};
