var express = require('express');
var router = express.Router();
var ManifestationDatesService  = require('./../../services/ManifestationDatesService');
var ManifestationController  = require('./../../controllers/ManifestationController');

/**
 * update manifestation provider by Id
 */
router.delete('/:id', function(req, res) {
    ManifestationDatesService.deleteById(req.params.id).then(
        function(data){
            res.status(200).send()
        }
    )
});

module.exports = router;
