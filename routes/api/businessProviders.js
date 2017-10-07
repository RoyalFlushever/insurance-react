/**
 * @module business Provider routes
 */

var express = require('express');
var router = express.Router();
var BusinessProvidersService = require('./../../services/BusinessProvidersService');
var BusinessProviderController = require('./../../controllers/BusinessProviderController');
var authenticate = require('./../../modules/authenticate');

/**
 * Get all business provider
 */
router.get('/',
    authenticate.isAuthenticated(),
    //authenticate.hasRight('GET_BUSINESS_PROVIDER_LIST'),
    function (req, res, next) {
        BusinessProvidersService.readAll(req.query).then(
            function (data) {
                res.status(200).send(data)
            }
        )
    });

/**
 * Get the number of all entries
 */
router.get('/count',
    authenticate.isAuthenticated(),
    //authenticate.hasRight('GET_BUSINESS_PROVIDER_LIST'),
    function (req, res) {
        BusinessProvidersService.count(req.query).then(function (data) {
            res.status(200).send({
                count: data
            });
        }).catch(function (err) {
            res.status(404).send(err);
        })
    });

/**
 * Get all business provider
 */
router.post('/',
    authenticate.isAuthenticated(),
    //authenticate.hasRight('CREATE_BUSINESS_PROVIDER_LIST'),
    function (req, res, next) {
        BusinessProviderController.create(req.body).then(
            function (data) {
                res.status(200).send(data)
            }
        )
    });

/**
 * Get business provider by Id
 */
router.get('/:id',
    authenticate.isAuthenticated(),
    //authenticate.hasRight('GET_BUSINESS_PROVIDER'),
    function (req, res) {
        BusinessProvidersService.readById(req.params.id).then(
            function (data) {
                res.status(200).send(data)
            }, function (err) {
                res.status(err.status).send(err)
            }
        )
    });


/**
 * Update business provider by Id
 */
router.put('/:id',
    authenticate.isAuthenticated(),
    //authenticate.hasRight('UPDATE_BUSINESS_PROVIDER'),
    function (req, res) {
        BusinessProvidersService.editById(req.params.id, req.body).then(
            function (data) {
                res.status(200).send(data)
            }
        )
    });

/**
 * update business provider by Id
 */
router.delete('/:id',
    authenticate.isAuthenticated(),
    //authenticate.hasRight('DELETE_BUSINESS_PROVIDER'),
    function (req, res) {
        BusinessProvidersService.deletById().then(
            function (data) {
                res.status(200).send(data)
            }
        )
    });

module.exports = router;
