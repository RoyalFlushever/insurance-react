var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var ParagraphService = require('./../../services/ParagraphService');


router.get('/', function(req, res) {
	ParagraphService.get(req.query).then(function(data) {
		res.status(200).send(data);
	}).catch(function(err) {
		res.status(404).send(err);
	});
});
router.post('/', function(req, res) {
	ParagraphService.create(req.body).then(function(data) {
		res.status(200).send(data);
	}).catch(function(err) {
		res.status(404).send(err);
	});
});
router.put('/:id', function(req, res) {
	ParagraphService.update(req.params.id, req.body).then(function(data) {
		res.status(200).send(data);
	}).catch(function(err) {
		res.status(404).send(err);
	});
});
router.delete('/:id', function(req, res) {
	ParagraphService.delete(req.params.id).then(function(data) {
		res.status(200).send();
	}).catch(function(err) {
		res.status(404).send(err);
	});
});

module.exports = router;
