var models  = require('./../models');
var sha1 = require('sha1');

/**
 * Get All Role
 * For each role, get the right list associated
 *  @returns {Promise.<Array.<Model>>}
 */
module.exports.getAll = function () {
    return models.role.findAll({
        include: [
            { model : models.right ,  as: 'rightList'}
    ]});
};
/**
 * Get role by Label
 * @param label
 * @returns {Promise.<Model>}
 */
module.exports.getByLabel = function (label) {
    return models.role.findOne({
        where: {label: label}
    })
};

/**
 * Get role by Label
 * @param id {string} - id of the role
 * @returns {Promise.<Model>}
 */
module.exports.getById = function (id) {
    return models.role.findOne({
        where: {id: id}
    })
};

/**
 * Get role right list by label
 * @param id {string} - id of the role
 * @returns {Promise.<RighsList>}
 */
module.exports.getRightListById = function (id) {
    return models.role.findOne({
        where: {id: id},
        include : [
        { model : models.right ,
            as: 'rightList'
        }]
    }).then(
        function (roleDao) {
            if(roleDao){
                return roleDao.rightList;
            }
        }
    )
};

/**
 * findOrCreate
 * @param role
 * @param rightDaoList
 * @returns {Promise.<TResult>|any}
 */
module.exports.findOrCreate = function (role, rightDaoList) {
    return  models.role.findOrCreate(
        {
            where: {label: role.label},
            defaults: {
                nameFr: role.nameFr
            }
        }).then(
        function (data) {
            let roleDao = data[0];
            return roleDao.setRightList(rightDaoList);
        }
    )
};