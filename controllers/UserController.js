var UsersService = require('./../services/UsersService');
var RolesService = require('./../services/RolesService');
var PersonInfosService = require('./../services/PersonInfosService');

/**
 * Create User
 * @param user
 * @returns {Promise.<TResult>|any}
 */
module.exports.create = function (user) {
    var promises = [];
    if(user.person_info){
        promises.push(PersonInfosService.findOrCreate(user.person_info).then(
            function (data) {
                // personInfoDao = data[0]
                return data[0];
            }
        ))
    }
    if(user.role){
        promises.push(RolesService.getByLabel(user.role.label).then(
            function (data) {
                console.log(data);
                return data;
            }
        ))
    }
    return Promise.all(promises).then(
        function (data) {
            // personInfoDao = data[0]
            // role = data[1]
            return UsersService.create(user, data[0], data[1] )
        }
    )
};
