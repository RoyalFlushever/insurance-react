'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return Promise.all(
            [
                queryInterface.createTable(
                    'users',
                    {
                        id: {
                            type: Sequelize.INTEGER,
                            primaryKey: true,
                            autoIncrement: true,
                        },
                        // column in init migration
                        genre: {
                            type: Sequelize.STRING,
                        },
                        // column in init migration
                        isGroupOvatio: {
                            type: Sequelize.BOOLEAN,
                        },
                        // column in init migration
                        password: {
                            type: Sequelize.STRING,
                        },
                        // column in init migration
                        lastName: {
                            type: Sequelize.STRING
                        },
                        // column in init migration
                        firstName: {
                            type: Sequelize.STRING
                        },
                        // column in init migration
                        address: {
                            type: Sequelize.STRING
                        },
                        // column in init migration
                        address2: {
                            type: Sequelize.STRING
                        },
                        // column in init migration
                        zipCode: {
                            type: Sequelize.STRING
                        },
                        // column in init migration
                        city: {
                            type: Sequelize.STRING
                        },
                        // column in init migration
                        email: {
                            type: Sequelize.STRING
                        },
                        // column in init migration
                        phone: {
                            type: Sequelize.STRING
                        },
                        // column in init migration
                        mobilePhone: {
                            type: Sequelize.STRING
                        },
                        // column in init migration
                        roleId: {
                            type: Sequelize.INTEGER
                        },
                        // column in init migration
                        createdAt: {
                            type: Sequelize.DATE,
                            defaultValue: new Date()
                        },
                        // column in init migration
                        updatedAt: {
                            type: Sequelize.DATE,
                            defaultValue: new Date()
                        }
                    },
                    {
                        charset: 'utf8',
                    }
                ),
                queryInterface.createTable(
                    'roles',
                    {
                        id: {
                            type: Sequelize.INTEGER,
                            primaryKey: true,
                            autoIncrement: true
                        },
                        label: {
                            type: Sequelize.STRING,
                            unique: true
                        },
                        nameFr: {
                            type: Sequelize.STRING
                        },
                        createdAt: {
                            type: Sequelize.DATE
                        },
                        updatedAt: {
                            type: Sequelize.DATE
                        }
                    },
                    {
                        charset: 'utf8',                    // default: null
                    }
                ),
                queryInterface.createTable(
                    'rights',
                    {
                        id: {
                            type: Sequelize.INTEGER,
                            primaryKey: true,
                            autoIncrement: true
                        },
                        label: {
                            type: Sequelize.STRING,
                            unique: true
                        },
                        nameFr: {
                            type: Sequelize.STRING,
                        },
                        createdAt: {
                            type: Sequelize.DATE
                        },
                        updatedAt: {
                            type: Sequelize.DATE
                        }
                    },
                    {
                        charset: 'utf8',                    // default: null
                    }
                ),
                queryInterface.createTable(
                    'role_rights',
                    {
                        id: {
                            type: Sequelize.INTEGER,
                            primaryKey: true,
                            autoIncrement: true
                        },
                        rightId: {
                            type: Sequelize.INTEGER,
                        },
                        roleId: {
                            type: Sequelize.INTEGER,
                        },
                        createdAt: {
                            type: Sequelize.DATE
                        },
                        updatedAt: {
                            type: Sequelize.DATE
                        }
                    },
                    {
                        charset: 'utf8',                    // default: null
                    }
                ),
                queryInterface.createTable(
                    'business_providers',
                    {
                        id: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        },
                        type: {
                            type: Sequelize.STRING,
                        },
                        businessName: {
                            type: Sequelize.STRING,
                        },
                        businessProviderLastName: {
                            type: Sequelize.STRING,
                        },
                        businessProviderFirstName: {
                            type: Sequelize.STRING,
                        },
                        companyId: {
                            type: Sequelize.STRING
                        },
                        status: {
                            type: Sequelize.STRING
                        },
                        commissionPercent: {
                            type: Sequelize.STRING
                        },
                        address: {
                            type: Sequelize.STRING
                        },
                        address2: {
                            type: Sequelize.STRING
                        },
                        zipCode: {
                            type: Sequelize.STRING
                        },
                        city: {
                            type: Sequelize.STRING
                        },
                        country: {
                            type: Sequelize.STRING
                        },
                        email: {
                            type: Sequelize.STRING
                        },
                        phone: {
                            type: Sequelize.STRING
                        },
                        createdAt: {
                            type: Sequelize.DATE
                        },
                        updatedAt: {
                            type: Sequelize.DATE
                        }
                    },
                    {
                        charset: 'utf8',                    // default: null
                    }
                ),
                queryInterface.createTable(
                    'business_providers',
                    {
                        id: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true
                        },
                        type: {
                            type: Sequelize.STRING,
                        },
                        businessName: {
                            type: Sequelize.STRING,
                        },
                        businessProviderLastName: {
                            type: Sequelize.STRING,
                        },
                        businessProviderFirstName: {
                            type: Sequelize.STRING,
                        },
                        companyId: {
                            type: Sequelize.STRING
                        },
                        status: {
                            type: Sequelize.STRING
                        },
                        commissionPercent: {
                            type: Sequelize.STRING
                        },
                        address: {
                            type: Sequelize.STRING
                        },
                        address2: {
                            type: Sequelize.STRING
                        },
                        zipCode: {
                            type: Sequelize.STRING
                        },
                        city: {
                            type: Sequelize.STRING
                        },
                        country: {
                            type: Sequelize.STRING
                        },
                        email: {
                            type: Sequelize.STRING
                        },
                        phone: {
                            type: Sequelize.STRING
                        },
                        createdAt: {
                            type: Sequelize.DATE
                        },
                        updatedAt: {
                            type: Sequelize.DATE
                        }
                    },
                    {
                        charset: 'utf8',                    // default: null
                    }
                ),
                queryInterface.createTable(
                    'manifestations',
                    {
                        id: {
                            type: Sequelize.INTEGER,
                            primaryKey: true,
                            autoIncrement: true
                        },
                        // column in init migration path
                        type: {
                            type: Sequelize.STRING,
                        },
                        // column in init migration path
                        eventName: {
                            type: Sequelize.STRING,
                        },
                        // column in init migration path
                        accountManagerId: {
                            type: Sequelize.STRING,
                        },
                        // column in init migration path
                        totalDeclaredBudget: {
                            type: Sequelize.STRING,
                        },
                        // column in init migration path
                        policyLanguage: {
                            type: Sequelize.STRING,
                        },
                        // column in init migration path
                        currency: {
                            type: Sequelize.STRING,
                        },
                        // column in init migration path
                        isBusinessProvider: {
                            type: Sequelize.BOOLEAN,
                        },
                        // column in init migration path
                        businessProviderId: {
                            type: Sequelize.STRING,
                        },
                        // column in init migration path
                        businessProviderFeesRate: {
                            type: Sequelize.STRING,
                        },
                        // column in init migration path
                        hasAdditionalInsuredParty: {
                            type: Sequelize.BOOLEAN,
                        },
                        // column in init migration path
                        additionalInsuredPartyName: {
                            type: Sequelize.STRING,
                        },
                        // column in init migration path
                        specialConditions: {
                            type: Sequelize.STRING,
                        },
                        // column in init migration path
                        endOfGuaranteeRule: {
                            type: Sequelize.STRING,
                        },
                        // column in init migration path
                        endOfGuaranteeRuleOnePercentDurationOfTheShow: {
                            type: Sequelize.STRING,
                        },
                        // column in init migration path
                        endOfGuaranteeRuleOneHasPlayed: {
                            type: Sequelize.STRING,
                        },
                        // column in init migration path
                        endOfGuaranteeRuleOneHasOption: {
                            type: Sequelize.STRING,
                        },
                        // column in init migration path
                        endOfGuaranteeRuleTwoActNumberIsOver: {
                            type: Sequelize.STRING,
                        },
                        // column in init migration path
                        endOfGuaranteeRuleThreeTimeIsOver: {
                            type: Sequelize.STRING,
                        },
                        // column in init migration path
                        endOfGuaranteeRuleFourCondition: {
                            type: Sequelize.STRING,
                        },
                        // column in init migration path
                        isCoInsurance: {
                            type: Sequelize.BOOLEAN,
                        },
                        // column in init migration path
                        mainInsurerId: {
                            type: Sequelize.STRING,
                        },
                        // column in init migration path
                        rateInsurer: {
                            type: Sequelize.STRING,
                        },
                        // column in init migration path
                        coInsurerId: {
                            type: Sequelize.STRING,
                        },
                        // column in init migration path
                        hasExpert: {
                            type: Sequelize.STRING,
                        },
                        // column in init migration path
                        expertId: {
                            type: Sequelize.STRING,
                        },
                        // column in init migration path
                        averageClause: {
                            type: Sequelize.BOOLEAN,
                        },
                        // column in init migration path
                        averagePremiumClause: {
                            type: Sequelize.BOOLEAN,
                        },
                        // column in init migration path
                        contractualIndemnityLimit: {
                            type: Sequelize.BOOLEAN,
                        },
                        // column in init migration path
                        contractualIndemnityLimitRate: {
                            type: Sequelize.FLOAT
                        },
                        // column in init migration path
                        averageFinancialCommitment: {
                            type: Sequelize.FLOAT
                        },
                        // column in init migration path
                        subscriptionDeadLine: {
                            type: Sequelize.DATE
                        },
                        // column in init migration path
                        inceptionDate: {
                            type: Sequelize.DATE
                        },
                        // column in init migration path
                        eventCategory: {
                            type: Sequelize.STRING
                        },
                        // column in init migration path
                        eventStartDate: {
                            type: Sequelize.DATE
                        },
                        // column in init migration path
                        eventEndDate: {
                            type: Sequelize.DATE
                        },
                        // column in init migration path
                        artist: {
                            type: Sequelize.STRING
                        },
                        // column in init migration path
                        dateType: {
                            type: Sequelize.STRING
                        },
                        // column in init migration path
                        numberOfInsuredDates: {
                            type: Sequelize.INTEGER
                        },
                        // INDISPONIBILITE
                        // column in init migration path
                        isPersonUnavailability: {
                            type: Sequelize.BOOLEAN
                        },
                        numberPersonInsured: {
                            type: Sequelize.BOOLEAN
                        },
                        numberTechnicianInsured: {
                            type: Sequelize.INTEGER
                        },
                        isTechnicianInsuredNamed: {
                            type: Sequelize.BOOLEAN
                        },
                        //Extension MODULE
                        totalBudget: {
                            type: Sequelize.FLOAT
                        },
                        unavailabilityRate: {
                            type: Sequelize.INTEGER
                        },
                        hasUnavailabiliytExtension: {
                            type: Sequelize.BOOLEAN
                        },
                        /*    comprehensiveInsuranceRate: {
                         type: Sequelize.INTEGER
                         },*/
                        hasSpecialDispositionExtension: {
                            type: Sequelize.BOOLEAN
                        },
                        specialDisposition: {
                            type: Sequelize.STRING
                        },
                        isFeeDeducted: {
                            type: Sequelize.INTEGER
                        },
                        artisteFee: {
                            type: Sequelize.FLOAT
                        },
                        insuredBudget: {
                            type: Sequelize.FLOAT
                        },
                        hasBadWeatherExtension: {
                            type: Sequelize.FLOAT
                        },
                        badWeatherRate: {
                            type: Sequelize.FLOAT
                        },
                        percentBudgetToBadWeather: {
                            type: Sequelize.FLOAT
                        },
                        weatherBudget: {
                            type: Sequelize.FLOAT
                        },
                        hasCrowShortageExtension: {
                            type: Sequelize.BOOLEAN
                        },
                        franchise: {
                            type: Sequelize.FLOAT
                        },
                        hasBombingExtension: {
                            type: Sequelize.BOOLEAN
                        },
                        bombingRate: {
                            type: Sequelize.FLOAT
                        },
                        bombingNumberOfDay: {
                            type: Sequelize.INTEGER
                        },
                        bombingNumberOfKilometre: {
                            type: Sequelize.INTEGER
                        },
                        bombingHasOptionThreat: {
                            type: Sequelize.BOOLEAN
                        },
                        bombingHasOptionRecommendation: {
                            type: Sequelize.BOOLEAN
                        },
                        hasMoralReasonExtension: {
                            type: Sequelize.BOOLEAN
                        },
                        hasExpertFeeExtension: {
                            type: Sequelize.BOOLEAN
                        },
                        expertWarrantyAmount : {
                            type: Sequelize.FLOAT
                        },
                        expertFranchise : {
                            type: Sequelize.FLOAT
                        },
                        // BUDGET
                        BNSType : {
                            type: Sequelize.STRING
                        },
                        applicableFranchise : {
                            type: Sequelize.STRING
                        },
                        comprehensiveInsuranceRate : {
                            type: Sequelize.FLOAT
                        },
                        BNS : {
                            type: Sequelize.FLOAT
                        },
                        franchiseAmount : {
                            type: Sequelize.FLOAT
                        },
                        exposedBudgetUnavailability : {
                            type: Sequelize.FLOAT
                        },
                        exposedBudgetBadWeather : {
                            type: Sequelize.FLOAT
                        },
                        exposedBudgetBombing : {
                            type: Sequelize.FLOAT
                        },
                        excludingTaxRateUnavailability : {
                            type: Sequelize.FLOAT
                        },
                        excludingTaxRateBadWeather : {
                            type: Sequelize.FLOAT
                        },
                        excludingTaxRateBombing : {
                            type: Sequelize.FLOAT
                        },
                        ovationCommission : {
                            type: Sequelize.FLOAT
                        },
                        ovationBSNCommission : {
                            type: Sequelize.FLOAT
                        },
                        taxRate : {
                            type: Sequelize.FLOAT
                        },
                        createdAt: {
                          type: Sequelize.DATE,
                            defaultValue: new Date(),
                          allowNull: true,
                        },
                        updatedAt: {
                          type: Sequelize.DATE,
                            defaultValue: new Date(),
                          allowNull: true,
                        },
                    },
                    {
                        charset: 'utf8',                    // default: null
                    }
                )
            ]).then(
            function () {
                //Foreign Key
                return Promise.all([
                    queryInterface.addConstraint('users', ['roleId'], {
                        name: 'userHasOneRole',
                        type: 'FOREIGN KEY',
                        references: { //Required field
                            table: 'roles',
                            field: 'id'
                        },
                        onDelete: 'cascade',
                        onUpdate: 'cascade'
                    }),
                    queryInterface.addConstraint('business_providers', ['id'], {
                        name: 'businessProviderIsUser',
                        type: 'FOREIGN KEY',
                        references: { //Required field
                            table: 'users',
                            field: 'id'
                        },
                        onDelete: 'cascade',
                        onUpdate: 'cascade'
                    }),
                    queryInterface.addConstraint('role_rights', ['rightId'], {
                        name: 'pivotRights',
                        type: 'FOREIGN KEY',
                        references: { //Required field
                            table: 'rights',
                            field: 'id'
                        },
                        onDelete: 'cascade',
                        onUpdate: 'cascade'
                    }),
                    queryInterface.addConstraint('role_rights', ['roleId'], {
                        name: 'pivotRoles',
                        type: 'FOREIGN KEY',
                        references: { //Required field
                            table: 'roles',
                            field: 'id'
                        },
                        onDelete: 'cascade',
                        onUpdate: 'cascade'
                    })


                ])
            }
        )
    },

    down: function (queryInterface, Sequelize) {
        return Promise.all(
            [
                queryInterface.removeConstraint('role_rights', 'pivotRoles'),
                queryInterface.removeConstraint('role_rights', 'pivotRights'),
                queryInterface.removeConstraint('users', 'userHasOneRole'),
                queryInterface.removeConstraint('business_providers', 'businessProviderIsUser')
            ]
        ).then(function() {
            return Promise.all([
                queryInterface.dropTable('business_providers'),
                queryInterface.dropTable('role_rights'),
                queryInterface.dropTable('roles'),
                queryInterface.dropTable('rights'),
                queryInterface.dropTable('person_infos'),
                queryInterface.dropTable('users')
            ]);
        });
    }
};
