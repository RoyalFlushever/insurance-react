var BusinessProvidersService = require('./../services/BusinessProvidersService');
var UsersService = require('./../services/UsersService');
var RolesService = require('./../services/RolesService');
var ManifestationsService = require('./../services/ManifestationsService');

module.exports.create = function (data) {
    return ManifestationsService.create(data);
}