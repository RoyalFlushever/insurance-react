/**
 * @module Service Business status service
 */

var models  = require('./../models');

/**
 * Find function for the business status
 * @returns {Promise.<Array.<Model>>}
 */
module.exports.find = function() {
    return models.businessStatus.findAll();
};