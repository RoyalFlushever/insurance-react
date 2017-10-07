var models = require('./../models');
var sha1 = require('sha1');
var ManifestationsPeopleService = require('./ManifestationsPeopleService')
var ManifestationsTechnicianService = require('./ManifestationsTechnicianService')

function hydrate(dao, data) {
  "use strict";
  if (dao && data) {
    dao.eventName = data.eventName || null;
    dao.totalDeclaredBudget = data.totalDeclaredBudget || null;
    dao.type = data.type || null;
    dao.accountManagerId = data.accountManagerId || null;
    dao.policyLanguage = data.policyLanguage || null;
    dao.currency = data.currency || null;
    dao.isBusinessProvider = data.isBusinessProvider || null;
    dao.businessProviderId = data.businessProviderId || null;
    dao.businessProviderFeesRate = data.businessProviderFeesRate || null;
    dao.hasAdditionalInsuredParty = data.hasAdditionalInsuredParty || null;
    dao.additionalInsuredPartyName = data.additionalInsuredPartyName || null;
    dao.specialConditions = data.specialConditions || null;
    dao.endOfGuaranteeRule = data.endOfGuaranteeRule || null;
    dao.endOfGuaranteeRuleOnePercentDurationOfTheShow = data.endOfGuaranteeRuleOnePercentDurationOfTheShow || null;
    dao.endOfGuaranteeRuleOneHasPlayed = data.endOfGuaranteeRuleOneHasPlayed || null;
    dao.endOfGuaranteeRuleOneHasOption = data.endOfGuaranteeRuleOneHasOption || null;
    dao.endOfGuaranteeRuleTwoActNumberIsOver = data.endOfGuaranteeRuleTwoActNumberIsOver || null;
    dao.endOfGuaranteeRuleThreeTimeIsOver = data.endOfGuaranteeRuleThreeTimeIsOver || null;
    dao.endOfGuaranteeRuleFourCondition = data.endOfGuaranteeRuleFourCondition || null;
    dao.isCoInsurance = data.isCoInsurance || null;
    dao.mainInsurerId = data.mainInsurerId || null;
    dao.rateInsurer = data.rateInsurer || null;
    dao.coInsurerId = data.coInsurerId || null;
    dao.hasExpert = data.hasExpert || null;
    dao.expertId = data.expertId || null;
    dao.averageClause = data.averageClause || null;
    dao.averagePremiumClause = data.averagePremiumClause || null;
    dao.contractualIndemnityLimit = data.contractualIndemnityLimit || null;
    dao.contractualIndemnityLimitRate = data.contractualIndemnityLimitRate || null;
    dao.averageFinancialCommitment = data.averageFinancialCommitment || null;
    dao.subscriptionDeadLine = data.subscriptionDeadLine || new Date();
    dao.inceptionDate = data.inceptionDate || new Date();
    dao.eventCategory = data.eventCategory || null;
    dao.eventStartDate = data.eventStartDate || new Date();
    dao.eventEndDate = data.eventEndDate || null;
    dao.artist = data.artist || null;
    dao.dateType = data.dateType || null;
    dao.numberOfInsuredDates = data.numberOfInsuredDates || null;
    dao.isPersonUnavailability = data.isPersonUnavailability || null;
    dao.numberPersonInsured = data.numberPersonInsured || null;
    dao.numberTechnicianInsured = data.numberTechnicianInsured || null;
    dao.isTechnicianInsuredNamed = data.isTechnicianInsuredNamed || null;
    dao.totalBudget = data.totalBudget || null;
    dao.unavailabilityRate = data.unavailabilityRate || null;
    dao.hasSpecialDispositionExtension = data.hasSpecialDispositionExtension || null;
    dao.specialDisposition = data.specialDisposition || null;
    dao.hasUnavailabiliytExtension = data.hasUnavailabiliytExtension || null;
    dao.isFeeDeducted = data.isFeeDeducted || null;
    dao.artisteFee = data.artisteFee || null;
    dao.hasBadWeatherExtension = data.hasBadWeatherExtension || null;
    dao.badWeatherRate = data.badWeatherRate || null;
    dao.percentBudgetToBadWeather = data.percentBudgetToBadWeather || null;
    dao.hasCrowShortageExtension = data.hasCrowShortageExtension || null;
    dao.franchise = data.franchise || null;
    dao.hasBombingExtension = data.hasBombingExtension || null;
    dao.bombingRate = data.bombingRate || null;
    dao.bombingNumberOfDay = data.bombingNumberOfDay || null;
    dao.bombingNumberOfKilometre = data.bombingNumberOfKilometre || null;
    dao.bombingHasOptionThreat = data.bombingHasOptionThreat || null;
    dao.bombingHasOptionRecommendation = data.bombingHasOptionRecommendation || null;
    dao.hasMoralReasonExtension = data.hasMoralReasonExtension || null;
    dao.hasExpertFeeExtension = data.hasExpertFeeExtension || null;
    dao.expertWarrantyAmount = data.expertWarrantyAmount || null;
    dao.expertFranchise = data.expertFranchise || null;
    dao.BNSType = data.BNSType || null;
    dao.applicableFranchise = data.applicableFranchise || null;
    dao.comprehensiveInsuranceRate = data.comprehensiveInsuranceRate || null;
    dao.BNS = data.BNS || null;
    dao.franchiseAmount = data.franchiseAmount || null;
    dao.exposedBudgetUnavailability = data.exposedBudgetUnavailability || null;
    dao.exposedBudgetBadWeather = data.exposedBudgetBadWeather || null;
    dao.exposedBudgetBombing = data.exposedBudgetBombing || null;
    dao.excludingTaxRateUnavailability = data.excludingTaxRateUnavailability || null;
    dao.excludingTaxRateBadWeather = data.excludingTaxRateBadWeather || null;
    dao.excludingTaxRateBombing = data.excludingTaxRateBombing || null;
    dao.ovationCommission = data.ovationCommission || null;
    dao.ovationBSNCommission = data.ovationBSNCommission || null;
    dao.isTechnicianIndispensable = data.isTechnicianIndispensable || null;
    dao.taxRate = data.taxRate || null;
    // dao.scheduleData = data.scheduleData || null;
    dao.category = data.category,
    dao.eventDate = data.eventDate,
    dao.eventEndDate = data.eventEndDate,
    dao.artist = data.artist,
    dao.dateType = data.dateType,
    dao.numberInsured = data.numberInsured,
    dao.budget = data.budget,
    // dao.manifestationDates = data.manifestationDates,

    dao.updatedAt = new Date();
    return dao;
  } else {}
}

/**
 * Get all Business Provider
 *  @param query {json} - json of the query (offset, limit, order, where)
 * @returns {Promise.<Array.<Manifestation>>}
 */
 
module.exports.readAll = function(query) {
  console.log('query: ', query);
  var queryParams = {};
  if (query['offset'])
    queryParams.offset = parseInt(query['offset']);
  if (query['limit'])
    queryParams.limit = parseInt(query['limit']);
  var sortable = ['deletedAt', 'businessName', 'address', 'zipCode', 'city'];
  if (sortable.indexOf(query['sort']) > -1)
    queryParams.order = [
      [
        query['sort'], query['order'] === 'DESC'
          ? 'DESC'
          : 'ASC'
      ]
    ];
  if (query['search'])
    queryParams.where = {
      eventName: {
        $like: '%' + query['search'] + '%'
      }
    };
  return models.manifestation.findAll(queryParams);

};

module.exports.count = function(query) {
  var queryParams = {};
  if (query['showDisabled'])
    queryParams.paranoid = false;
  return models.manifestation.count(queryParams);
};

/**
 * Get Business Provider by Id
 * @param id {string} - id of the manifestation
 * @returns {Promise.<Array.<Manifestation>>}
 */
module.exports.readById = function(id) {
  return models.manifestation.findAll({
    where: {
      id: id
    },
    include: [
      {
        model: models.manifestation_dates,
        as: 'manifestationDates'
      }, {
        model: models.manifestation_person,
        as: 'personUnavailabilityList'
      }, {
        model: models.manifestation_technician,
        as: 'technicianUnavailabilityList'
      }
    ]
  }).then(function(businessProviderDaoList) {
    if (businessProviderDaoList && businessProviderDaoList.length === 1) {
      return businessProviderDaoList[0];
    } else {
      throw {
        status: 404,
        err: 'Manifestation not found ( id : ' + id + ')'
      };
    }
  }).catch(function(err) {
    throw {status: 500, err: err, id: id};
  })

};

const storeManifestationDates = (id, data) => {
  if (id && data["length"] && data.length > 0) {
    console.log(data);
    data.forEach((e, i) => {
      data[i].manifestationId = id;
      data[i].date = e.date.value;
      // if (data[i].id) {
      //   delete data[i].createdAt;
      //   delete data[i].updatedAt;
      // }
    });
    models.manifestation_dates.bulkCreate(data, {
      fields: [
        'id',
        'manifestationId',
        'date',
        'country',
        'zipCode',
        'place',
        'scene',
        'damageBasis',
        'amount',
      ],
      updateOnDuplicate: [
        'date',
        'country',
        'zipCode',
        'place',
        'scene',
        'damageBasis',
        'amount',
      ]
    })
    .then( () => {})
    .catch(err => {
      throw {
        status: 500,
        err: err
      };
    })
  }
}

/**
 * Create Business Provider
 * @param businessProvider
 * @returns {*}
 */
module.exports.create = function(manifestation) {
  return models.manifestation.create({
    eventName: manifestation.eventName || null,
    totalDeclaredBudget: manifestation.totalDeclaredBudget || null,
    type: manifestation.type || null,
    accountManagerId: manifestation.accountManagerId || null,
    policyLanguage: manifestation.policyLanguage || null,
    currency: manifestation.currency || null,
    isBusinessProvider: manifestation.isBusinessProvider || null,
    businessProviderId: manifestation.businessProviderId || null,
    businessProviderFeesRate: manifestation.businessProviderFeesRate || null,
    hasAdditionalInsuredParty: manifestation.hasAdditionalInsuredParty || null,
    additionalInsuredPartyName: manifestation.additionalInsuredPartyName || null,
    specialConditions: manifestation.specialConditions || null,
    endOfGuaranteeRule: manifestation.endOfGuaranteeRule || null,
    endOfGuaranteeRuleOnePercentDurationOfTheShow: manifestation.endOfGuaranteeRuleOnePercentDurationOfTheShow || null,
    endOfGuaranteeRuleOneHasPlayed: manifestation.endOfGuaranteeRuleOneHasPlayed || null,
    endOfGuaranteeRuleOneHasOption: manifestation.endOfGuaranteeRuleOneHasOption || null,
    endOfGuaranteeRuleTwoActNumberIsOver: manifestation.endOfGuaranteeRuleTwoActNumberIsOver || null,
    endOfGuaranteeRuleThreeTimeIsOver: manifestation.endOfGuaranteeRuleThreeTimeIsOver || null,
    endOfGuaranteeRuleFourCondition: manifestation.endOfGuaranteeRuleFourCondition || null,
    isCoInsurance: manifestation.isCoInsurance || null,
    mainInsurerId: manifestation.mainInsurerId || null,
    rateInsurer: manifestation.rateInsurer || null,
    coInsurerId: manifestation.coInsurerId || null,
    hasExpert: manifestation.hasExpert || null,
    expertId: manifestation.expertId || null,
    averageClause: manifestation.averageClause || null,
    averagePremiumClause: manifestation.averagePremiumClause || null,
    contractualIndemnityLimit: manifestation.contractualIndemnityLimit || null,
    contractualIndemnityLimitRate: manifestation.contractualIndemnityLimitRate || null,
    averageFinancialCommitment: manifestation.averageFinancialCommitment || null,
    subscriptionDeadLine: manifestation.subscriptionDeadLine || new Date(),
    hasUnavailabiliytExtension: manifestation.hasUnavailabiliytExtension || null,
    inceptionDate: manifestation.inceptionDate || new Date(),
    eventCategory: manifestation.eventCategory || null,
    eventStartDate: manifestation.eventStartDate || new Date(),
    eventEndDate: manifestation.eventEndDate || null,
    artist: manifestation.artist || null,
    dateType: manifestation.dateType || null,
    numberOfInsuredDates: manifestation.numberOfInsuredDates || null,
    numberPersonInsured: manifestation.numberPersonInsured || null,
    numberTechnicianInsured: manifestation.numberTechnicianInsured || null,
    isTechnicianInsuredNamed: manifestation.isTechnicianInsuredNamed || null,
    totalBudget: manifestation.totalBudget || null,
    unavailabilityRate: manifestation.unavailabilityRate || null,
    hasSpecialDispositionExtension: manifestation.hasSpecialDispositionExtension || null,
    specialDisposition: manifestation.specialDisposition || null,
    isFeeDeducted: manifestation.isFeeDeducted || null,
    artisteFee: manifestation.artisteFee || null,
    hasBadWeatherExtension: manifestation.hasBadWeatherExtension || null,
    badWeatherRate: manifestation.badWeatherRate || null,
    percentBudgetToBadWeather: manifestation.percentBudgetToBadWeather || null,
    hasCrowShortageExtension: manifestation.hasCrowShortageExtension || null,
    franchise: manifestation.franchise || null,
    hasBombingExtension: manifestation.hasBombingExtension || null,
    bombingRate: manifestation.bombingRate || null,
    bombingNumberOfDay: manifestation.bombingNumberOfDay || null,
    bombingNumberOfKilometre: manifestation.bombingNumberOfKilometre || null,
    bombingHasOptionThreat: manifestation.bombingHasOptionThreat || null,
    bombingHasOptionRecommendation: manifestation.bombingHasOptionRecommendation || null,
    hasMoralReasonExtension: manifestation.hasMoralReasonExtension || null,
    hasExpertFeeExtension: manifestation.hasExpertFeeExtension || null,
    expertWarrantyAmount: manifestation.expertWarrantyAmount || null,
    expertFranchise: manifestation.expertFranchise || null,
    BNSType: manifestation.BNSType || null,
    applicableFranchise: manifestation.applicableFranchise || null,
    comprehensiveInsuranceRate: manifestation.comprehensiveInsuranceRate || null,
    BNS: manifestation.BNS || null,
    franchiseAmount: manifestation.franchiseAmount || null,
    exposedBudgetUnavailability: manifestation.exposedBudgetUnavailability || null,
    exposedBudgetBadWeather: manifestation.exposedBudgetBadWeather || null,
    exposedBudgetBombing: manifestation.exposedBudgetBombing || null,
    excludingTaxRateUnavailability: manifestation.excludingTaxRateUnavailability || null,
    excludingTaxRateBadWeather: manifestation.excludingTaxRateBadWeather || null,
    excludingTaxRateBombing: manifestation.excludingTaxRateBombing || null,
    ovationCommission: manifestation.ovationCommission || null,
    ovationBSNCommission: manifestation.ovationBSNCommission || null,
    taxRate: manifestation.taxRate || null,
    // scheduleData: manifestation.scheduleData || null,
    category: manifestation.category || null,
    eventDate: manifestation.eventDate || null,
    eventEndDate: manifestation.eventEndDate || null,
    artist: manifestation.artist || null,
    dateType: manifestation.dateType || null,
    numberInsured: manifestation.numberInsured || null,
    budget: manifestation.budget || null,
    isPersonUnavailability: manifestation.isPersonUnavailability || null,
    isTechnicianIndispensable: manifestation.isTechnicianIndispensable || null,
    // manifestationDates: manifestation.manifestationDates || null,

    createdAt: new Date(),
    updatedAt: new Date()

  }).then(manifestationDao => {
    const id = manifestationDao.get('id');
    try {
      const data = manifestation.manifestationDates
      ? JSON.parse(manifestation.manifestationDates)
      : [];
      storeManifestationDates(id, data);
    } catch (e) {
      throw {
        status: 500,
        err: 'Failed parsing manifestation dates JSON: ' + manifestation.manifestationDates
      };
    }

    ManifestationsPeopleService.updateManifestationPeople(manifestationDao, manifestation.personUnavailabilityList)
    .then(
      (manifestationPersonDaoList) => {
        return manifestationDao;
      }
    )
    .catch(err => {
      throw {
        status: 500,
        err: err
      };
    })

  }).catch(err => {
    throw {status: 500, err: err};
  });
};

/**
 * Create Manifestation
 * @param id {string} - id of the manifestation
 * @param manifestation {json} - data of the manifestation
 * @returns {*}
 */
module.exports.editById = function(id, manifestation) {
  return this.readById(id).then(function(manifestationDao) {
    if (manifestationDao) {
      hydrate(manifestationDao, manifestation);
      return manifestationDao.save().then((manifestationDao) => {
        return Promise.all([
          ManifestationsPeopleService.updateManifestationPeople(manifestationDao, manifestation.personUnavailabilityList),
          ManifestationsTechnicianService.updateManifestationTechnician(manifestationDao, manifestation.technicianUnavailabilityList),
          new Promise(function(resolve, reject) {
            const data = manifestation.manifestationDates
              ? JSON.parse(manifestation.manifestationDates)
              : [];
            storeManifestationDates(id, data);
            resolve()
          })
        ]).then((data) => {
          return manifestationDao;
        })
      })
    }
  }).catch(function(err) {
    throw {status: 500, err: err};
  });
};

/**
 * Delete manifestation
 * @param id {string} - id of the manifestation
 * @returns {*}
 */
module.exports.deleteById = function(id) {
  // TODO: delete connected rows in manifestations_dates
  return models.manifestation.destroy({
    where: {
      id: id
    }
  })
  .then( () => {
    models.manifestation_dates.destroy({
        where: {
            manifestationId: id
        }
    });
  });
};

module.exports.update = function(id, data) {
    return models.manifestation.update(data, {
        where: {
            id: id
        }
    })
};
