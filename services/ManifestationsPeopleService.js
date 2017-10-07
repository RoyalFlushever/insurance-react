/**
 * @module Manifestation People Service
 */

var models = require('./../models');

module.exports.updateManifestationPeople = function(manifestationDao, personUnavailabilityList) {
  try {
    return models.manifestation_person.findAll({
      where: {
        manifestationId: manifestationDao.id
      },
      include: []
    }).then(function(manifestationPersonDaoList) {
      var promises = [];
      personUnavailabilityList.forEach(function(people) {
        if (!people.id) {
          promises.push(models.manifestation_person.create({
            band: people.band || null,
            manifestationId: manifestationDao.id || null,
            function: people.function || null,
            replaceable: people.replaceable || null,
            age: people.age || null,
            medicalExamination: people.medicalVisitation || null,
            createdAt: new Date(),
            updatedAt: new Date()
          }))
        }
      });
      manifestationPersonDaoList.forEach(function(manifestationPersonDao) {
        var isInList = false;
        personUnavailabilityList.forEach(function(people) {
          if (people.id && manifestationPersonDao.id == people.id) {
            isInList = true;
            manifestationPersonDao.band = people.band || null;
            manifestationPersonDao.function = people.function || null;
            manifestationPersonDao.replaceable = people.replaceable || null;
            manifestationPersonDao.age = people.age || null;
            manifestationPersonDao.medicalExamination = people.medicalVisitation || null;
            manifestationPersonDao.updatedAt = new Date();
            promises.push(manifestationPersonDao.save())
          }
        });
        if (!isInList) {
          promises.push(models.manifestation_person.destroy({
            where: {
              id: manifestationPersonDao.id
            }
          }));
        }
      });
      return Promise.all(promises).then(function(data) {
        return data;
      }, function(err) {
        console.error(e);
      })
    })
  } catch (e) {
    console.error(e);
  }
};
