var models = require('./../models');
var editInsuranceCompanyContact = require("./UsersService").editInsuranceCompanyContact;
var deleteInsuranceCompanyContact = require("./UsersService").delete;

/**
 * Get a slice of the entries, used for pagination
 * @returns {Promise.<Array.<Model>>}
 */
module.exports.get = function(query) {
    var queryParams = {};
    if (query['offset'])
        queryParams.offset = parseInt(query['offset']);
    if (query['limit'])
        queryParams.limit = parseInt(query['limit']);
    var sortable = ['deletedAt', 'businessName', 'address', 'zipCode', 'city'];
    if (sortable.indexOf(query['sort']) > -1)
        queryParams.order = [[query['sort'], query['order'] === 'DESC' ? 'DESC' : 'ASC']];
    if (query['search']){
        queryParams.where = {
            businessName: {
                $like: '%' + query['search'] + '%'
            },
            status : query['showDisabled'] === true ? false : true
        };
    } else {
        queryParams.where = {
            status : query['showDisabled'] === true ? false : true
        };
    }
    return models.insuranceCompany.findAll(queryParams);
};

/**
 * Get insurance company by ID
 * @param id - id of the required insurance company
 * @returns {Promise.<Array.<Model>>}
 */
module.exports.getById = function (id) {
    return models.insuranceCompany.findOne({
        where: {
            id: id
        },
        include: [
            {
                model: models.user,
                as: 'contacts',
                required: false,
                where: {}
            }
        ]
    });
};

module.exports.count = function (query) {
    var queryParams = {};
    if (query['showDisabled'])
        queryParams.paranoid = false;
    return models.insuranceCompany.count(queryParams);
}


/**
 * Create or upsate an  insurance company
 * @params id - id of the insurance company
 * @params insuranceCompany - json of the updated insurance company
 * @returns Promise
 */
module.exports.edit = function (id, insuranceCompany) {
    function hydrate(insuranceCompany, mode) {
        let i = {};
        i.status = insuranceCompany.status;
        i.businessName = insuranceCompany.businessName;
        i.rate = insuranceCompany.rate;
        i.siret = insuranceCompany.siret;
        i.brokerId = insuranceCompany.brokerId;
        i.address = insuranceCompany.address;
        i.zipCode = insuranceCompany.zipCode;
        i.city = insuranceCompany.city;
        i.country = insuranceCompany.country;
        i.addressAccounting = insuranceCompany.addressAccounting;
        i.zipCodeAccounting = insuranceCompany.zipCodeAccounting;
        i.cityAccounting = insuranceCompany.cityAccounting;
        i.countryAccounting = insuranceCompany.countryAccounting;
        i.legalNotice = insuranceCompany.legalNotice;
        return i;
    }
    var p;
    if (id) {
        p = models.insuranceCompany.update(hydrate(insuranceCompany, 'update'), {where: {id: id}}).then(function () {
            return models.insuranceCompany.findById(id)
        })
    } else {
        p = models.insuranceCompany.create(hydrate(insuranceCompany, 'create'));
    }
    return p.then(function (insuranceCompanyDao) {
        if (insuranceCompany.contacts && insuranceCompany.contacts.length > 0) {
            var promises = [];
            insuranceCompany.contacts.forEach(function (_contact) {
                if(_contact.isDeleted){
                    if(_contact.id){
                        promises.push(
                            deleteInsuranceCompanyContact(_contact.id)
                        )
                    }
                } else {
                    promises.push(editInsuranceCompanyContact(_contact).then(
                        function (userDao) {
                            return insuranceCompanyDao.addContact(userDao);
                        }
                    ))
                }

            });
            return Promise.all(promises).then(function () {
                return insuranceCompanyDao
            }, function (err) {
                console.error(err);
            })
        } else {
            return insuranceCompanyDao
        }
    })
};
