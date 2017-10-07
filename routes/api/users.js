/**
 * @module User route
 */

var express = require('express');
var router = express.Router();
var UsersService = require('./../../services/UsersService');
var ExpertController = require('./../../controllers/ExpertController');
var passport = require('passport');
var authenticate = require('./../../modules/authenticate');
var sequelize = require('sequelize');

/**
 * Login function to create session
 * By login ( email) and password
 */
router.post('/login', function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.redirect('/login');
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.redirect('/');
            });
        })(req, res, next);
    }
);
/**
 * LogOut
 */
router.post('/logout', function (req, res, next) {
        req.logout();
        res.status(200).send({})
    }
);

/**
 * Route use to get all user typed Account manager
 */
router.get('/accountManager',
    authenticate.isAuthenticated(),
    authenticate.hasRight('GET_USER_LIST'),
    function (req, res) {
        UsersService.findAccountManager(req.body).then(function (data) {
            res.status(200).send(data);
        }).catch(function (err) {
            res.status(404).send(err);
        });
    }
);

/**
 * This function return the log user
 */
router.get('/me',
    function (req, res, next) {
        if (req.isAuthenticated()) {
            UsersService.readById(req.user.id).then(
                function (data) {
                    res.status(200).send(data)
                }, function (err) {
                    res.status(err.status).send(err)
                }
            )
        } else {
            res.status(401).send();
        }
    }
);

/**
 * Get all entries
 * @param offset - the number of rows to skip before selecting data
 * @param limit - the maximum number of rows to fetch
 */
router.get('/',
    authenticate.isAuthenticated(),
    authenticate.hasRight('GET_USER_LIST'),
    function (req, res) {
        UsersService.getAll(req.query).then(function (data) {
            res.status(200).send(data);
        }).catch(function (err) {
            res.status(404).send(err);
        });
    });

/**
 * Get the count of all user
 */
router.get('/count',
    authenticate.isAuthenticated(),
    authenticate.hasRight('GET_USER_LIST'),
    function (req, res) {
        UsersService.count(req.query).then(function (data) {
            res.status(200).send({
                count: data
            });
        }).catch(function (err) {
            res.status(404).send(err);
        })
    });

/**
 * Create new user
 */
router.post('/',
    authenticate.isAuthenticated(),
    authenticate.hasRight('CREATE_USER'),
    function (req, res, next) {
        UsersService.create(req.body).then(
            function (data) {
                res.status(200).send(data)
            }
        )
    });

/**
 * Get user by Id
 * @params id - Id of the user
 */
router.get('/:id', function (req, res) {
    UsersService.readById(req.params.id).then(
        function (data) {
            res.status(200).send(data)
        }, function (err) {
            res.status(err.status).send(err)
        }
    ).catch(function (err) {
        res.status(404).send(err);
    });
});

/**
 * Update user by Id
 * @params id - Id of the user

 */
router.put('/:id', function (req, res) {
    UsersService.editById(req.params.id, req.body).then(
        function (data) {
            res.status(200).send(data)
        }
    )
});

/**
 * update user by Id
 * @params id - Id of the user
 */
router.delete('/:id', function (req, res) {
    UsersService.delete(req.params.id).then(
        function (data) {
            res.status(200).send()
        }
    )
});

module.exports = router;
