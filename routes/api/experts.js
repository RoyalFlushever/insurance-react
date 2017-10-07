/**
 * @module expert routes
 */

var express = require('express');
var router = express.Router();
var ExpertController = require('./../../controllers/ExpertController');
var authenticate = require('./../../modules/authenticate');


/**
 * Get the number of expert
 */
router.get('/count',
    authenticate.isAuthenticated(),
    authenticate.hasRight('GET_EXPERT_LIST'),
    ExpertController.getCount
);

/**
 * Get the expert list
 */
router.get('/',
    authenticate.isAuthenticated(),
    authenticate.hasRight('GET_EXPERT_LIST'),
    ExpertController.loadExperts
);

/**
 * Get an expert by ID
 */
router.get('/:id',
    authenticate.isAuthenticated(),
    authenticate.hasRight('GET_EXPERT_LIST'),
    ExpertController.loadExpert
);

/**
 * Create a new expert
 */
router.post('/',
    authenticate.isAuthenticated(),
    authenticate.hasRight('CREATE_EXPERT'),
    ExpertController.addExpert
);

/**
 * Edit an expert by ID
 */
router.put('/:id',
    authenticate.isAuthenticated(),
    authenticate.hasRight('CREATE_EXPERT'),
    ExpertController.updateExpert
);

/**
 * Delete an expert by ID
 */
router.delete('/:id',
    authenticate.isAuthenticated(),
    authenticate.hasRight('CREATE_EXPERT'),
    ExpertController.deleteExpert
);

module.exports = router;
