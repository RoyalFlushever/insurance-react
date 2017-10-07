/**
 * @module Service Business provider
 */

var models = require('./../models');
var sha1 = require('sha1');

/**
 * Hydrate function of the Business Provider Model
 * @param dao {object} - dao of the business provider
 * @param data {json} - json of the hydrate business provider
 * @returns {*}
 */
function hydrate(dao, data) {
    "use strict";
    if (dao && data) {
        dao.type = data.type;
        dao.businessName = data.businessName;
        dao.businessProviderLastName = data.businessProviderLastName;
        dao.businessProviderFirstName = data.businessProviderFirstName;
        dao.companyId = data.companyId;
        dao.status = data.status;
        dao.commissionPercent = data.commissionPercent;
        dao.address = data.address;
        dao.address2 = data.address2;
        dao.zipCode = data.zipCode;
        dao.city = data.city;
        dao.country = data.country;
        dao.email = data.email;
        dao.phone = data.phone;
        return dao;
    } else {

    }
}

/**
 * @desc get list of business provider
 * @param {json} query - attribut : offset, limit, sortable ( deletedAt businessName address zipCode city ) search and id params
 * @returns {Promise.<Array.<businessProviderDao>>}
 */
module.exports.readAll = function (query) {
    var queryParams = {};
    if (query['offset'])
        queryParams.offset = parseInt(query['offset']);
    if (query['limit'])
        queryParams.limit = parseInt(query['limit']);
    /**
     * Quey can have fnlzsjbnf
     */
    // blabla
    var sortable = ['deletedAt', 'businessName', 'address', 'zipCode', 'city'];
    if (sortable.indexOf(query['sort']) > -1)
        queryParams.order = [[query['sort'], query['order'] === 'DESC' ? 'DESC' : 'ASC']];
    if (query['search'])
        queryParams.where = {
            businessName: {
                $like: '%' + query['search'] + '%'
            }
        };
    else if (query['id'])
        queryParams.where = {
            id: {
                $eq: query['id']
            }
        }
    if (query['showDisabled'])
        queryParams.paranoid = false;
    return models.business_provider.findAll(queryParams);
};

/**
 * COunt function of the business provider
 * @param query {json} - select query
 * @returns {*}
 */
module.exports.count = function(query) {
    var queryParams = {};
    if (query['showDisabled'])
        queryParams.paranoid = false;
    return models.business_provider.count(queryParams);
};

/**
 * Get Business Provider by Id
 * @param id {number} - id of the business provider
 * @returns {Promise.<Array.<Model>>}
 */
module.exports.readById = function (id) {
    return models.business_provider.findAll({
        where: {
            id: id
        },
        include: []
    })
        .then(function (businessProviderDaoList) {
            if (businessProviderDaoList && businessProviderDaoList.length === 1) {
                return businessProviderDaoList[0];
            } else {
                throw {
                    status: 404,
                    err: 'User not found ( id : ' + id + ')'
                };
            }
        })
        .catch(function (err) {
            throw {
                status: 500,
                err: err
            };
        })
};

/**
 * Create Business Provider
 * @param businessProvider {json} - data of the business provider
 * @returns {*}
 */
module.exports.create = function (businessProvider) {
    return models.business_provider.create({
        id: businessProvider.id,
        type: businessProvider.type,
        businessName: businessProvider.businessName,
        businessProviderLastName: businessProvider.businessProviderLastName,
        businessProviderFirstName: businessProvider.businessProviderFirstName,
        companyId: businessProvider.companyId,
        status: businessProvider.status,
        commissionPercent: businessProvider.commissionPercent,
        address: businessProvider.address,
        address2: businessProvider.address2,
        zipCode: businessProvider.zipCode,
        city: businessProvider.city,
        country: businessProvider.country,
        email: businessProvider.email,
        phone: businessProvider.phone

    })
        .then(
            function (businessProvider) {
                return businessProvider;
            }
        )
        .catch(function (err) {
            throw {
                status: 500,
                err: err
            };
        });
};

/**
 * Create Business Provider
 * @param id
 * @param businessProvider
 * @returns {*}
 */
module.exports.editById = function (id, businessProvider) {
    return this.readById(id).then(
        function (businessProviderDao) {
            if (businessProviderDao) {
                hydrate(businessProviderDao, businessProvider);
                return businessProviderDao.save();
            }
        }
    )
        .catch(function (err) {
            throw {
                status: 500,
                err: err
            };
        });
};