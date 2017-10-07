var models  = require('./../models');

/**
 * Get a slice of the entries, used for pagination
 * @returns {Promise.<Array.<Model>>}
 */
module.exports.get = (query) => {
	var queryParams = {};
	if (query['insurance_id']){
		queryParams.where = {
			insurance_id: parseInt(query['insurance_id'])
		};
	}
	// if (query['limit'])
	//     queryParams.limit = parseInt(query['limit']);
	// var sortable = ['deletedAt', 'businessName', 'address', 'zipCode', 'city'];
	// if (sortable.indexOf(query['sort']) > -1)
	//     queryParams.order = [[query['sort'], query['order'] === 'DESC' ? 'DESC' : 'ASC']];
	// if (query['search'])
	//     queryParams.where = {
	//         businessName: {
	//             $like: '%' + query['search'] + '%'
	//         }
	//     };
	// else if (query['id'])
	//     queryParams.where = {
	//         id: {
	//             $eq: query['id']
	//         }
	//     }
	// if (query['showDisabled'])
	//     queryParams.paranoid = false;
	return models.version.findAll(queryParams);
};

module.exports.create = function(newVersion) {
    return models.version.create(newVersion);
};

module.exports.update = function(id, data) {
    return models.version.update(data, {
        where: {
            id: id
        }
    })
};
module.exports.delete = function(id) {
    return models.version.destroy({
        where: {
            id: id
        }
    });
}



