/**
 * @module Right Service
 */


var models  = require('./../models');

/**
 *  Find right or create it
 * @param right
 * @returns {Promise.<TResult>|any}
 */
module.exports.findOrCreate = function (right) {
    return  models.right.findOrCreate(
        {
            where: {label: right.label},
            defaults: {
                nameFr: right.nameFr
            }
        }).then(
            function (data) {
                rightDao = data[0];
                rightDao.nameFr = right.nameFr;
                return rightDao.save();
            }
    )
};


/**
 *  Find right or create it
 * @param label {string} - label of tight
 * @returns {Promise.<RightDao>|any}
 */
module.exports.findByLabel = function (label) {
    return  models.right.find(
        {
            where: {label: label},
            defaults: {
                nameFr: right.nameFr
            }
        }).then(
            function (data) {
                rightDao = data[0];
                rightDao.nameFr = right.nameFr;
                return rightDao.save();
            }
    )
};
