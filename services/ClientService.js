/**
 * @module Service Client
 */

var models = require('./../models');
var sequelize = require('sequelize');

/**
 * Get a slice of the entries, used for pagination
 * @param id {string} - ID of the client
 * @returns {Promise.<Array.<Model>>}
 */
module.exports.getById = function (id) {
    return models.client.findAll({
        include: [
            {
                model: models.clientContact,
                as: 'contacts'
            },
            {
                model: models.businessStatus,
                as: 'businessStatus'
            }
        ],
        where: {
            id: id
        }
    });
};

function getFilter(query) {
    var likeFilter = {
        $like: '%' + query['search'] + '%'
    };
    return {
        $or: [
            {
                'businessName': likeFilter
            },
            {
                'address': likeFilter
            },
            {
                'postalCode': likeFilter
            },
            {
                'city': likeFilter
            },
            {
                'stdPhone': likeFilter
            },
            {
                'phone': likeFilter
            },
            {
                '$businessStatus.label$': likeFilter
            }
        ]
    }
}

/**
 * FInd function client
 * @param query {json} - limit  offset - order
 * @returns {Promise.<Array.<Model>>}
 */
module.exports.find = function (query) {
    var queryParams = {};
    if (query['offset'])
        queryParams.offset = parseInt(query['offset']);
    if (query['limit'])
        queryParams.limit = parseInt(query['limit']);
    var sortable = ['status', "businessName", "address", "postalCode", "city", "phone"];
    if (sortable.indexOf(query['sort']) > -1) {
        let sortField = query['sort'];
        let order = query['order'] === 'DESC' ? 'DESC' : 'ASC';
        let sort = [[sortField, order]];
        if (sortField == "status") {
            sort = [[models.businessStatus, "label", order]]
        } else if (sortField == "phone") {
            sort = sequelize.literal('ifnull(phone, stdphone) ' + order)
        }
        queryParams.order = sort;
    }
    if (query['search']) {
        queryParams.where = getFilter(query);
    }

    queryParams.include = [
        {
            model: models.businessStatus,
            as: 'businessStatus'
        }
    ]
    return models.client.findAll(queryParams);
};

/**
 * Count function of client the query is same than find function
 * @param query
 * @returns {*}
 */
module.exports.count = function (query) {
    var queryParams = {}
    if (query['search']) {
        queryParams.where = getFilter(query);
    }
    return models.client.count(queryParams);
}

/**
 * Update the Insurance Company's data
 */
module.exports.update = function (id, data) {
    return models.client.update(data, {
        where: {
            id: id
        }
    })
};


/**
 * Create an Insurance Company
 * @returns Promise
 */
module.exports.create = function (client) {
    return models.client.create(client);
};

/**
 *
 * @param status
 * @returns {status}
 */
module.exports.createBusinessStatus = function (status) {
    return models.businessStatus.findOrCreate(
        {
            where: {label: status.label}
        }
    ).then(function (data) {
        console.log(data);
    })

};


/**
 * Soft delete (mark as disabled) an Insurance Company
 * @param id {string} -id of the client deleted
 */
module.exports.delete = function (id) {
    return models.client.destroy({
        where: {
            id: id
        }
    });
}
