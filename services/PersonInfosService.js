var models  = require('./../models');

/**
 * Get person info user
 * @returns {Promise.<Array.<Model>>}
 */
module.exports.getAll = function () {
    return models.person_info.findAll({});
};
/**
 * Create person Info
 * @param user
 * @returns {*}
 */
module.exports.create = function (user) {
    return models.person_info.create({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt:new Date(),
        updatedAt:new Date()
    })
};
/**
 * findOrCreate Person Info
 * @param user
 * @returns {*}
 */
module.exports.findOrCreate = function (person_info) {
    return models.person_info.findOrCreate(
        {where: {id: person_info.id},
            defaults: {
                email: person_info.email,
                firstName: person_info.firstName,
                lastName: person_info.lastName,
                createdAt:new Date(),
                updatedAt:new Date()
        }})
};
