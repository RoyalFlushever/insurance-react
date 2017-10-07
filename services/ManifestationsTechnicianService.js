/**
 * @module Manifestation People Service
 */

var models = require('./../models');


module.exports.updateManifestationTechnician = function (manifestationDao, technicianUnavailabilityList) {
    try {
       return models.manifestation_technician.findAll({
            where: {
                manifestationId: manifestationDao.id
            },
            include: []
        })
            .then(function (manifestationTechnicianDaoList) {
                var promises = [];
                technicianUnavailabilityList.forEach(function (people) {
                    if (!people.id) {
                        promises.push(models.manifestation_technician.create({
                            firstName: people.firstName|| null,
                            manifestationId: manifestationDao.id || null,
                            lastName: people.lastName || null,
                            age: people.age || null,
                            medicalExamination: people.medicalExamination || null,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        }))
                    }
                });
                manifestationTechnicianDaoList.forEach(function (manifestationTechnicianDao) {
                    var isInList = false;
                    technicianUnavailabilityList.forEach(function (people) {
                        if (people.id && manifestationTechnicianDao.id == people.id) {
                            isInList = true;
                            manifestationTechnicianDao.firstName = people.firstName || null;
                            manifestationTechnicianDao.lastName = people.lastName || null;
                            manifestationTechnicianDao.age = people.age || null;
                            manifestationTechnicianDao.medicalExamination = people.medicalExamination || null;
                            manifestationTechnicianDao.updatedAt = new Date();
                            promises.push(manifestationTechnicianDao.save())
                        }
                    });
                    if (!isInList) {
                        promises.push(models.manifestation_technician.destroy({
                            where: {
                                id: manifestationTechnicianDao.id
                            }
                        }));
                    }
                });
                return Promise.all(promises).then(
                    function (data) {
                        return data;
                    },
                    function (err) {
                        console.error(e);
                    }
                )
            })
    } catch (e) {
        console.error(e);
    }
};
