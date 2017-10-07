/**
 * @module client contact routes
 */

var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var ContactService = require('./../../services/ContactService');
var authenticate = require('./../../modules/authenticate');

/**
 * Edit a contact of a client
 */
router.put('/:id',
    authenticate.isAuthenticated(),
    authenticate.hasRight('CRUD_CONTACT'),
    function (req, res) {
        ContactService.update(req.params.id, req.body).then(function (data) {
            res.status(200).send(data);
        }).catch(function (err) {
            console.log(err);
            res.status(400).send(err);
        });
    });


/**
 * Add a new contact to the client
 */
router.post('/',
    authenticate.isAuthenticated(),
    authenticate.hasRight('CRUD_CONTACT'),
    function (req, res) {
        ContactService.create(req.body).then(function (data) {
            res.status(200).send(data);
        }).catch(sequelize.ValidationError, function (err) {
            res.status(422).send(err.errors);
        }).catch(function (err) {
            res.status(400).send(err);
        });
    });

/**
 * Delet a contact to a client
 */
router.delete('/:id',
    authenticate.isAuthenticated(),
    authenticate.hasRight('CRUD_CONTACT'),
    function (req, res) {
        ContactService.delete(req.params.id).then(function (data) {
            res.status(200).send([data]);
        }).catch(function (err) {
            res.status(400).send('unknown error');
        })
    });

module.exports = router;
