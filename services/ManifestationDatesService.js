var models = require('./../models');
var sha1 = require('sha1');

/**
 * Create Business Provider
 * @param id
 * @returns {*}
 */
module.exports.deleteById = function (id) {
    return models.manifestation_dates.destroy({
        where: {
            id: id
        }
    });
};


module.exports.deleteByManifestationId = function (manifestationId) {
    return models.manifestation_dates.destroy({
        where: {
            manifestationId: manifestationId
        }
    });
};
