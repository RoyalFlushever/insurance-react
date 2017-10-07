/**
 * @module business status routes
 */


var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var BusinessStatusesService = require('./../../services/BusinessStatusesService');
var authenticate = require('./../../modules/authenticate');

/**
 * Get business status list
 */
router.get('/',
    authenticate.isAuthenticated(),
    function (req, res) {
        BusinessStatusesService.find(req.query).then(function (data) {
            res.status(200).send(data);
        }).catch(function (err) {
            res.status(404).send(err);
        });
    });

module.exports = router;
