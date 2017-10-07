"use strict";

module.exports = function(sequelize, DataTypes) {
  var Manifestation = sequelize.define("manifestation", {
    // column in init migration path
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // column in init migration path
    type: {
      type: DataTypes.STRING,
    },
    // column in init migration path
    eventName: {
      type: DataTypes.STRING,
    },
    // column in init migration path
    accountManagerId: {
      type: DataTypes.STRING,
    },
    // column in init migration path
    totalDeclaredBudget: {
      type: DataTypes.STRING,
    },
    // column in init migration path
    policyLanguage: {
      type: DataTypes.STRING,
    },
    // column in init migration path
    currency: {
      type: DataTypes.STRING,
    },
    // column in init migration path
    isBusinessProvider: {
      type: DataTypes.BOOLEAN,
    },
    // column in init migration path
    businessProviderId: {
      type: DataTypes.STRING,
    },
    // column in init migration path
    businessProviderFeesRate: {
      type: DataTypes.STRING,
    },
    // column in init migration path
    hasAdditionalInsuredParty: {
      type: DataTypes.BOOLEAN,
    },
    // column in init migration path
    additionalInsuredPartyName: {
      type: DataTypes.STRING,
    },
    // column in init migration path
    specialConditions: {
      type: DataTypes.STRING,
    },
    // column in init migration path
    endOfGuaranteeRule: {
      type: DataTypes.STRING,
    },
    // column in init migration path
    endOfGuaranteeRuleOnePercentDurationOfTheShow: {
      type: DataTypes.STRING,
    },
    // column in init migration path
    endOfGuaranteeRuleOneHasPlayed: {
      type: DataTypes.STRING,
    },
    // column in init migration path
    endOfGuaranteeRuleOneHasOption: {
      type: DataTypes.STRING,
    },
    // column in init migration path
    endOfGuaranteeRuleTwoActNumberIsOver: {
      type: DataTypes.STRING,
    },
    // column in init migration path
    endOfGuaranteeRuleThreeTimeIsOver: {
      type: DataTypes.STRING,
    },
    // column in init migration path
    endOfGuaranteeRuleFourCondition: {
      type: DataTypes.STRING,
    },
    // column in init migration path
    isCoInsurance: {
      type: DataTypes.BOOLEAN,
    },
    // column in init migration path
    mainInsurerId: {
      type: DataTypes.STRING,
    },
    // column in init migration path
    rateInsurer: {
      type: DataTypes.STRING,
    },
    // column in init migration path
    coInsurerId: {
      type: DataTypes.STRING,
    },
    // column in init migration path
    hasExpert: {
      type: DataTypes.STRING,
    },
    // column in init migration path
    expertId: {
      type: DataTypes.STRING,
    },
    // column in init migration path
    averageClause: {
      type: DataTypes.BOOLEAN,
    },
    // column in init migration path
    averagePremiumClause: {
      type: DataTypes.BOOLEAN,
    },
    // column in init migration path
    contractualIndemnityLimit: {
      type: DataTypes.BOOLEAN,
    },
    // column in init migration path
    contractualIndemnityLimitRate: {
      type: DataTypes.FLOAT
    },
    // column in init migration path
    averageFinancialCommitment: {
      type: DataTypes.FLOAT
    },
    // column in init migration path
    subscriptionDeadLine: {
      type: DataTypes.DATE
    },
    // column in init migration path
    inceptionDate: {
      type: DataTypes.DATE
    },
    // column in init migration path
    eventCategory: {
      type: DataTypes.STRING
    },
    // column in init migration path
    eventStartDate: {
      type: DataTypes.DATE
    },
    // column in init migration path
    eventEndDate: {
      type: DataTypes.DATE
    },
    // column in init migration path
    artist: {
      type: DataTypes.STRING
    },
    // column in init migration path
    dateType: {
      type: DataTypes.STRING
    },
    // column in init migration path
    numberOfInsuredDates: {
      type: DataTypes.INTEGER
    },
    // INDISPONIBILITE
    // column in init migration path
    isPersonUnavailability: {
      type: DataTypes.BOOLEAN
    },
    numberPersonInsured: {
      type: DataTypes.BOOLEAN
    },
    isTechnicianIndispensable: {
      type: DataTypes.BOOLEAN
    },
    numberTechnicianInsured: {
      type: DataTypes.INTEGER
    },
    isTechnicianInsuredNamed: {
      type: DataTypes.BOOLEAN
    },
    //Extension MODULE
    totalBudget: {
      type: DataTypes.FLOAT
    },
    hasUnavailabiliytExtension: {
      type: DataTypes.BOOLEAN
    },
    unavailabilityRate: {
      type: DataTypes.INTEGER
    },
/*    comprehensiveInsuranceRate: {
      type: DataTypes.INTEGER
    },*/
    hasSpecialDispositionExtension: {
      type: DataTypes.BOOLEAN
    },
    specialDisposition: {
      type: DataTypes.STRING
    },
    isFeeDeducted: {
      type: DataTypes.INTEGER
    },
    artisteFee: {
      type: DataTypes.FLOAT
    },
    insuredBudget: {
      type: DataTypes.FLOAT
    },
    hasBadWeatherExtension: {
      type: DataTypes.FLOAT
    },
    badWeatherRate: {
      type: DataTypes.FLOAT
    },
    percentBudgetToBadWeather: {
      type: DataTypes.FLOAT
    },
    weatherBudget: {
      type: DataTypes.FLOAT
    },
    hasCrowShortageExtension: {
      type: DataTypes.BOOLEAN
    },
    franchise: {
      type: DataTypes.FLOAT
    },
    hasBombingExtension: {
      type: DataTypes.BOOLEAN
    },
    bombingRate: {
      type: DataTypes.FLOAT
    },
    bombingNumberOfDay: {
      type: DataTypes.INTEGER
    },
    bombingNumberOfKilometre: {
      type: DataTypes.INTEGER
    },
    bombingHasOptionThreat: {
      type: DataTypes.BOOLEAN
    },
    bombingHasOptionRecommendation: {
      type: DataTypes.BOOLEAN
    },
    hasMoralReasonExtension: {
      type: DataTypes.BOOLEAN
    },
    hasExpertFeeExtension: {
      type: DataTypes.BOOLEAN
    },
    expertWarrantyAmount : {
      type: DataTypes.FLOAT
    },
    expertFranchise : {
      type: DataTypes.FLOAT
    },
    // BUDGET
    BNSType : {
      type: DataTypes.STRING
    },
    applicableFranchise : {
      type: DataTypes.STRING
    },
    comprehensiveInsuranceRate : {
      type: DataTypes.FLOAT
    },
    BNS : {
      type: DataTypes.FLOAT
    },
    franchiseAmount : {
      type: DataTypes.FLOAT
    },
    exposedBudgetUnavailability : {
      type: DataTypes.FLOAT
    },
    exposedBudgetBadWeather : {
      type: DataTypes.FLOAT
    },
    exposedBudgetBombing : {
      type: DataTypes.FLOAT
    },
    excludingTaxRateUnavailability : {
      type: DataTypes.FLOAT
    },
    excludingTaxRateBadWeather : {
      type: DataTypes.FLOAT
    },
    excludingTaxRateBombing : {
      type: DataTypes.FLOAT
    },
    ovationCommission : {
      type: DataTypes.FLOAT
    },
    ovationBSNCommission : {
      type: DataTypes.FLOAT
    },
    taxRate : {
      type: DataTypes.FLOAT
    },
    // scheduleData : {
    //   type: DataTypes.TEXT
    // },

    category : {
      type: DataTypes.STRING
    },
    eventDate : {
      type: DataTypes.DATE
    },
    // artist : {
    //   type: DataTypes.STRING
    // },
    numberInsured : {
      type: DataTypes.INTEGER
    },
    budget : {
      type: DataTypes.INTEGER
    },
    sortPDF : {
      type: DataTypes.INTEGER,
      defaultValue : 0
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  Manifestation.associate = function(models) {
    // Using additional options like CASCADE etc for demonstration
    // Can also simply do Task.belongsTo(models.User);

    Manifestation.belongsTo(models.user, {as: 'accountManager', foreignKey: 'accountManagerId', foreignKeyConstraint:true});
    Manifestation.belongsTo(models.user, {as: 'businessProvider', foreignKey: 'businessProviderId', foreignKeyConstraint:true});
    Manifestation.belongsTo(models.user, {as: 'mainInsurer', foreignKey: 'mainInsurerId', foreignKeyConstraint:true});
    Manifestation.belongsTo(models.user, {as: 'coInsurer', foreignKey: 'coInsurerId', foreignKeyConstraint:true});
    Manifestation.belongsTo(models.expert, {as: 'expert', foreignKey: 'expertId', foreignKeyConstraint:true});
    //Manifestation.hasMany(models.manifestation_date, {as: 'dateList', foreignKey: 'manifestationId', foreignKeyConstraint:true});
    Manifestation.hasMany(models.manifestation_person, {as: 'personUnavailabilityList', foreignKey: 'manifestationId', foreignKeyConstraint:true});
    Manifestation.hasMany(models.manifestation_technician, {as: 'technicianUnavailabilityList', foreignKey: 'manifestationId', foreignKeyConstraint:true});

    models.manifestation.hasMany(models.manifestation_dates, {as: 'manifestationDates', foreignKey: 'manifestationId', constraints: true});
  };
  return Manifestation;
};
