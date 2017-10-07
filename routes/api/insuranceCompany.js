/**
 * @module expert routes
 */

var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var InsuranceCompanyService = require('./../../services/InsuranceCompanyService');
var authenticate = require('./../../modules/authenticate');


/**
 * Get all entries
 * @param offset: the number of rows to skip before selecting data
 * @param limit: the maximum number of rows to fetch
 */
router.get('/',
    //TODO authenticate.isAuthenticated(),
    //TODO authenticate.hasRight('GET_COMPANY_LIST'),
    function (req, res) {
        InsuranceCompanyService.get(req.query).then(function (data) {
            res.status(200).send(data);
        }).catch(function (err) {
            res.status(404).send(err);
        })
    }
);

/**
 * Edit the Insurance Company's information
 */
router.get('/:id',
    //authenticate.isAuthenticated(),
    //authenticate.hasRight('GET_COMPANY_LIST'),
    function (req, res) {
        InsuranceCompanyService.getById(req.params.id).then(function (data) {
            res.status(200).send(data);
        }).catch(function (err) {
            console.log(err);
            res.status(400).send(err);
        });
    }
);

/**
 * Get the count of all entries
 */
router.get('/count',
    authenticate.isAuthenticated(),
    authenticate.hasRight('GET_COMPANY_LIST'),
    function (req, res) {
        InsuranceCompanyService.count(req.query).then(function (data) {
            res.status(200).send({
                count: data
            });
        }).catch(function (err) {
            res.status(404).send(err);
        })
    });

/**
 * Edit the Insurance Company's information
 */
router.put('/:id',
    authenticate.isAuthenticated(),
    function (req, res) {
        InsuranceCompanyService.edit(req.params.id, req.body.assureur).then(function (data) {
            res.status(200).send(data);
        }).catch(function (err) {
            console.log(err);
            res.status(400).send(err);
        });
    });


/**
 * Add a new Insurance Company in database
 */
router.post('/',
    //authenticate.isAuthenticated(),
    function (req, res) {
        InsuranceCompanyService.edit(null, req.body.assureur).then(function (data) {
            res.status(200).send(data);
        }).catch(sequelize.ValidationError, function (err) {
            res.status(422).send(err.errors);
        }).catch(function (err) {
            res.status(400).send(err);
        });
    });


/**
 * Mark an Insurance Company as disabled
 */
router.delete('/:id',
    authenticate.isAuthenticated(),
    function (req, res) {
        InsuranceCompanyService.delete(req.params.id).then(function (data) {
            res.status(200).send([data]);
        }).catch(function (err) {
            res.status(400).send('unknown error');
        })
    });


/**
 * Restore a disabled Insurance Company
 */
router.patch('/:id',
    authenticate.isAuthenticated(),
    function (req, res) {
        InsuranceCompanyService.update(req.params.id, {deletedAt: null}).then(function (data) {
            res.status(200).send(data);
        }).catch(function (err) {
            res.status(400).send('unknown error');
        })
    });

module.exports = router;
