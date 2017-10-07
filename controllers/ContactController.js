var db = require('../models')
var models  = require('./../models')

module.exports.loadContacts = (req, res, next) => {
    models.contact.findAll({where: {expert_id: parseInt(req.query.expert_id, 10)}}).then(results => {
        return res.status(200).json(results)
    }).catch(next)
}

module.exports.addContact = (req, res, next) => {
    models.contact.create(req.body).then(result => {
        return res.status(200).json(result)
    }).catch(next)
}

module.exports.loadContact = (req, res, next) => {
    models.contact.findById(req.params.id).then(result => {
        return res.status(200).json(result)
    }).catch(next)
}

module.exports.updateContact = (req, res, next) => {
    models.contact.update(req.body,
        {
            where: {
                id: req.params.id
            }
        }
    ).then(result => {
        return res.status(200).json(result)
    }).catch(next)
}

module.exports.deleteContact = (req, res, next) => {
    models.contact.destroy({
        where: {
            id: req.params.id
        }
    }).then(result => {
        return res.status(200).json(result)
    }).catch(next)
}
