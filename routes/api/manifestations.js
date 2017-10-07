/**
 * @module manifestation  routes
 */

var express = require('express');
var router = express.Router();
var ManifestationsService = require('./../../services/ManifestationsService');
var ManifestationController = require('./../../controllers/ManifestationController');
var authenticate = require('./../../modules/authenticate');

/**
 * Get all manifestation provider
 */
router.get('/',
    authenticate.isAuthenticated(),
    function (req, res, next) {
        ManifestationsService.readAll(req.query).then(
            function (data) {
                res.status(200).send(data)
            }
        )
    });

/**
 * Get the count of all entries
 */
router.get('/count',
    authenticate.isAuthenticated(),
    function (req, res) {
        ManifestationsService.count(req.query).then(function (data) {
            res.status(200).send({
                count: data
            });
        }).catch(function (err) {
            res.status(404).send(err);
        })
    });

/**
 * Get all manifestation provider
 */
router.post('/',
    authenticate.isAuthenticated(),
    function (req, res, next) {
        ManifestationController.create(req.body).then(
            function (data) {
                res.status(200).send(data)
            }
        )
    });

/**
 * Get manifestation provider by Id
 */
router.get('/:id',
    authenticate.isAuthenticated(),
    function (req, res) {
        ManifestationsService.readById(req.params.id).then(
            function (data) {
                res.status(200).send(data)
            }, function (err) {
                res.status(err.status).send(err)
            }
        )
    });


/**
 * Update manifestation provider by Id
 */
router.put('/:id',
    authenticate.isAuthenticated(),
    function (req, res) {
        ManifestationsService.editById(req.params.id, req.body).then(
            function (data) {
                res.status(200).send(data)
            }
        )
    });

/**
 * update manifestation provider by Id
 */
router.delete('/:id',
    authenticate.isAuthenticated(),
    function (req, res) {
        ManifestationsService.deleteById(req.params.id).then(
            function (data) {
                res.status(200).send()
            }
        )
    });

router.put('/update/:id', function(req, res) {
    ManifestationsService.update(req.params.id, req.body).then(function(data) {
        res.status(200).send(data);
    }).catch(function(err) {
        res.status(404).send(err);
    });
});

module.exports = router;
