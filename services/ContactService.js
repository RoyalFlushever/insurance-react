/**
 * @module Service Contact
 */

var models  = require('./../models');

/**
 * Update the Insurance Company's data
 * @params id {string} - id of the updated contact
 * @params data {json} - data of the contact
 * @returns promise
 */
module.exports.update = function(id, data) {
    return models.clientContact.update(data, {
        where: {
            id: id
        }
    })
};

/**
 * Create an Insurance Company
 * @params data {data} - data of the new contact
 * @returns Promise
 */
module.exports.create = function(data) {
    return models.clientContact.create(data);
};


/**
 * Soft delete (mark as disabled) an Insurance Company
 * @params id {string} - id to the contact to delete
 * */
module.exports.delete = function(id) {
    return models.clientContact.destroy({
        where: {
            id: id
        }
    });
}
