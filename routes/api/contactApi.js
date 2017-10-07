/**
 * @module client contact routes
 */

var express = require('express');
var router = express.Router();
var ContactController = require('./../../controllers/ContactController');
var authenticate = require('./../../modules/authenticate');

/**
 * Get contact of expert
 */
router.get('/contact',
    authenticate.isAuthenticated(),
    authenticate.hasRight('CRUD_CONTACT'),
    ContactController.loadContacts
);

/**
 * get expert contact by ID
 */
router.get('/contact/:id',
    authenticate.isAuthenticated(),
    authenticate.hasRight('CRUD_CONTACT'),
    ContactController.loadContact
);

/**
 * create an expert contact
 */
router.post('/contact',
    authenticate.isAuthenticated(),
    authenticate.hasRight('CRUD_CONTACT'),
    ContactController.addContact
);

/**
 * edit an expert  contact by ID
 */
router.put('/contact/:id',
    authenticate.isAuthenticated(),
    authenticate.hasRight('CRUD_CONTACT'),
    ContactController.updateContact
);

/**
 * delete an expert contact by ID
 */
router.delete('/contact/:id',
    authenticate.isAuthenticated(),
    authenticate.hasRight('CRUD_CONTACT'),
    ContactController.deleteContact
);

module.exports = router;
