/**
 * @module client routes
 */

var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var ClientService = require('./../../services/ClientService');
var authenticate = require('./../../modules/authenticate');

/**
 * Get the count of all entries
 */
router.get('/count',
    authenticate.isAuthenticated(),
    authenticate.hasRight('GET_CLIENT_LIST'),
    function (req, res) {
        ClientService.count(req.query).then(function (data) {
            res.status(200).send({
                count: data
            });
        }).catch(function (err) {
            res.status(404).send(err);
        })
    });

/**
 * Get an client by ID
 */
router.get('/:id',
    authenticate.isAuthenticated(),
    authenticate.hasRight('GET_CLIENT_LIST'),
    function (req, res) {
        ClientService.getById(req.params.id).then(function (data) {
            console.log(data);
            res.status(200).send(data);
        }).catch(function (err) {
            console.log(err);
            res.status(404).send(err);
        });
    });

/**
 * Get the client list
 */
router.get('/',
    authenticate.isAuthenticated(),
    authenticate.hasRight('GET_CLIENT_LIST'),
    function (req, res) {
        ClientService.find(req.query).then(function (data) {
            res.status(200).send(data);
        }).catch(function (err) {
            console.log(err);
            res.status(404).send(err);
        });
    }
);

/**
 * Edit client by id
 */
router.put('/:id',
    authenticate.isAuthenticated(),
    //authenticate.hasRight('UPDATE_CLIENT'),
    function (req, res) {
        ClientService.update(req.params.id, req.body).then(function (data) {
            res.status(200).send(data);
        }).catch(function (err) {
            console.log(err);
            res.status(400).send(err);
        });
    });


/**
 * Add a client
 */
router.post('/',
    authenticate.isAuthenticated(),
    authenticate.hasRight('CREATE_CLIENT'),
    function (req, res) {
        ClientService.create(req.body).then(function (data) {
            res.status(200).send(data);
        }).catch(sequelize.ValidationError, function (err) {
            res.status(422).send(err.errors);
        }).catch(function (err) {
            res.status(400).send(err);
        });
    });

/**
 * delete an client by ID
 */
router.delete('/:id',
    authenticate.isAuthenticated(),
    //authenticate.hasRight('DELETE_CLIENT'),
    function (req, res) {
        ClientService.delete(req.params.id).then(function (data) {
            res.status(200).send([data]);
        }).catch(function (err) {
            res.status(400).send('unknown error');
        })
    });

module.exports = router;
