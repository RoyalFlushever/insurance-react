var RolesService = require('./../services/RolesService');
var RightsService = require('./../services/RightsService');
var ClientService = require('./../services/ClientService');
var businessStatuses = require('./../data/clientBusniessStatuses');
var roleData = require('./../data/role');

/**
 * updateRoleAndRight
 * @returns {Promise.<RoleDao>}
 */
module.exports.updateRoleAndRight = function () {
    var promise_role = [];
    if (roleData && Array.isArray(roleData)) {
        roleData.forEach(function (_role) {
            var promise_right = [];
            if(_role.rightList && Array.isArray(_role.rightList)){
                _role.rightList.forEach(function (_right) {
                    promise_right.push(RightsService.findOrCreate(_right))
                })
            }
            promise_role.push(Promise.all(promise_right).then(
                function (rightDaoList) {
                    return RolesService.findOrCreate(_role, rightDaoList)
                }
            ))
        })
    }
    if (businessStatuses && Array.isArray(businessStatuses)) {
        businessStatuses.forEach(function (_status) {
            promise_role.push( ClientService.createBusinessStatus(_status))
        })
    }
    return Promise.all(promise_role);
};
