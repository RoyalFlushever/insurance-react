var models = require('./../models');
var sha1 = require('sha1');

/**
 * Get all user
 * @param query
 * @returns {Promise.<Array.<Model>>}
 */
module.exports.getAll = function(query) {
    var queryParams = {};
    if (query['offset'])
        queryParams.offset = parseInt(query['offset']);
    if (query['limit'])
        queryParams.limit = parseInt(query['limit']);
    var sortable = ['deletedAt', 'businessName', 'address', 'zipCode', 'city'];
    if (sortable.indexOf(query['sort']) > -1)
        queryParams.order = [
            [query['sort'], query['order'] === 'DESC' ? 'DESC' : 'ASC']
        ];
    // if (query['search'])
    //     queryParams.where = {
    //         'lastName': {
    //             $like: '%' + query['search'] + '%'
    //         }
    //     };

    else if (query['id'])
        queryParams.where = {
            id: {
                $eq: query['id']
            }
        }
    if (query['showDisabled'])
        queryParams.paranoid = false;

    queryParams.include = [{
        model: models.role,
        as: 'role',
        include: [
            { model: models.right, as: 'rightList' }
        ]
    }]

    if (query['filter'] || query['search'])
        queryParams = {
            include: [{
                model: models.role,
                as: 'role',
                where: {
                    'label': { $like: '%' + query['filter'] + '%' }
                }
            }],
            where: {
                'lastName': {
                    $like: '%' + query['search'] + '%'
                }
            }
        };

    return models.user.findAll(queryParams);
};
/**
 * Get all user
 * @param query
 * @returns {Promise.<Array.<Model>>}
 */
module.exports.findAccountManager = function() {
    var queryParams = {
        include: [{
            model: models.role,
            as: 'role',
            where: {
                'label': "ACCOUNT_MANAGER"
            }
        }],

    };
    return models.user.findAll(queryParams);
};

function hydrate(dao, data) {
    "use strict";
    if (dao && data) {
        dao.genre = data.genre;
        dao.roleId = data.roleId;
        dao.lastName = data.lastName;
        dao.firstName = data.firstName;
        dao.address = data.address;
        dao.address2 = data.address2;
        dao.zipCode = data.zipCode;
        dao.city = data.city;
        dao.country = data.country;
        dao.email = data.email;
        dao.phone = data.phone;
        dao.mobilePhone = data.mobilePhone;
        dao.isGroupOvatio = data.isGroupOvatio;
        dao.updatedAt = new Date()
        return dao;
    } else {

    }
}

/**
 * Create User
 * @param user
 * @param personInfoDao
 * @param roleDao
 * @returns {*}
 */
module.exports.create = function(user, personInfoDao, roleDao) {
    return models.user.create({
        genre: user.genre,
        roleId: user.roleId,
        lastName: user.lastName,
        firstName: user.firstName,
        address: user.address,
        address2: user.address2,
        zipCode: user.zipCode,
        city: user.city,
        email: user.email,
        phone: user.phone,
        mobilePhone: user.mobilePhone,
        isGroupOvatio: user.isGroupOvatio,
        password: user.password ? sha1(user.password) : null,
        createdAt: new Date(),
        updatedAt: new Date()
    }).then(
        function(user) {
            if (personInfoDao) {
                user.setPersonInfo(personInfoDao);
            }
            if (roleDao) {
                user.setRole(roleDao);
            }
            return user;
        })
};

module.exports.count = function(query) {
    var queryParams = {};
    return models.user.count(queryParams);
};

/**
 * Create user link to insurrance company company
 * @param user
 * @param roleDao
 * @returns {*}
 */
module.exports.editInsuranceCompanyContact = function(user, roleDao) {
    function hydrate(user, mode) {
        let u = {};
        u.genre = user.genre;
        u.lastName = user.lastName;
        u.firstName = user.firstName;
        u.address = user.address;
        u.zipCode = user.zipCode;
        u.city = user.city;
        u.email = user.email;
        u.phone = user.phone;
        u.mobilePhone = user.mobilePhone;
        u.isGroupOvatio = false;
        u.password = user.password ? sha1(user.password) : null;
        u.createdAt = u ? u.createdAt : new Date();
        u.updatedAt = new Date();
        return u;
    }
    var p;
    if (user.id) {
        p = models.user.update(hydrate(user, 'edit'), { where: { id: user.id } }).then(function() {
            return models.user.findById(user.id)
        })
    } else {
        p = models.user.create(hydrate(user, 'create'));
    }
    return p.then(function(userDao) {
        if (roleDao) {
            user.setRole(roleDao);
        }
        return userDao;
    });
};

/**
 * Get user Provider by Id
 * @returns {Promise.<Array.<Model>>}
 */
module.exports.readById = function(id) {
    return models.user.findAll({
            where: {
                id: id
            },
            include: [{
                model: models.role,
                as: 'role',
                include: [
                    { model: models.right, as: 'rightList' }
                ]
            }]
        })
        .then(function(userDao) {
            if (userDao && userDao.length === 1) {
                return userDao[0];
            } else {
                throw {
                    status: 404,
                    err: 'User not found ( id : ' + id + ')'
                };
            }
        })
        .catch(function(err) {
            throw {
                status: 500,
                err: err
            };
        })
};


/**
 * Edit User
 * @param id
 * @param businessProvider
 * @returns {*}
 */
module.exports.editById = function(id, data) {
    return this.readById(id).then(
            function(userDao) {
                if (userDao) {
                    hydrate(userDao, data);
                    return userDao.save();
                }
            }
        )
        .catch(function(err) {
            throw {
                status: 500,
                err: err
            };
        });
};

/**
 * Soft delete (mark as disabled) an Insurance Company
 */
module.exports.delete = function(id) {
    return models.user.destroy({
        where: {
            id: id
        }
    });
}