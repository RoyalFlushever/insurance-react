var models  = require('./../models');

/**
 * Get a slice of the entries, used for pagination
 * @returns {Promise.<Array.<Model>>}
 */
module.exports.get = (query) => {
	var queryParams = {};
	queryParams.order = [['level', 'ASC'], ['subLevel', 'ASC']];
	if (query['version_id']){
		queryParams.where = {
			version_id: parseInt(query['version_id'])
		};
	}
	if (query['paragraph_id']){
		queryParams.where = {
			id: parseInt(query['paragraph_id'])
		};
	}
	return models.paragraph.findAll(queryParams);
};

module.exports.create = function(newParagraph) {
    return models.paragraph.create(newParagraph);
};

module.exports.update = function(id, data) {
    return models.paragraph.update(data, {
        where: {
            id: id
        }
    })
};
module.exports.delete = function(id) {
    return models.paragraph.destroy({
        where: {
            id: id
        }
    });
}



