/**
 * @module manifestation  routes
 */

var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var RolesService = require('./../../services/RolesService');
var authenticate = require('./../../modules/authenticate');

router.get('/',
    authenticate.isAuthenticated(),
    function (req, res) {
        RolesService.getAll(req.query).then(function (data) {
            res.status(200).send(data);
        }).catch(function (err) {
            res.status(404).send(err);
        });
    });


module.exports = router;
