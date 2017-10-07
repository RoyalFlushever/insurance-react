----------------------------------
 businessStatus
----------------------------------

Attributes :
businessStatus.id
businessStatus.label
businessStatus.createdAt
businessStatus.updatedAt

Associations :


----------------------------------
 business_provider
----------------------------------

Attributes :
business_provider.id
business_provider.type
business_provider.businessName
business_provider.businessProviderLastName
business_provider.businessProviderFirstName
business_provider.companyId
business_provider.status
business_provider.commissionPercent
business_provider.address
business_provider.address2
business_provider.zipCode
business_provider.city
business_provider.country
business_provider.email
business_provider.phone
business_provider.createdAt
business_provider.updatedAt

Associations :
business_provider.getBusinessProviderUser()
business_provider.setBusinessProviderUser()
business_provider.createBusinessProviderUser()


----------------------------------
 client
----------------------------------

Attributes :
client.id
client.isPro
client.businessName
client.siretNumber
client.statusId
client.vatNumber
client.stdPhone
client.title
client.lastName
client.firstName
client.email
client.phone
client.relationShipManagerId
client.stateId
client.address
client.addressCompl
client.postalCode
client.city
client.countryId
client.businessProviderId
client.createdAt
client.updatedAt

Associations :
client.getContacts()
client.setContacts()
client.addContacts()
client.addContact()
client.createContact()
client.removeContact()
client.removeContacts()
client.hasContact()
client.hasContacts()
client.countContacts()
client.getBusinessStatus()
client.setBusinessStatus()
client.createBusinessStatus()


----------------------------------
 clientContact
----------------------------------

Attributes :
clientContact.id
clientContact.clientId
clientContact.title
clientContact.lastName
clientContact.firstName
clientContact.email
clientContact.fax
clientContact.phone
clientContact.mobile
clientContact.address
clientContact.addressCompl
clientContact.postalCode
clientContact.city
clientContact.createdAt
clientContact.updatedAt

Associations :
clientContact.getClient()
clientContact.setClient()
clientContact.createClient()


----------------------------------
 contact
----------------------------------

Attributes :
contact.id
contact.expert_id
contact.first_name
contact.last_name
contact.address1
contact.address2
contact.zipCode
contact.email
contact.city
contact.switchboardPhone
contact.mobile
contact.fax
contact.skill
contact.gender
contact.createdAt
contact.updatedAt

Associations :


----------------------------------
 expert
----------------------------------

Attributes :
expert.id
expert.businessName
expert.address1
expert.address2
expert.zipCode
expert.city
expert.switchboardPhone
expert.country
expert.fax
expert.email
expert.createdAt
expert.updatedAt

Associations :


----------------------------------
 groupe
----------------------------------

Attributes :
groupe.id
groupe.label
groupe.createdAt
groupe.updatedAt

Associations :


----------------------------------
 insuranceCompany
----------------------------------

Attributes :
insuranceCompany.id
insuranceCompany.businessName
insuranceCompany.siret
insuranceCompany.brokerId
insuranceCompany.contactLastName
insuranceCompany.contactFirstName
insuranceCompany.contactEmail
insuranceCompany.address
insuranceCompany.addressSecondLine
insuranceCompany.zipCode
insuranceCompany.city
insuranceCompany.country
insuranceCompany.switchBoardPhone
insuranceCompany.file
insuranceCompany.createdAt
insuranceCompany.updatedAt
insuranceCompany.deletedAt

Associations :


----------------------------------
 manifestation
----------------------------------

Attributes :
manifestation.id
manifestation.type
manifestation.eventName
manifestation.accountManagerId
manifestation.totalDeclaredBudget
manifestation.policyLanguage
manifestation.currency
manifestation.isBusinessProvider
manifestation.businessProviderId
manifestation.businessProviderFeesRate
manifestation.hasAdditionalInsuredParty
manifestation.additionalInsuredPartyName
manifestation.specialConditions
manifestation.endOfGuaranteeRule
manifestation.endOfGuaranteeRuleOnePercentDurationOfTheShow
manifestation.endOfGuaranteeRuleOneHasPlayed
manifestation.endOfGuaranteeRuleOneHasOption
manifestation.endOfGuaranteeRuleTwoActNumberIsOver
manifestation.endOfGuaranteeRuleThreeTimeIsOver
manifestation.endOfGuaranteeRuleFourCondition
manifestation.isCoInsurance
manifestation.mainInsurerId
manifestation.rateInsurer
manifestation.coInsurerId
manifestation.hasExpert
manifestation.expertId
manifestation.averageClause
manifestation.averagePremiumClause
manifestation.contractualIndemnityLimit
manifestation.contractualIndemnityLimitRate
manifestation.averageFinancialCommitment
manifestation.subscriptionDeadLine
manifestation.inceptionDate
manifestation.eventCategory
manifestation.eventStartDate
manifestation.eventEndDate
manifestation.artist
manifestation.dateType
manifestation.numberOfInsuredDates
manifestation.isPersonUnavailability
manifestation.numberPersonInsured
manifestation.isTechnicianIndispensable
manifestation.numberTechnicianInsured
manifestation.isTechnicianInsuredNamed
manifestation.totalBudget
manifestation.hasUnavailabiliytExtension
manifestation.unavailabilityRate
manifestation.hasSpecialDispositionExtension
manifestation.specialDisposition
manifestation.isFeeDeducted
manifestation.artisteFee
manifestation.insuredBudget
manifestation.hasBadWeatherExtension
manifestation.badWeatherRate
manifestation.percentBudgetToBadWeather
manifestation.weatherBudget
manifestation.hasCrowShortageExtension
manifestation.franchise
manifestation.hasBombingExtension
manifestation.bombingRate
manifestation.bombingNumberOfDay
manifestation.bombingNumberOfKilometre
manifestation.bombingHasOptionThreat
manifestation.bombingHasOptionRecommendation
manifestation.hasMoralReasonExtension
manifestation.hasExpertFeeExtension
manifestation.expertWarrantyAmount
manifestation.expertFranchise
manifestation.BNSType
manifestation.applicableFranchise
manifestation.comprehensiveInsuranceRate
manifestation.BNS
manifestation.franchiseAmount
manifestation.exposedBudgetUnavailability
manifestation.exposedBudgetBadWeather
manifestation.exposedBudgetBombing
manifestation.excludingTaxRateUnavailability
manifestation.excludingTaxRateBadWeather
manifestation.excludingTaxRateBombing
manifestation.ovationCommission
manifestation.ovationBSNCommission
manifestation.taxRate
manifestation.createdAt
manifestation.updatedAt

Associations :
manifestation.getAccountManager()
manifestation.setAccountManager()
manifestation.createAccountManager()
manifestation.getBusinessProvider()
manifestation.setBusinessProvider()
manifestation.createBusinessProvider()
manifestation.getMainInsurer()
manifestation.setMainInsurer()
manifestation.createMainInsurer()
manifestation.getCoInsurer()
manifestation.setCoInsurer()
manifestation.createCoInsurer()
manifestation.getExpert()
manifestation.setExpert()
manifestation.createExpert()
manifestation.getPersonUnavailabilityList()
manifestation.setPersonUnavailabilityList()
manifestation.addPersonUnavailabilityList()
manifestation.addPersonUnavailabilityList()
manifestation.createPersonUnavailabilityList()
manifestation.removePersonUnavailabilityList()
manifestation.removePersonUnavailabilityList()
manifestation.hasPersonUnavailabilityList()
manifestation.hasPersonUnavailabilityList()
manifestation.countPersonUnavailabilityList()
manifestation.getTechnicianUnavailabilityList()
manifestation.setTechnicianUnavailabilityList()
manifestation.addTechnicianUnavailabilityList()
manifestation.addTechnicianUnavailabilityList()
manifestation.createTechnicianUnavailabilityList()
manifestation.removeTechnicianUnavailabilityList()
manifestation.removeTechnicianUnavailabilityList()
manifestation.hasTechnicianUnavailabilityList()
manifestation.hasTechnicianUnavailabilityList()
manifestation.countTechnicianUnavailabilityList()


----------------------------------
 manifestation_date
----------------------------------

Attributes :
manifestation_date.id
manifestation_date.manifestationId
manifestation_date.date
manifestation_date.country
manifestation_date.zipCode
manifestation_date.place
manifestation_date.scene
manifestation_date.damagesBasis
manifestation_date.amount
manifestation_date.createdAt
manifestation_date.updatedAt

Associations :


----------------------------------
 manifestation_person
----------------------------------

Attributes :
manifestation_person.id
manifestation_person.manifestationId
manifestation_person.band
manifestation_person.function
manifestation_person.replaceable
manifestation_person.age
manifestation_person.medicalExamination
manifestation_person.createdAt
manifestation_person.updatedAt

Associations :


----------------------------------
 manifestation_technician
----------------------------------

Attributes :
manifestation_technician.id
manifestation_technician.manifestationId
manifestation_technician.firstName
manifestation_technician.lastName
manifestation_technician.age
manifestation_technician.medicalExamination
manifestation_technician.createdAt
manifestation_technician.updatedAt

Associations :


----------------------------------
 person_info
----------------------------------

Attributes :
person_info.id
person_info.email
person_info.firstName
person_info.lastName
person_info.createdAt
person_info.updatedAt

Associations :


----------------------------------
 right
----------------------------------

Attributes :
right.id
right.label
right.nameFr
right.createdAt
right.updatedAt

Associations :
right.getRoles()
right.setRoles()
right.addRoles()
right.addRole()
right.createRole()
right.removeRole()
right.removeRoles()
right.hasRole()
right.hasRoles()
right.countRoles()


----------------------------------
 role
----------------------------------

Attributes :
role.id
role.label
role.nameFr
role.createdAt
role.updatedAt

Associations :
role.getRightList()
role.setRightList()
role.addRightList()
role.addRightList()
role.createRightList()
role.removeRightList()
role.removeRightList()
role.hasRightList()
role.hasRightList()
role.countRightList()


----------------------------------
 role_right
----------------------------------

Attributes :
role_right.id
role_right.rightId
role_right.roleId
role_right.createdAt
role_right.updatedAt

Associations :


----------------------------------
 user
----------------------------------

Attributes :
user.id
user.genre
user.isGroupOvatio
user.password
user.lastName
user.firstName
user.address
user.address2
user.zipCode
user.city
user.email
user.phone
user.mobilePhone
user.roleId
user.createdAt
user.updatedAt

Associations :
user.getRole()
user.setRole()
user.createRole()


----------------------------------
 Sequelize
----------------------------------
