import * as React from "react";
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import {translate, Interpolate, Trans} from 'react-i18next';
import i18n from '../../i18n';
import {Link, browserHistory} from 'react-router';
import {BusinessProviderService} from "../../services/businessProvider";
import {AssureurService} from "../../services/assureur";
import {ExpertService} from "../../services/expert";
import _cloneDeep from "lodash/cloneDeep";
import {UserService} from "../../services/user";

import ScheduleContainer from "../Schedule/ScheduleContainer";

export interface ManifestationEditProps {
    params: any;
}

type FormObject = {value: string, valid: boolean}
type DateObject = {
  value: string,
  formattedValue: string,
}
type DatesElement = {
  date: DateObject,
  country: string,
  zipCode: string,
  place: string,
  scene: string,
  damageBasis: number,
  amount: number
}
type ScheduleObject = {
  value: {
    category: string,
    eventDate: DateObject,
    eventEndDate: DateObject,
    artist: string,
    dateType: string,
    numberInsured: number,
    budget: number,
    dates: DatesElement[],
  },
  valid: boolean
}

@translate(['manifestation', 'countries'], {wait: true})
export class ManifestationEdit extends React.Component<ManifestationEditProps, any> {
    public state: any;
    public nameConstant: any;
    public businessProviderList: any;
    public assureurList: any;
    public expertList: any;
    public accountManager: any;

    constructor(props: ManifestationEditProps) {
        super(props);

        axios.defaults.baseURL = '/api/manifestations';

        this.state = {
            canSubmit: false,
            redirect: false,
            eventName: this.makeFormObject('', false),
            totalDeclaredBudget: this.makeFormObject('', true),
            type: this.makeFormObject('', true),
            accountManagerId: this.makeFormObject('', false),
            policyLanguage: this.makeFormObject('', true),
            currency: this.makeFormObject('', true),
            isBusinessProvider: this.makeFormObject('', true),
            businessProviderId: this.makeFormObject('', true),
            businessProviderFeesRate: this.makeFormObject('', true),
            hasAdditionalInsuredParty: this.makeFormObject('', true),
            additionalInsuredPartyName: this.makeFormObject('', true),
            specialConditions: this.makeFormObject('', true),
            endOfGuaranteeRule: this.makeFormObject('', true),
            endOfGuaranteeRuleOnePercentDurationOfTheShow: this.makeFormObject('', true),
            endOfGuaranteeRuleOneHasPlayed: this.makeFormObject('', true),
            endOfGuaranteeRuleOneHasOption: this.makeFormObject('', true),
            endOfGuaranteeRuleTwoActNumberIsOver: this.makeFormObject('', true),
            endOfGuaranteeRuleThreeTimeIsOver: this.makeFormObject('', true),
            endOfGuaranteeRuleFourCondition: this.makeFormObject('', true),
            isCoInsurance: this.makeFormObject('', true),
            mainInsurerId: this.makeFormObject('', true),
            rateInsurer: this.makeFormObject('', true),
            coInsurerId: this.makeFormObject('', true),
            hasExpert: this.makeFormObject('', true),
            expertId: this.makeFormObject('', true),
            averageClause: this.makeFormObject('', true),
            averagePremiumClause: this.makeFormObject('', true),
            contractualIndemnityLimit: this.makeFormObject('', true),
            contractualIndemnityLimitRate: this.makeFormObject('', true),
            averageFinancialCommitment: this.makeFormObject('', true),
            subscriptionDeadLine: this.makeFormObject('', true),
            hasUnavailabiliytExtension: this.makeFormObject('', true),
            unavailabilityRate: this.makeFormObject('', true),
            hasSpecialDispositionExtension: this.makeFormObject('', true),
            specialDisposition: this.makeFormObject('', true),
            isFeeDeducted: this.makeFormObject('', true),
            artisteFee: this.makeFormObject('', true),
            insuredBudget: this.makeFormObject('', true),
            hasBadWeatherExtension: this.makeFormObject('', true),
            badWeatherRate: this.makeFormObject('', true),
            percentBudgetToBadWeather: this.makeFormObject('', true),
            weatherBudget: this.makeFormObject('', true),
            hasCrowShortageExtension: this.makeFormObject('', true),
            franchise: this.makeFormObject('', true),
            hasBombingExtension: this.makeFormObject('', true),
            bombingRate: this.makeFormObject('', true),
            bombingNumberOfDay: this.makeFormObject('', true),
            bombingNumberOfKilometre: this.makeFormObject('', true),
            bombingHasOptionThreat: this.makeFormObject('', true),
            bombingHasOptionRecommendation: this.makeFormObject('', true),
            hasMoralReasonExtension: this.makeFormObject('', true),
            hasExpertFeeExtension: this.makeFormObject('', true),
            expertWarrantyAmount: this.makeFormObject('', true),
            expertFranchise: this.makeFormObject('', true),
            BNSType: this.makeFormObject('', true),
            applicableFranchise: this.makeFormObject('', true),
            comprehensiveInsuranceRate: this.makeFormObject('', true),
            BNS: this.makeFormObject('', true),
            franchiseAmount: this.makeFormObject('', true),
            notBNSContribution: this.makeFormObject('', true),
            BNSDisable: this.makeFormObject('', true),
            wholeContribution: this.makeFormObject('', true),
            scheduleData: this.makeScheduleObject({}, true),
            exposedBudgetUnavailability: this.makeFormObject('', true),
            exposedBudgetBadWeather: this.makeFormObject('', true),
            exposedBudgetBombing: this.makeFormObject('', true),
            excludingTaxRateUnavailability: this.makeFormObject('', true),
            excludingTaxRateBadWeather: this.makeFormObject('', true),
            excludingTaxRateBombing: this.makeFormObject('', true),
            ovationCommission: this.makeFormObject('', true),
            ovationBSNCommission: this.makeFormObject('', true),
            taxRate: this.makeFormObject('', true),
            isPersonUnavailability: this.makeFormObject('', true),
            numberPersonInsured: this.makeFormObject(0, true),
            isTechnicianIndispensable: this.makeFormObject('', true),
            numberTechnicianInsured: this.makeFormObject(0, true),
            isTechnicianInsuredNamed: this.makeFormObject('', true),
            personInsuredList: [],
            technicianList: []
        };
        this.businessProviderList = [];
        BusinessProviderService.find().then(
            resp => {
                this.businessProviderList = resp.data;
                this.setState({ key: Math.random() });

            }
        );
        this.accountManager = [];
        UserService.findAccountManger().then(
            resp => {
                this.accountManager = resp.data;
                this.setState({ key: Math.random() });
            }
        );
        this.assureurList = [];
        AssureurService.find().then(
            resp => {
                this.assureurList = resp.data;
                this.setState({ key: Math.random() });

            }
        );

        this.expertList = [];
        ExpertService.find().then(
            resp => {
                this.expertList = resp.data;
                this.setState({ key: Math.random() });

            }
        );


        this.handleEventName = this.handleEventName.bind(this);
        this.handleTotalDeclaredBudget = this.handleTotalDeclaredBudget.bind(this);
        this.handleType = this.handleType.bind(this);
        this.handleAccountManager = this.handleAccountManager.bind(this);
        this.handlePolicyLanguage = this.handlePolicyLanguage.bind(this);
        this.handleCurrency = this.handleCurrency.bind(this);
        this.handleIsBusinessProvider = this.handleIsBusinessProvider.bind(this);
        this.handleBusinessProvider = this.handleBusinessProvider.bind(this);
        this.handleBusinessProviderFeesRate = this.handleBusinessProviderFeesRate.bind(this);
        this.handleHasAdditionalInsuredParty = this.handleHasAdditionalInsuredParty.bind(this);
        this.handleAdditionalInsuredPartyName = this.handleAdditionalInsuredPartyName.bind(this);
        this.handleSpecialConditions = this.handleSpecialConditions.bind(this);
        this.handleEndOfGuaranteeRule = this.handleEndOfGuaranteeRule.bind(this);
        this.handleEndOfGuaranteeRuleOnePercentDurationOfTheShow = this.handleEndOfGuaranteeRuleOnePercentDurationOfTheShow.bind(this);
        this.handleEndOfGuaranteeRuleOneHasPlayed = this.handleEndOfGuaranteeRuleOneHasPlayed.bind(this);
        this.handleEndOfGuaranteeRuleOneHasOption = this.handleEndOfGuaranteeRuleOneHasOption.bind(this);
        this.handleEndOfGuaranteeRuleTwoActNumberIsOver = this.handleEndOfGuaranteeRuleTwoActNumberIsOver.bind(this);
        this.handleEndOfGuaranteeRuleThreeTimeIsOver = this.handleEndOfGuaranteeRuleThreeTimeIsOver.bind(this);
        this.handleEndOfGuaranteeRuleFourCondition = this.handleEndOfGuaranteeRuleFourCondition.bind(this);
        this.handleIsCoInsurance = this.handleIsCoInsurance.bind(this);
        this.handleMainInsurerIdr = this.handleMainInsurerIdr.bind(this);
        this.handleRateInsurer = this.handleRateInsurer.bind(this);
        this.handleCoInsurerId = this.handleCoInsurerId.bind(this);
        this.handleHasExpert = this.handleHasExpert.bind(this);
        this.handleExpertId = this.handleExpertId.bind(this);
        this.handleAverageClause = this.handleAverageClause.bind(this);
        this.handleAveragePremiumClause = this.handleAveragePremiumClause.bind(this);
        this.handleContractualIndemnityLimit = this.handleContractualIndemnityLimit.bind(this);
        this.handleContractualIndemnityLimitRate = this.handleContractualIndemnityLimitRate.bind(this);
        this.handleAverageFinancialCommitment = this.handleAverageFinancialCommitment.bind(this);
        this.handleSubscriptionDeadLine = this.handleSubscriptionDeadLine.bind(this);
        this.handleHasUnavailabiliytExtension = this.handleHasUnavailabiliytExtension.bind(this);
        this.handleUnavailabilityRate = this.handleUnavailabilityRate.bind(this);
        this.handleInsuredBudget = this.handleInsuredBudget.bind(this);
        this.handleHasSpecialDispositionExtension = this.handleHasSpecialDispositionExtension.bind(this);
        this.handleSpecialDisposition = this.handleSpecialDisposition.bind(this);
        this.handleIsFeeDeducted = this.handleIsFeeDeducted.bind(this);
        this.handleArtisteFee = this.handleArtisteFee.bind(this);
        this.handleHasBadWeatherExtension = this.handleHasBadWeatherExtension.bind(this);
        this.handleBadWeatherRate = this.handleBadWeatherRate.bind(this);
        this.handlePercentBudgetToBadWeather = this.handlePercentBudgetToBadWeather.bind(this);
        this.handleWeatherBudget = this.handleWeatherBudget.bind(this);
        this.handleHasCrowShortageExtension = this.handleHasCrowShortageExtension.bind(this);
        this.handleFranchise = this.handleFranchise.bind(this);
        this.handleHasBombingExtension = this.handleHasBombingExtension.bind(this);
        this.handleBombingRate = this.handleBombingRate.bind(this);
        this.handleBombingNumberOfDay = this.handleBombingNumberOfDay.bind(this);
        this.handleBombingNumberOfKilometre = this.handleBombingNumberOfKilometre.bind(this);
        this.handleBombingHasOptionThreat = this.handleBombingHasOptionThreat.bind(this);
        this.handleBombingHasOptionRecommendation = this.handleBombingHasOptionRecommendation.bind(this);
        this.handleHasMoralReasonExtension = this.handleHasMoralReasonExtension.bind(this);
        this.handleExpertWarrantyAmount = this.handleExpertWarrantyAmount.bind(this);
        this.handleExpertFranchise = this.handleExpertFranchise.bind(this);
        this.handleHasExpertFeeExtension = this.handleHasExpertFeeExtension.bind(this);
        this.handleBNSType = this.handleBNSType.bind(this);
        this.handleApplicableFranchise = this.handleApplicableFranchise.bind(this);
        this.handleComprehensiveInsuranceRate = this.handleComprehensiveInsuranceRate.bind(this);
        this.handleBNS = this.handleBNS.bind(this);
        this.handleFranchiseAmount = this.handleFranchiseAmount.bind(this);
        this.handleExposedBudgetUnavailability = this.handleExposedBudgetUnavailability.bind(this);
        this.handleExposedBudgetBadWeather = this.handleExposedBudgetBadWeather.bind(this);
        this.handleExposedBudgetBombing = this.handleExposedBudgetBombing.bind(this);
        this.handleExcludingTaxRateUnavailability = this.handleExcludingTaxRateUnavailability.bind(this);
        this.handleExcludingTaxRateBadWeather = this.handleExcludingTaxRateBadWeather.bind(this);
        this.handleExcludingTaxRateBombing = this.handleExcludingTaxRateBombing.bind(this);
        this.handleOvationCommission = this.handleOvationCommission.bind(this);
        this.handleOvationBSNCommission = this.handleOvationBSNCommission.bind(this);
        this.handleTaxRate = this.handleTaxRate.bind(this);
        this.handleIsPersonUnavailabilityr = this.handleIsPersonUnavailabilityr.bind(this);
        this.handleNumberPersonInsured = this.handleNumberPersonInsured.bind(this);

        this.handleUnavailabilityField = this.handleUnavailabilityField.bind(this);
        this.handleTechnicianUnavailabilityField = this.handleTechnicianUnavailabilityField.bind(this);
        this.handleNumberTechnicianInsured = this.handleNumberTechnicianInsured.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handleField = this.handleField.bind(this);


        this.checkForm = this.checkForm.bind(this);
        this.getEditDataIfEditMode = this.getEditDataIfEditMode.bind(this);
        this.save = this.save.bind(this);
    }


    componentDidMount() {
      this.getEditDataIfEditMode();
    }


    budgetRules(state) {

        var taxRate = state.taxRate.value || 0;

        var res: any = {};
        res.A1 = 0;
        res.A2 = parseFloat(state.exposedBudgetUnavailability.value) || 0;
        res.A3 = parseFloat(state.exposedBudgetBadWeather.value) || 0;
        res.A4 = parseFloat(state.exposedBudgetBombing.value) || 0;
        res.A5 = res.A1 + res.A2 + res.A3 + res.A4;

        res.B1 = 0;
        res.B2 = parseFloat(state.excludingTaxRateUnavailability.value) || 0;
        res.B3 = parseFloat(state.excludingTaxRateBadWeather.value) || 0;
        res.B4 = parseFloat(state.excludingTaxRateBombing.value) || 0;
        res.B5 = res.B1 + res.B2 + res.B3 + res.B4;

        res.D1 = res.A1 * res.B1 * (parseFloat(state.BNS.value) || 0);
        res.D2 = res.A2 * res.B2 * (parseFloat(state.BNS.value) || 0);
        res.D3 = res.A3 * res.B3 * (parseFloat(state.BNS.value) || 0);
        res.D4 = res.A4 * res.B4 * (parseFloat(state.BNS.value) || 0);
        res.D5 = res.D1 + res.D2 + res.D3 + res.D4;

        res.C1 = res.A1 - res.D1;
        res.C2 = res.A2 - res.D2;
        res.C3 = res.A3 - res.D3;
        res.C4 = res.A4 - res.D4;
        res.C5 = res.C1 + res.C2 + res.C3 + res.C4;

        res.E4 = state.ovationCommission.value || 0;

        res.F4 = state.ovationBSNCommission.value || 0;

        res.G1 = res.C1 * taxRate;
        res.G2 = res.C2 * taxRate;
        res.G3 = res.C3 * taxRate;
        res.G4 = res.C4 * taxRate;
        res.G5 = res.C5 * taxRate;

        res.H1 = res.D1 * taxRate;
        res.H2 = res.D2 * taxRate;
        res.H3 = res.D3 * taxRate;
        res.H4 = res.D4 * taxRate;
        res.H5 = res.D5 * taxRate;

        res.I1 = res.G1 + res.C1;
        res.I2 = res.G2 + res.C2;
        res.I3 = res.G3 + res.C3;
        res.I4 = res.G4 + res.C4;
        res.I5 = res.G5 + res.C5;

        res.J1 = res.H1 + res.D1;
        res.J2 = res.H2 + res.D2;
        res.J3 = res.H3 + res.D3;
        res.J4 = res.H4 + res.D4;
        res.J5 = res.H5 + res.D5;


        res.E5 = res.C5 * res.E4;

        res.F5 = res.D5 * res.F4;

        res.K5 = res.I5;

        res.L5 = res.K5 - res.E5;

        res.notBNSContribution = res.K5;

        res.BNS = res.J5;

        res.wholeContribution = res.notBNSContribution + (state.BNS.value || 0);

        return res;

    }


    getEditDataIfEditMode() {
        if (this.props.params.id) {
            console.log(this.props.params.id)
            axios.get('/' + this.props.params.id, {}).then(resp => {
                console.log(resp.data)
                let row = resp.data;
                this.setState({
                    eventName: this.makeFormObject(row.eventName, row.eventName ? true : false),
                    totalDeclaredBudget: this.makeFormObject(row.totalDeclaredBudget, true),
                    type: this.makeFormObject(row.type, true),
                    accountManagerId: this.makeFormObject(row.accountManagerId, row.accountManagerId ? true : false),
                    policyLanguage: this.makeFormObject(row.policyLanguage, true),
                    currency: this.makeFormObject(row.currency, true),
                    isBusinessProvider: this.makeFormObject(row.isBusinessProvider, true),
                    businessProviderId: this.makeFormObject(row.businessProviderId, true),
                    businessProviderFeesRate: this.makeFormObject(row.businessProviderFeesRate, true),
                    hasAdditionalInsuredParty: this.makeFormObject(row.hasAdditionalInsuredParty, true),
                    additionalInsuredPartyName: this.makeFormObject(row.additionalInsuredPartyName, true),
                    specialConditions: this.makeFormObject(row.specialConditions, true),
                    endOfGuaranteeRule: this.makeFormObject(row.endOfGuaranteeRule, true),
                    endOfGuaranteeRuleOnePercentDurationOfTheShow: this.makeFormObject(row.endOfGuaranteeRuleOnePercentDurationOfTheShow, true),
                    endOfGuaranteeRuleOneHasPlayed: this.makeFormObject(row.endOfGuaranteeRuleOneHasPlayed, true),
                    endOfGuaranteeRuleOneHasOption: this.makeFormObject(row.endOfGuaranteeRuleOneHasOption, true),
                    endOfGuaranteeRuleTwoActNumberIsOver: this.makeFormObject(row.endOfGuaranteeRuleTwoActNumberIsOver, true),
                    endOfGuaranteeRuleThreeTimeIsOver: this.makeFormObject(row.endOfGuaranteeRuleThreeTimeIsOver, true),
                    endOfGuaranteeRuleFourCondition: this.makeFormObject(row.endOfGuaranteeRuleFourCondition, true),
                    isCoInsurance: this.makeFormObject(row.isCoInsurance, true),
                    mainInsurerId: this.makeFormObject(row.mainInsurerId, true),
                    rateInsurer: this.makeFormObject(row.rateInsurer, true),
                    coInsurerId: this.makeFormObject(row.coInsurerId, true),
                    hasExpert: this.makeFormObject(row.hasExpert, true),
                    expertId: this.makeFormObject(row.expertId, true),
                    averageClause: this.makeFormObject(row.averageClause, true),
                    averagePremiumClause: this.makeFormObject(row.averagePremiumClause, true),
                    contractualIndemnityLimit: this.makeFormObject(row.contractualIndemnityLimit, true),
                    contractualIndemnityLimitRate: this.makeFormObject(row.contractualIndemnityLimitRate, true),
                    averageFinancialCommitment: this.makeFormObject(row.averageFinancialCommitment, true),
                    subscriptionDeadLine: this.makeFormObject(this.formatDate(row.subscriptionDeadLine), true),
                    hasUnavailabiliytExtension: this.makeFormObject(row.hasUnavailabiliytExtension, true),
                    unavailabilityRate: this.makeFormObject(row.unavailabilityRate, true),
                    hasSpecialDispositionExtension: this.makeFormObject(row.hasSpecialDispositionExtension, true),
                    specialDisposition: this.makeFormObject(row.specialDisposition, true),
                    isFeeDeducted: this.makeFormObject(row.isFeeDeducted, true),
                    artisteFee: this.makeFormObject(row.artisteFee, true),
                    insuredBudget: this.makeFormObject(row.insuredBudget, true),
                    hasBadWeatherExtension: this.makeFormObject(row.hasBadWeatherExtension, true),
                    badWeatherRate: this.makeFormObject(row.badWeatherRate, true),
                    percentBudgetToBadWeather: this.makeFormObject(row.percentBudgetToBadWeather, true),
                    weatherBudget: this.makeFormObject(row.weatherBudget, true),
                    hasCrowShortageExtension: this.makeFormObject(row.hasCrowShortageExtension, true),
                    franchise: this.makeFormObject(row.franchise, true),
                    hasBombingExtension: this.makeFormObject(row.hasBombingExtension, true),
                    bombingRate: this.makeFormObject(row.bombingRate, true),
                    bombingNumberOfDay: this.makeFormObject(row.bombingNumberOfDay, true),
                    bombingNumberOfKilometre: this.makeFormObject(row.bombingNumberOfKilometre, true),
                    bombingHasOptionThreat: this.makeFormObject(row.bombingHasOptionThreat, true),
                    bombingHasOptionRecommendation: this.makeFormObject(row.bombingHasOptionRecommendation, true),
                    hasMoralReasonExtension: this.makeFormObject(row.hasMoralReasonExtension, true),
                    hasExpertFeeExtension: this.makeFormObject(row.hasExpertFeeExtension, true),
                    expertWarrantyAmount: this.makeFormObject(row.expertWarrantyAmount, true),
                    expertFranchise: this.makeFormObject(row.expertFranchise, true),
                    BNSType: this.makeFormObject(row.BNSType, true),
                    applicableFranchise: this.makeFormObject(row.applicableFranchise, true),
                    comprehensiveInsuranceRate: this.makeFormObject(row.comprehensiveInsuranceRate, true),
                    BNS: this.makeFormObject(row.BNS, true),
                    franchiseAmount: this.makeFormObject(row.franchiseAmount, true),
                    notBNSContribution: this.makeFormObject(row.notBNSContribution, true),
                    BNSDisable: this.makeFormObject(row.BNSDisable, true),
                    wholeContribution: this.makeFormObject(row.wholeContribution, true),
                    //scheduleData: this.makeScheduleObject(JSON.parse(row.scheduleData), true)
                    scheduleData: {
                      value: {
                        category: row.category,
                        eventDate: { value: row.eventDate, formattedValue: null },
                        eventEndDate: { value: row.eventEndDate, formattedValue: null },
                        artist: row.artist,
                        dateType: row.dateType,
                        numberInsured: row.numberInsured,
                        budget: row.budget,
                        // dates: JSON.parse(row.manifestationDates),
                        dates: row.manifestationDates.map( e => {
                          return {
                            ...e,
                            date: { value: e.date, formattedValue: (new Date(Date.parse(e.date))).toLocaleDateString() },
                          };
                        }),
                        //dates: [],
                      },
                      valid: true,
                    },
                    exposedBudgetUnavailability: this.makeFormObject(row.exposedBudgetUnavailability, true),
                    exposedBudgetBadWeather: this.makeFormObject(row.exposedBudgetBadWeather, true),
                    exposedBudgetBombing: this.makeFormObject(row.exposedBudgetBombing, true),
                    excludingTaxRateUnavailability: this.makeFormObject(row.excludingTaxRateUnavailability, true),
                    excludingTaxRateBadWeather: this.makeFormObject(row.excludingTaxRateBadWeather, true),
                    excludingTaxRateBombing: this.makeFormObject(row.excludingTaxRateBombing, true),
                    ovationCommission: this.makeFormObject(row.ovationCommission, true),
                    ovationBSNCommission: this.makeFormObject(row.ovationBSNCommission, true),
                    taxRate: this.makeFormObject(row.taxRate, true),
                    isPersonUnavailability: this.makeFormObject(row.isPersonUnavailability, true),
                    numberPersonInsured: this.makeFormObject(row.numberPersonInsured, true),
                    isTechnicianIndispensable: this.makeFormObject(row.isTechnicianIndispensable, true),
                    numberTechnicianInsured: this.makeFormObject(row.numberTechnicianInsured, true),
                    isTechnicianInsuredNamed: this.makeFormObject(row.isTechnicianInsuredNamed, true),
                    personInsuredList: row.personUnavailabilityList,
                    technicianList: row.technicianUnavailabilityList
                // }, () => {console.log('State:', this.state)});

                })
            })
        }
    }

    makeFormObject(value: any, valid: boolean) {
        return {
            value: value === null ? '' : value,
            valid: valid
        }
    }

    makeScheduleObject(value: object, valid: boolean) {
        return {
            value: value === null ? {} : value,
            valid: valid
        }
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    ignoreStateElements = {
      canSubmit: true,
      redirect: true,
      personInsuredList: true,
      technicianList: true,
      key: true,
    }

    checkForm() {
      let errElem = '';
      const canSubmit = (-1 === Object.keys(this.state).findIndex(elem => {
        if ( !this.ignoreStateElements[elem] &&
          // elem !== 'canSubmit' &&
          // elem !== 'redirect' &&
          // elem !== 'personInsuredList' &&
          // elem !== 'technicianList' &&
          !this.state[elem].valid
        ) {
          errElem = elem;
          return true;
        }
      }));
      if (errElem) {
        console.error('Non valid element:', errElem, this.state[errElem]);
      }
      this.state.canSubmit = canSubmit;
    }

    handleScheduleUpdate = (data, valid) => {
      // this.setState((state) => {{ scheduleData: _cloneDeep(data) }});
      //console.log('handleScheduleUpdate: ', data, valid);
      this.setState({ scheduleData: { value: _cloneDeep(data), valid} });
    }

    handleEventName(event: any) {
        event.preventDefault();
        this.setState({
            eventName: this.makeFormObject(event.target.value, event.target.value ? true : false)
        })
    }

    handleTotalDeclaredBudget(event: any) {
        event.preventDefault();
        this.setState({
            totalDeclaredBudget: this.makeFormObject(event.target.value, true)
        })
    }

    handleType(event: any) {
        event.preventDefault();
        this.setState({
            type: this.makeFormObject(event.target.value, true)
        })
    }

    handleAccountManager(event: any) {
        event.preventDefault();
        this.setState({
            accountManagerId: this.makeFormObject(event.target.value, event.target.value ? true : false)
        })
    }

    handlePolicyLanguage(event: any) {
        event.preventDefault();
        this.setState({
            policyLanguage: this.makeFormObject(event.target.value, true)
        })
    }

    handleCurrency(event: any) {
        event.preventDefault();
        this.setState({
            currency: this.makeFormObject(event.target.value, true)
        })
    }

    handleBusinessProvider(event: any) {
        event.preventDefault();
        this.setState({
            businessProviderId: this.makeFormObject(event.target.value, true)
        })
    }

    handleIsBusinessProvider(event: any) {
        this.setState({
            isBusinessProvider: this.makeFormObject(event.target.checked, true)
        })
    }

    handleBusinessProviderFeesRate(event: any) {
        event.preventDefault();
        this.setState({
            businessProviderFeesRate: this.makeFormObject(event.target.value, true)
        })
    }

    handleHasAdditionalInsuredParty(event: any) {
        this.setState({
            hasAdditionalInsuredParty: this.makeFormObject(event.target.checked, true)
        })
    }

    handleAdditionalInsuredPartyName(event: any) {
        event.preventDefault();
        this.setState({
            additionalInsuredPartyName: this.makeFormObject(event.target.value, true)
        })
    }

    handleSpecialConditions(event: any) {
        event.preventDefault();
        this.setState({
            specialConditions: this.makeFormObject(event.target.value, true)
        })
    }

    handleEndOfGuaranteeRule(event: any) {
        event.preventDefault();
        this.setState({
            endOfGuaranteeRule: this.makeFormObject(event.target.value, true)
        })
    }

    handleEndOfGuaranteeRuleOnePercentDurationOfTheShow(event: any) {
        event.preventDefault();
        this.setState({
            endOfGuaranteeRuleOnePercentDurationOfTheShow: this.makeFormObject(event.target.value, true)
        })
    }

    handleEndOfGuaranteeRuleOneHasPlayed(event: any) {
        event.preventDefault();
        this.setState({
            endOfGuaranteeRuleOneHasPlayed: this.makeFormObject(event.target.value, true)
        })
    }

    handleEndOfGuaranteeRuleOneHasOption(event: any) {
        event.preventDefault();
        this.setState({
            endOfGuaranteeRuleOneHasOption: this.makeFormObject(event.target.value, true)
        })
    }

    handleEndOfGuaranteeRuleTwoActNumberIsOver(event: any) {
        event.preventDefault();
        this.setState({
            endOfGuaranteeRuleTwoActNumberIsOver: this.makeFormObject(event.target.value, true)
        })
    }

    handleEndOfGuaranteeRuleThreeTimeIsOver(event: any) {
        event.preventDefault();
        this.setState({
            endOfGuaranteeRuleThreeTimeIsOver: this.makeFormObject(event.target.value, true)
        })
    }

    handleEndOfGuaranteeRuleFourCondition(event: any) {
        event.preventDefault();
        this.setState({
            endOfGuaranteeRuleFourCondition: this.makeFormObject(event.target.value, true)
        })
    }

    handleIsCoInsurance(event: any) {
        this.setState({
            isCoInsurance: this.makeFormObject(event.target.checked, true)
        })
    }

    handleMainInsurerIdr(event: any) {
        this.setState({
            mainInsurerId: this.makeFormObject(event.target.value, true)
        })
    }

    handleRateInsurer(event: any) {
        event.preventDefault();
        this.setState({
            rateInsurer: this.makeFormObject(event.target.value, true)
        })
    }

    handleCoInsurerId(event: any) {
        event.preventDefault();
        this.setState({
            coInsurerId: this.makeFormObject(event.target.value, true)
        })
    }

    handleHasExpert(event: any) {
        this.setState({
            hasExpert: this.makeFormObject(event.target.checked, true)
        })
        if (event.target.checked && !this.state.expertId.value) {
            this.setState({
                expertId: this.makeFormObject(this.state.expertId.value, false)
            })
        }
    }

    handleExpertId(event: any) {
        this.setState({
            expertId: this.makeFormObject(event.target.value, true)
        })
    }

    handleAverageClause(event: any) {
        this.setState({
            averageClause: this.makeFormObject(event.target.checked, true)
        })
    }

    handleAveragePremiumClause(event: any) {
        this.setState({
            averagePremiumClause: this.makeFormObject(event.target.checked, true)
        })
    }

    handleContractualIndemnityLimit(event: any) {
        this.setState({
            contractualIndemnityLimit: this.makeFormObject(event.target.checked, true)
        })
    }

    handleContractualIndemnityLimitRate(event: any) {
        this.setState({
            contractualIndemnityLimitRate: this.makeFormObject(event.target.value, true)
        })
    }

    handleAverageFinancialCommitment(event: any) {
        event.preventDefault();
        this.setState({
            averageFinancialCommitment: this.makeFormObject(event.target.value, true)
        })
    }

    handleSubscriptionDeadLine(event: any) {
        event.preventDefault();
        this.setState({
            subscriptionDeadLine: this.makeFormObject(event.target.value, new Date(event.target.value) > new Date())
        })
    }

    handleHasUnavailabiliytExtension(event: any) {
        this.setState({
            hasUnavailabiliytExtension: this.makeFormObject(event.target.checked, true)
        })
    }

    handleUnavailabilityRate(event: any) {
        event.preventDefault();
        this.setState({
            unavailabilityRate: this.makeFormObject(event.target.value, true)
        })
    }

    handleHasSpecialDispositionExtension(event: any) {
        this.setState({
            hasSpecialDispositionExtension: this.makeFormObject(event.target.checked, true)
        })
    }

    handleInsuredBudget(event: any) {
        event.preventDefault();
        this.setState({
            insuredBudget: this.makeFormObject(event.target.value, true)
        })
    }

    handleSpecialDisposition(event: any) {
        event.preventDefault();
        this.setState({
            specialDisposition: this.makeFormObject(event.target.value, true)
        })
    }

    handleIsFeeDeducted(event: any) {
        this.setState({
            isFeeDeducted: this.makeFormObject(event.target.checked, true)
        })
    }

    handleArtisteFee(event: any) {
        this.setState({
            artisteFee: this.makeFormObject(event.target.checked, true)
        })
    }


    handleHasBadWeatherExtension(event: any) {
        this.setState({
            hasBadWeatherExtension: this.makeFormObject(event.target.checked, true)
        })
    }

    handleBadWeatherRate(event: any) {
        event.preventDefault();
        this.setState({
            badWeatherRate: this.makeFormObject(event.target.value, true)
        })
    }

    handlePercentBudgetToBadWeather(event: any) {
        event.preventDefault();
        this.setState({
            percentBudgetToBadWeather: this.makeFormObject(event.target.value, true)
        })
    }

    handleWeatherBudget(event: any) {
        event.preventDefault();
        this.setState({
            weatherBudget: this.makeFormObject(event.target.value, true)
        })
    }

    handleHasCrowShortageExtension(event: any) {
        this.setState({
            hasCrowShortageExtension: this.makeFormObject(event.target.checked, true)
        })
    }

    handleFranchise(event: any) {
        event.preventDefault();
        this.setState({
            franchise: this.makeFormObject(event.target.value, true)
        })
    }

    handleHasBombingExtension(event: any) {
        this.setState({
            hasBombingExtension: this.makeFormObject(event.target.checked, true)
        })
    }

    handleBombingRate(event: any) {
        event.preventDefault();
        this.setState({
            bombingRate: this.makeFormObject(event.target.value, true)
        })
    }

    handleBombingNumberOfDay(event: any) {
        event.preventDefault();
        this.setState({
            bombingNumberOfDay: this.makeFormObject(event.target.value, true)
        })
    }

    handleBombingNumberOfKilometre(event: any) {
        event.preventDefault();
        this.setState({
            bombingNumberOfKilometre: this.makeFormObject(event.target.value, true)
        })
    }

    handleBombingHasOptionThreat(event: any) {
        this.setState({
            bombingHasOptionThreat: this.makeFormObject(event.target.checked, true)
        })
    }

    handleBombingHasOptionRecommendation(event: any) {
        this.setState({
            bombingHasOptionRecommendation: this.makeFormObject(event.target.checked, true)
        })
    }

    handleHasMoralReasonExtension(event: any) {
        this.setState({
            hasMoralReasonExtension: this.makeFormObject(event.target.checked, true)
        })
    }

    handleHasExpertFeeExtension(event: any) {
        this.setState({
            hasExpertFeeExtension: this.makeFormObject(event.target.checked, true)
        })
    }

    handleExpertWarrantyAmount(event: any) {
        this.setState({
            expertWarrantyAmount: this.makeFormObject(event.target.value, true)
        })
    }

    handleExpertFranchise(event: any) {
        this.setState({
            expertFranchise: this.makeFormObject(event.target.value, true)
        })
    }

    handleBNSType(event: any) {
        this.setState({
            BNSType: this.makeFormObject(event.target.value, true)
        })
    }

    handleApplicableFranchise(event: any) {
        this.setState({
            applicableFranchise: this.makeFormObject(event.target.value, true)
        })
    }

    handleComprehensiveInsuranceRate(event: any) {
        this.setState({
            comprehensiveInsuranceRate: this.makeFormObject(event.target.value, event.target.value >= 0 && event.target.value <= 5)
        })
    }

    handleBNS(event: any) {
        this.setState({
            BNS: this.makeFormObject(event.target.value, true)
        })
    }

    handleFranchiseAmount(event: any) {
        this.setState({
            franchiseAmount: this.makeFormObject(event.target.value, true)
        })
    }

    handleExposedBudgetUnavailability(event: any) {
        this.setState({
            exposedBudgetUnavailability: this.makeFormObject(event.target.value, true)
        })
    }

    handleExposedBudgetBadWeather(event: any) {
        this.setState({
            exposedBudgetBadWeather: this.makeFormObject(event.target.value, true)
        })
    }

    handleExposedBudgetBombing(event: any) {
        this.setState({
            exposedBudgetBombing: this.makeFormObject(event.target.value, true)
        })
    }

    handleExcludingTaxRateUnavailability(event: any) {
        this.setState({
            excludingTaxRateUnavailability: this.makeFormObject(event.target.value, event.target.value >= 0 && event.target.value <= 5)
        })
    }

    handleExcludingTaxRateBadWeather(event: any) {
        this.setState({
            excludingTaxRateBadWeather: this.makeFormObject(event.target.value, event.target.value >= 0 && event.target.value <= 5)
        })
    }

    handleExcludingTaxRateBombing(event: any) {
        this.setState({
            excludingTaxRateBombing: this.makeFormObject(event.target.value, event.target.value >= 0 && event.target.value <= 5)
        })
    }

    handleOvationCommission(event: any) {
        this.setState({
            ovationCommission: this.makeFormObject(event.target.value, event.target.value >= 0 && event.target.value <= 100)
        })
    }

    handleOvationBSNCommission(event: any) {
        this.setState({
            ovationBSNCommission: this.makeFormObject(event.target.value, event.target.value >= 0 && event.target.value <= 100)
        })
    }

    handleTaxRate(event: any) {
        this.setState({
            taxRate: this.makeFormObject(event.target.value, event.target.value >= 0 && event.target.value <= 25)
        })
    }

    handleIsPersonUnavailabilityr(event: any) {
        this.setState({
            isPersonUnavailability: this.makeFormObject(event.target.value, true)
        })
    }

    handleCheckbox(event: any, field: string) {
        this.setState({
            [field]: this.makeFormObject(event.target.checked, true)
        })
    }

    handleField(event: any, field: string) {
        this.setState({
            [field]: this.makeFormObject(event.target.value, true)
        })
    }

    handleNumberPersonInsured(event: any) {
        while (event.target.value != this.state.personInsuredList.length) {
            if (event.target.value > this.state.personInsuredList.length) {
                this.state.personInsuredList.push({
                    band: '',
                    insuredPeople: '',
                    function: '',
                    replaceable: '',
                    age: '',
                    medicalExamination: '',
                })
            } else if (event.target.value < this.state.personInsuredList.length) {
                this.state.personInsuredList.pop();
            }
        }
        this.setState({
            numberPersonInsured: this.makeFormObject(event.target.value, true)
        })
    }

    handleNumberTechnicianInsured(event: any) {
        while (event.target.value != this.state.technicianList.length) {
            if (event.target.value > this.state.technicianList.length) {
                this.state.technicianList.push({
                    firstName: '',
                    lastName: '',
                    age: '',
                    medicalExamination: '',
                })
            } else if (event.target.value < this.state.technicianList.length) {
                this.state.technicianList.pop();
            }
        }
        this.setState({
            numberTechnicianInsured: this.makeFormObject(event.target.value, true)
        })
    }

    handleUnavailabilityField(event: any, field: string, index: number) {

        this.state.personInsuredList[index][field] = event.target.value;
        this.setState({
            personInsuredList: this.state.personInsuredList
        })
    }

    handleTechnicianUnavailabilityField(event: any, field: string, index: number) {

        this.state.technicianList[index][field] = event.target.value;
        this.setState({
            technicianList: this.state.technicianList
        })
    }

    save(event: any) {
        event.preventDefault();
        console.log(this.state);
        if (this.state.canSubmit) {
            let method = (this.props.params.id ? axios.put : axios.post)
            method('/' + (this.props.params.id ? this.props.params.id : ''), {
                eventName: this.state.eventName.value,
                totalDeclaredBudget: this.state.totalDeclaredBudget.value,
                type: this.state.type.value,
                accountManagerId: this.state.accountManagerId.value,
                policyLanguage: this.state.policyLanguage.value,
                currency: this.state.currency.value,
                businessProviderId: this.state.businessProviderId.value,
                isBusinessProvider: this.state.isBusinessProvider.value,
                businessProviderFeesRate: this.state.businessProviderFeesRate.value,
                hasAdditionalInsuredParty: this.state.hasAdditionalInsuredParty.value,
                additionalInsuredPartyName: this.state.additionalInsuredPartyName.value,
                specialConditions: this.state.specialConditions.value,
                endOfGuaranteeRule: this.state.endOfGuaranteeRule.value,
                endOfGuaranteeRuleOnePercentDurationOfTheShow: this.state.endOfGuaranteeRuleOnePercentDurationOfTheShow.value,
                endOfGuaranteeRuleOneHasPlayed: this.state.endOfGuaranteeRuleOneHasPlayed.value,
                endOfGuaranteeRuleOneHasOption: this.state.endOfGuaranteeRuleOneHasOption.value,
                endOfGuaranteeRuleTwoActNumberIsOver: this.state.endOfGuaranteeRuleTwoActNumberIsOver.value,
                endOfGuaranteeRuleThreeTimeIsOver: this.state.endOfGuaranteeRuleThreeTimeIsOver.value,
                endOfGuaranteeRuleFourCondition: this.state.endOfGuaranteeRuleFourCondition.value,
                isCoInsurance: this.state.isCoInsurance.value,
                mainInsurerId: this.state.mainInsurerId.value,
                coInsurerId: this.state.coInsurerId.value,
                hasExpert: this.state.hasExpert.value,
                expertId: this.state.expertId.value,
                averageClause: this.state.averageClause.value,
                averagePremiumClause: this.state.averagePremiumClause.value,
                contractualIndemnityLimit: this.state.contractualIndemnityLimit.value,
                contractualIndemnityLimitRate: this.state.contractualIndemnityLimitRate.value,
                averageFinancialCommitment: this.state.averageFinancialCommitment.value,
                subscriptionDeadLine: this.state.subscriptionDeadLine.value,
                hasUnavailabiliytExtension: this.state.hasUnavailabiliytExtension.value,
                unavailabilityRate: this.state.unavailabilityRate.value,
                hasSpecialDispositionExtension: this.state.hasSpecialDispositionExtension.value,
                specialDisposition: this.state.specialDisposition.value,
                isFeeDeducted: this.state.isFeeDeducted.value,
                artisteFee: this.state.artisteFee.value,
                insuredBudget: this.state.insuredBudget.value,
                hasBadWeatherExtension: this.state.hasBadWeatherExtension.value,
                badWeatherRate: this.state.badWeatherRate.value,
                percentBudgetToBadWeather: this.state.percentBudgetToBadWeather.value,
                weatherBudget: this.state.weatherBudget.value,
                hasCrowShortageExtension: this.state.hasCrowShortageExtension.value,
                franchise: this.state.franchise.value,
                hasBombingExtension: this.state.hasBombingExtension.value,
                bombingRate: this.state.bombingRate.value,
                bombingNumberOfDay: this.state.bombingNumberOfDay.value,
                bombingNumberOfKilometre: this.state.bombingNumberOfKilometre.value,
                bombingHasOptionThreat: this.state.bombingHasOptionThreat.value,
                bombingHasOptionRecommendation: this.state.bombingHasOptionRecommendation.value,
                hasMoralReasonExtension: this.state.hasMoralReasonExtension.value,
                hasExpertFeeExtension: this.state.hasExpertFeeExtension.value,
                expertWarrantyAmount: this.state.expertWarrantyAmount.value,
                expertFranchise: this.state.expertFranchise.value,
                BNSType: this.state.BNSType.value,
                category: this.state.scheduleData.value.category,
                eventDate: this.state.scheduleData.value.eventDate.value,
                eventEndDate: this.state.scheduleData.value.eventEndDate.value,
                artist: this.state.scheduleData.value.artist,
                dateType: this.state.scheduleData.value.dateType,
                numberInsured: this.state.scheduleData.value.numberInsured,
                budget: this.state.scheduleData.value.budget,
                manifestationDates: JSON.stringify(this.state.scheduleData.value.dates),
                applicableFranchise: this.state.applicableFranchise.value,
                comprehensiveInsuranceRate: this.state.comprehensiveInsuranceRate.value,
                BNS: this.state.BNS.value,
                franchiseAmount: this.state.franchiseAmount.value,
                exposedBudgetUnavailability: this.state.exposedBudgetUnavailability.value,
                exposedBudgetBadWeather: this.state.exposedBudgetBadWeather.value,
                exposedBudgetBombing: this.state.exposedBudgetBombing.value,
                excludingTaxRateUnavailability: this.state.excludingTaxRateUnavailability.value,
                excludingTaxRateBadWeather: this.state.excludingTaxRateBadWeather.value,
                excludingTaxRateBombing: this.state.excludingTaxRateBombing.value,
                ovationCommission: this.state.ovationCommission.value,
                ovationBSNCommission: this.state.ovationBSNCommission.value,
                taxRate: this.state.taxRate.value,
                isPersonUnavailability: this.state.isPersonUnavailability.value,
                numberPersonInsured: this.state.numberPersonInsured.value,
                isTechnicianIndispensable: this.state.isTechnicianIndispensable.value,
                numberTechnicianInsured: this.state.numberTechnicianInsured.value,
                isTechnicianInsuredNamed: this.state.isTechnicianInsuredNamed.value,
                personUnavailabilityList: this.state.personInsuredList,
                technicianUnavailabilityList: this.state.technicianList

            }).then(resp => {
                browserHistory.push('/manifestation')
            })
        }
    }


    render() {
        const {t} : any = this.props;


        const businessProviderListDOM = this.businessProviderList.map((businessProvider) =>
            <option key={businessProvider.id}
                    value={businessProvider.id}>{businessProvider.businessName}</option>
        );

        const accountMangerListDOM = this.accountManager.map((row) =>
            <option key={row.id}
                    value={row.id}>{row.firstName} {row.lastName }</option>
        );

        const assureurListDOM = this.assureurList.map((assureur) =>
            <option key={assureur.id} value={assureur.id}>{assureur.businessName}</option>
        );

        const expertListDOM = this.expertList.map((expert) =>
            <option key={expert.id} value={expert.id}>{expert.businessName}</option>
        );

        var budgetObject = this.budgetRules(this.state);
        //budgetObject.C5 < 368 ? this.state.BNSType.value = '' : false;


        var personInsuredListDOM = this.state.personInsuredList.map((item, index) => {
            return (
                <tr key={index}>
                    <td>
                        {index}
                    </td>
                    <td>
                        <input className="form-control" type="text"
                               onChange={(e) => this.handleUnavailabilityField(e, "band", index)}
                               value={item.band}/>
                    </td>

                    <td>
                        <input className="form-control" type="text"
                               onChange={(e) => this.handleUnavailabilityField(e, "insuredPeople", index)}
                               value={item.insuredPeople}/>
                    </td>
                    <td>
                        <input className="form-control" type="text"
                               onChange={(e) => this.handleUnavailabilityField(e, "function", index)}
                               value={item.function}/>
                       </td>
                    <td>
                        <select className="form-control"
                                value={item.replaceable}
                                onChange={(e) => this.handleUnavailabilityField(e, "replaceable", index)}>
                            <option value="">
                            </option>
                            <option value="NO">
                                {t('manifestation:no')}
                            </option>
                            <option value="YES">
                                {t('manifestation:yes')}
                            </option>
                        </select>
                    </td>
                    <td>
                        <input className="form-control"
                               type="number"
                               min="0"
                               max="5"
                               onChange={(e) => this.handleUnavailabilityField(e, "age", index)}
                               value={item.age}/>
                    </td>
                    <td>
                        <select className="form-control"
                                value={item.medicalExamination}
                                onChange={(e) => this.handleUnavailabilityField(e, "medicalExamination", index)}>
                            <option value="">
                            </option>
                            <option value="NO">
                                {t('manifestation:no')}
                            </option>
                            <option value="YES">
                                {t('manifestation:yes')}
                            </option>
                        </select>
                    </td>
                </tr>
            )

        })

        var technicianInsuredListDOM = this.state.technicianList.map((item, index) => {
            return (
                <tr key={index}>
                    <td>
                        {index}
                    </td>
                    <td>
                        <input className="form-control" type="text"
                               onChange={(e) => this.handleTechnicianUnavailabilityField(e, "firstName", index)}
                               value={item.firstName}/>
                    </td>
                    <td>
                        <input className="form-control" type="text"
                               onChange={(e) => this.handleTechnicianUnavailabilityField(e, "lastName", index)}
                               value={item.lastName}/>
                    </td>
                    <td>
                        <input className="form-control"
                               type="number"
                               min="0"
                               max="5"
                               onChange={(e) => this.handleTechnicianUnavailabilityField(e, "age", index)}
                               value={item.age}/>
                    </td>
                    <td>
                        <select className="form-control"
                                value={item.medicalExamination}
                                onChange={(e) => this.handleTechnicianUnavailabilityField(e, "medicalExamination", index)}>
                            <option value="">
                            </option>
                            <option value="NO">
                                {t('manifestation:no')}
                            </option>
                            <option value="YES">
                                {t('manifestation:yes')}
                            </option>
                        </select>
                    </td>
                </tr>
            )

        })

        this.checkForm()
        console.log('render;');
        return (
            <div className="content-w">
                <div className="content-panel-toggler">
                    <i className="os-icon os-icon-grid-squares-22"></i><span>Sidebar</span>
                </div>
                <div className="content-i">
                    <div className="content-box">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="element-wrapper">
                                    <h6 className="element-header">
                                        {
                                            (this.props.params.id ? t('manifestation:editManifestationTitle')
                                                : t('manifestation:createManifestationTitle'))
                                        }
                                    </h6>
                                    <div className="element-box">
                                        <form id="formValidate">
                                            <fieldset className="form-group">
                                                <legend><span>{t('manifestation:generalInformation')}</span>
                                                </legend>
                                            </fieldset>
                                            <div className="row">
                                                <div className="col-sm-10">
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <div
                                                                className={"form-group " + (this.state.eventName.valid ? "" : "has-error has-danger")}>
                                                                <label>{t('manifestation:eventName')}</label>
                                                                <input className="form-control" type="text"
                                                                       onChange={this.handleEventName}
                                                                       value={this.state.eventName.value}/>
                                                                {
                                                                    this.state.eventName.valid ? <div></div>
                                                                        :<div
                                                                        className={"help-block form-text " + (this.state.eventName.valid ? "" : "with-errors") + " form-control-feedback"}>
                                                                        <ul className="list-unstyled">
                                                                            <li>{t('manifestation:eventNameError')}</li>
                                                                        </ul>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <div
                                                                className={"form-group " + (this.state.totalDeclaredBudget.valid ? "" : "has-error has-danger")}>
                                                                <label>{t('manifestation:totalDeclaredBudget')}</label>
                                                                <input className="form-control" type="number"
                                                                       onChange={this.handleTotalDeclaredBudget}
                                                                       value={this.state.totalDeclaredBudget.value}/>
                                                                {
                                                                    this.state.totalDeclaredBudget.valid ? <div></div>
                                                                        :<div
                                                                        className={"help-block form-text " + (this.state.totalDeclaredBudget.valid ? "" : "with-errors") + " form-control-feedback"}>
                                                                        <ul className="list-unstyled">
                                                                            <li>{t('manifestation:totalDeclaredBudgetError')}</li>
                                                                        </ul>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <div
                                                                className={"form-group " + (this.state.type.valid ? "" : "has-error has-danger")}>
                                                                <label>{t('manifestation:type')}</label>
                                                                <input className="form-control" type="text"
                                                                       onChange={this.handleType}
                                                                       value={this.state.type.value}/>
                                                                {
                                                                    this.state.type.valid ? <div></div>
                                                                        :<div
                                                                        className={"help-block form-text " + (this.state.type.valid ? "" : "with-errors") + " form-control-feedback"}>
                                                                        <ul className="list-unstyled">
                                                                            <li>{t('manifestation:typeError')}</li>
                                                                        </ul>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-4">
                                                            <div
                                                                className={"form-group " + (this.state.accountManagerId.valid ? "" : "has-error has-danger")}>
                                                                <label>{t('manifestation:accountManagerId')}</label>
                                                                <select className="form-control"
                                                                        value={this.state.accountManagerId.value}
                                                                        onChange={this.handleAccountManager}>
                                                                    <option value="">
                                                                    </option>
                                                                    {accountMangerListDOM}
                                                                </select>
                                                                {
                                                                    this.state.accountManagerId.valid ? <div></div>
                                                                        :<div
                                                                        className={"help-block form-text " + (this.state.accountManagerId.valid ? "" : "with-errors") + " form-control-feedback"}>
                                                                        <ul className="list-unstyled">
                                                                            <li>{t('manifestation:accountManagerIdError')}</li>
                                                                        </ul>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <div className="form-group">
                                                                <label>{t('manifestation:policyLanguage')}</label>
                                                                <select className="form-control"
                                                                        value={this.state.policyLanguage.value}
                                                                        onChange={this.handlePolicyLanguage}>
                                                                    <option value="french">
                                                                        {t('manifestation:francais')}
                                                                    </option>
                                                                    <option value="english">
                                                                        {t('manifestation:anglais')}
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <div className="form-group">
                                                                <label>{t('manifestation:currency')}</label>
                                                                <select className="form-control"
                                                                        value={this.state.currency.value}
                                                                        onChange={this.handleCurrency}>
                                                                    <option value="">
                                                                    </option>
                                                                    <option value="euros">
                                                                        {t('manifestation:euros')}
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-4">
                                                            <div className="form-check"><label
                                                                className="form-check-label">
                                                                <input value={this.state.isBusinessProvider.value}
                                                                       checked={this.state.isBusinessProvider.value}
                                                                       onChange={this.handleIsBusinessProvider}
                                                                       className="form-check-input"
                                                                       type="checkbox"/>
                                                                {t('manifestation:businessProvider')}</label>
                                                            </div>
                                                        </div>
                                                        {
                                                            this.state.isBusinessProvider.value ?
                                                                <div className="col-sm-4">
                                                                    <div className="form-group">
                                                                        <label>{t('manifestation:businessProviderId')}</label>
                                                                        <select className="form-control"
                                                                                value={this.state.businessProviderId.value}
                                                                                onChange={this.handleBusinessProvider}>
                                                                            <option value="">
                                                                            </option>
                                                                            {businessProviderListDOM}

                                                                        </select>
                                                                    </div>
                                                                </div> : <div></div>
                                                        }
                                                        {
                                                            this.state.isBusinessProvider.value ?
                                                                <div className="col-sm-4">
                                                                    <div className="form-group">
                                                                        <label>{t('manifestation:businessProviderFeesRate')}</label>
                                                                        <select className="form-control"
                                                                                value={this.state.businessProviderFeesRate.value}
                                                                                onChange={this.handleBusinessProviderFeesRate}>
                                                                            <option value="null">
                                                                            </option>
                                                                            <option value="30">
                                                                                30%
                                                                            </option>
                                                                            <option value="50">
                                                                                50%
                                                                            </option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                :
                                                                <div></div>
                                                        }

                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-4">
                                                            <div className="form-check"><label
                                                                className="form-check-label">
                                                                <input
                                                                    value={this.state.hasAdditionalInsuredParty.value}
                                                                    onChange={this.handleHasAdditionalInsuredParty}
                                                                    checked={this.state.hasAdditionalInsuredParty.value}
                                                                    className="form-check-input"
                                                                    type="checkbox"/>
                                                                {t('manifestation:hasAdditionalInsuredParty')}</label>
                                                            </div>
                                                        </div>
                                                        {
                                                            this.state.hasAdditionalInsuredParty.value ?
                                                                <div className="col-sm-6">
                                                                    <div
                                                                        className={"form-group " + (this.state.additionalInsuredPartyName.valid ? "" : "has-error has-danger")}>
                                                                        <label>{t('manifestation:additionalInsuredPartyName')}</label>
                                                                        <input className="form-control" type="text"
                                                                               onChange={this.handleAdditionalInsuredPartyName}
                                                                               value={this.state.additionalInsuredPartyName.value}/>
                                                                        {
                                                                            this.state.additionalInsuredPartyName.valid ?
                                                                                <div></div>
                                                                                :<div
                                                                                className={"help-block form-text " + (this.state.additionalInsuredPartyName.valid ? "" : "with-errors") + " form-control-feedback"}>
                                                                                <ul className="list-unstyled">
                                                                                    <li>{t('manifestation:additionalInsuredPartyNameError')}</li>
                                                                                </ul>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                                : <div></div>
                                                        }

                                                    </div>
                                                    <fieldset className="form-group">
                                                        <div className="form-group">
                                                            <label>{t('manifestation:specialConditions')}</label>
                                                            <textarea className="form-control"
                                                                      value={this.state.specialConditions.value}
                                                                      onChange={this.handleSpecialConditions}></textarea>
                                                        </div>
                                                    </fieldset>
                                                    <div className="row">
                                                        <div className="col-sm-4">
                                                            <div className="form-group">
                                                                <label>{t('manifestation:endOfGuaranteeRule')}</label>
                                                                <select className="form-control"
                                                                        value={this.state.endOfGuaranteeRule.value}
                                                                        onChange={this.handleEndOfGuaranteeRule}>
                                                                    <option value="null">
                                                                    </option>
                                                                    <option value="endOfGuaranteeProgramme">
                                                                        {t('manifestation:endOfGuaranteeProgramme')}
                                                                    </option>
                                                                    <option value="endOfGuaranteActe">
                                                                        {t('manifestation:endOfGuaranteActe')}
                                                                    </option>
                                                                    <option value="endOfGuaranteeDate">
                                                                        {t('manifestation:endOfGuaranteeDate')}
                                                                    </option>
                                                                    <option value="endOfGuaranteeOther">
                                                                        {t('manifestation:endOfGuaranteeOther')}
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {
                                                        this.state.endOfGuaranteeRule.value == 'endOfGuaranteeProgramme' ?
                                                            <div className="row">
                                                                <div className="col-sm-4">
                                                                    <div className="form-group">
                                                                        <label>{t('manifestation:endOfGuaranteeRuleOnePercentDurationOfTheShow')}</label>
                                                                        <select className="form-control"
                                                                                value={this.state.endOfGuaranteeRuleOnePercentDurationOfTheShow.value}
                                                                                onChange={this.handleEndOfGuaranteeRuleOnePercentDurationOfTheShow}>
                                                                            <option value="null%">
                                                                            </option>
                                                                            <option value="50%">
                                                                                50%
                                                                            </option>
                                                                            <option value="60%">
                                                                                60%
                                                                            </option>
                                                                            <option value="75%">
                                                                                75%
                                                                            </option>
                                                                            <option value="100%">
                                                                                100%
                                                                            </option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <div className="form-group">
                                                                        <label>{t('manifestation:isOver')}</label>
                                                                        <select className="form-control"
                                                                                value={this.state.endOfGuaranteeRuleOneHasPlayed.value}
                                                                                onChange={this.handleEndOfGuaranteeRuleOneHasPlayed}>
                                                                            <option value="null">

                                                                            </option>
                                                                            <option value="global">
                                                                                {t('manifestation:global')}
                                                                            </option>
                                                                            <option value="headlining">
                                                                                {t('manifestation:headlining')}
                                                                            </option>
                                                                            <option value="false">
                                                                                {t('manifestation:lastHeadlining')}
                                                                            </option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <div className="form-group">
                                                                        <label>{t('manifestation:option')}</label>
                                                                        <select className="form-control"
                                                                                value={this.state.endOfGuaranteeRuleOneHasOption.value}
                                                                                onChange={this.handleEndOfGuaranteeRuleOneHasOption}>
                                                                            <option value="null">
                                                                            </option>
                                                                            <option value="na">
                                                                                {t('manifestation:na')}
                                                                            </option>
                                                                            <option value="andHeadlining">
                                                                                {t('manifestation:andHeadlining')}
                                                                            </option>
                                                                            <option value="orHeadlining">
                                                                                {t('manifestation:orHeadlining')}
                                                                            </option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div> : <div></div>

                                                    }
                                                    {
                                                        this.state.endOfGuaranteeRule.value == 'endOfGuaranteActe' ?
                                                            <div className="row">
                                                                <div className="col-sm-4">
                                                                    <div className="form-group">
                                                                        <label>{t('manifestation:endOfGuaranteeRuleTwoActNumberIsOver')}</label>
                                                                        <select className="form-control"
                                                                                value={this.state.endOfGuaranteeRuleTwoActNumberIsOver.value}
                                                                                onChange={this.handleEndOfGuaranteeRuleTwoActNumberIsOver}>
                                                                            <option value="null">
                                                                            </option>
                                                                            <option value="first">
                                                                                {t('manifestation:first')}
                                                                            </option>
                                                                            <option value="second">
                                                                                {t('manifestation:second')}
                                                                            </option>
                                                                            <option value="third">
                                                                                {t('manifestation:third')}
                                                                            </option>
                                                                            <option value="beforeLast">
                                                                                {t('manifestation:beforeLast')}
                                                                            </option>
                                                                            <option value="last">
                                                                                {t('manifestation:last')}
                                                                            </option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div> : <div></div>
                                                    }
                                                    {
                                                        this.state.endOfGuaranteeRule.value == 'endOfGuaranteeDate' ?
                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    <div
                                                                        className={"form-group " + (this.state.endOfGuaranteeRuleThreeTimeIsOver.valid ? "" : "has-error has-danger")}>
                                                                        <label>{t('manifestation:endOfGuaranteeRuleThreeTimeIsOver')}</label>
                                                                        <input className="form-control" type="text"
                                                                               onChange={this.handleEndOfGuaranteeRuleThreeTimeIsOver}
                                                                               value={this.state.endOfGuaranteeRuleThreeTimeIsOver.value}/>
                                                                        {
                                                                            this.state.endOfGuaranteeRuleThreeTimeIsOver.valid ?
                                                                                <div></div>
                                                                                :<div
                                                                                className={"help-block form-text " + (this.state.endOfGuaranteeRuleThreeTimeIsOver.valid ? "" : "with-errors") + " form-control-feedback"}>
                                                                                <ul className="list-unstyled">
                                                                                    <li>{t('manifestation:endOfGuaranteeRuleThreeTimeIsOver')}</li>
                                                                                </ul>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div> : <div></div>
                                                    }
                                                    {
                                                        this.state.endOfGuaranteeRule.value == 'endOfGuaranteeOther' ?
                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    <div
                                                                        className={"form-group " + (this.state.endOfGuaranteeRuleFourCondition.valid ? "" : "has-error has-danger")}>
                                                                        <label>{t('manifestation:endOfGuaranteeRuleFourCondition')}</label>
                                                                        <input className="form-control" type="text"
                                                                               onChange={this.handleEndOfGuaranteeRuleFourCondition}
                                                                               value={this.state.endOfGuaranteeRuleFourCondition.value}/>
                                                                        {
                                                                            this.state.endOfGuaranteeRuleFourCondition.valid ?
                                                                                <div></div>
                                                                                :<div
                                                                                className={"help-block form-text " + (this.state.endOfGuaranteeRuleFourCondition.valid ? "" : "with-errors") + " form-control-feedback"}>
                                                                                <ul className="list-unstyled">
                                                                                    <li>{t('manifestation:endOfGuaranteeRuleThreeTimeIsOver')}</li>
                                                                                </ul>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div> : <div></div>
                                                    }

                                                    <div className="row">
                                                        <div className="col-sm-4">
                                                            <div className="form-check"><label
                                                                className="form-check-label">
                                                                <input value={this.state.isCoInsurance.value}
                                                                       checked={this.state.isCoInsurance.value}
                                                                       onChange={this.handleIsCoInsurance}
                                                                       className="form-check-input"
                                                                       type="checkbox"/>
                                                                {t('manifestation:isCoInsurance')}</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <div className="form-group">
                                                                <label>{t('manifestation:mainInsurerId')}</label>
                                                                <select className="form-control"
                                                                        value={this.state.mainInsurerId.value}
                                                                        onChange={this.handleMainInsurerIdr}>
                                                                    <option value="">
                                                                    </option>
                                                                    {assureurListDOM}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        {
                                                            this.state.isCoInsurance.value ?
                                                                <div className="col-sm-4">
                                                                    <div>
                                                                        <label>{t('manifestation:rateInsurer')}</label>
                                                                        <input className="form-control" type="number"
                                                                               min="0"
                                                                               max="100"
                                                                               onChange={this.handleRateInsurer}
                                                                               value={this.state.rateInsurer.value}/>
                                                                    </div>
                                                                </div> : <div></div>
                                                        }

                                                    </div>
                                                    {
                                                        this.state.isCoInsurance.value ?
                                                            <div className="row">
                                                                <div className="col-sm-4">
                                                                    <div className="form-group">
                                                                        <label>{t('manifestation:coInsurerId')}</label>
                                                                        <select className="form-control"
                                                                                value={this.state.coInsurerId.value}
                                                                                onChange={this.handleCoInsurerId}>
                                                                            <option value="">
                                                                            </option>
                                                                            {assureurListDOM}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>: <div></div>
                                                    }

                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <div className="form-check"><label
                                                                className="form-check-label">
                                                                <input value={this.state.hasExpert.value}
                                                                       onChange={this.handleHasExpert}
                                                                       checked={this.state.hasExpert.value}
                                                                       className="form-check-input"
                                                                       type="checkbox"/>
                                                                {t('manifestation:hasExpert')}</label>
                                                            </div>
                                                        </div>
                                                        {
                                                            this.state.hasExpert.value ?
                                                                <div className="col-sm-6">
                                                                    <div
                                                                        className={"form-group " + (this.state.expertId.valid ? "" : "has-error has-danger")}>
                                                                        <label>{t('manifestation:expertId')}</label>
                                                                        <select className="form-control"
                                                                                value={this.state.expertId.value}
                                                                                onChange={this.handleExpertId}>
                                                                            <option value="">
                                                                            </option>
                                                                            { expertListDOM}
                                                                        </select>
                                                                        {
                                                                            this.state.expertId.valid ?
                                                                                <div></div>
                                                                                :<div
                                                                                className={"help-block form-text " + (this.state.expertId.valid ? "" : "with-errors") + " form-control-feedback"}>
                                                                                <ul className="list-unstyled">
                                                                                    <li>{t('manifestation:expertIdError')}</li>
                                                                                </ul>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </div> : <div></div>

                                                        }

                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <div className="form-check"><label
                                                                className="form-check-label">
                                                                <input value={this.state.averageClause.value}
                                                                       checked={this.state.averageClause.value}
                                                                       onChange={this.handleAverageClause}
                                                                       className="form-check-input"
                                                                       type="checkbox"/>
                                                                {t('manifestation:averageClause')}</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <div className="form-check"><label
                                                                className="form-check-label">
                                                                <input value={this.state.averagePremiumClause.value}
                                                                       checked={this.state.averagePremiumClause.value}
                                                                       onChange={this.handleAveragePremiumClause}
                                                                       className="form-check-input"
                                                                       type="checkbox"/>
                                                                {t('manifestation:averagePremiumClause')}</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-4">
                                                            <div className="form-check"><label
                                                                className="form-check-label">
                                                                <input
                                                                    value={this.state.contractualIndemnityLimit.value}
                                                                    onChange={this.handleContractualIndemnityLimit}
                                                                    checked={this.state.contractualIndemnityLimit.value}
                                                                    className="form-check-input"
                                                                    type="checkbox"/>
                                                                {t('manifestation:contractualIndemnityLimit')}</label>
                                                            </div>
                                                        </div>
                                                        {
                                                            this.state.contractualIndemnityLimit.value ?
                                                                <div className="col-sm-4">
                                                                    <div>
                                                                        <label>{t('manifestation:contractualIndemnityLimitRate')}</label>
                                                                        <input className="form-control" type="number"
                                                                               min="0"
                                                                               max="100"
                                                                               onChange={this.handleContractualIndemnityLimitRate}
                                                                               value={this.state.contractualIndemnityLimitRate.value}/>
                                                                    </div>
                                                                </div> : <div></div>
                                                        }
                                                        {
                                                            this.state.contractualIndemnityLimit.value ?
                                                                <div className="col-sm-4">
                                                                    <div>
                                                                        <label>{t('manifestation:averageFinancialCommitment')}</label>
                                                                        <input className="form-control" type="number"
                                                                               min="0"
                                                                               max="100"
                                                                               onChange={this.handleAverageFinancialCommitment}
                                                                               value={this.state.averageFinancialCommitment.value}/>
                                                                    </div>
                                                                </div> : <div></div>
                                                        }


                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-4">
                                                            <div>
                                                                <label>{t('manifestation:subscriptionDeadLine')}</label>
                                                                <input className="form-control" type="date"
                                                                       onChange={this.handleSubscriptionDeadLine}
                                                                       value={this.state.subscriptionDeadLine.value}/>
                                                                {
                                                                    this.state.subscriptionDeadLine.valid ?
                                                                        <div></div>
                                                                        :<div
                                                                        className={"help-block form-text " + (this.state.subscriptionDeadLine.valid ? "" : "with-errors") + " form-control-feedback"}>
                                                                        <ul className="list-unstyled">
                                                                            <li>{t('manifestation:subscriptionDeadLineError')}</li>
                                                                        </ul>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <fieldset className="form-group">
                                                <legend><span>{t('manifestation:extention')}</span>
                                                </legend>
                                            </fieldset>
                                            <div className="row">
                                                <div className="col-sm-10">
                                                    <div className="row">
                                                        <div className="col-sm-4">
                                                            <div className="form-check"><label
                                                                className="form-check-label">
                                                                <input
                                                                    value={this.state.hasUnavailabiliytExtension.value}
                                                                    checked={this.state.hasUnavailabiliytExtension.value}
                                                                    onChange={this.handleHasUnavailabiliytExtension}
                                                                    className="form-check-input"
                                                                    type="checkbox"/>
                                                                {t('manifestation:hasUnavailabiliytExtension')}</label>
                                                            </div>
                                                        </div>

                                                        {
                                                            this.state.hasUnavailabiliytExtension.value ?
                                                                <div className="col-sm-4">
                                                                    <div>
                                                                        <label>{t('manifestation:unavailabilityRate')}</label>
                                                                        <input className="form-control"
                                                                               type="number"
                                                                               min="0"
                                                                               max="100"
                                                                               onChange={this.handleUnavailabilityRate}
                                                                               value={this.state.unavailabilityRate.value}/>
                                                                    </div>
                                                                </div> : <div></div>
                                                        }
                                                        {
                                                            this.state.hasUnavailabiliytExtension.value ?
                                                                <div className="col-sm-4">
                                                                    <div>
                                                                        <label>{t('manifestation:insuredBudget')}</label>
                                                                        <input className="form-control"
                                                                               type="number"
                                                                               min="0"
                                                                               max="100"
                                                                               onChange={this.handleInsuredBudget}
                                                                               value={this.state.insuredBudget.value}/>
                                                                    </div>
                                                                </div> : <div></div>
                                                        }
                                                    </div>
                                                    {
                                                        this.state.hasUnavailabiliytExtension.value ?
                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    <div className="form-check"><label
                                                                        className="form-check-label">
                                                                        <input value={this.state.isFeeDeducted.value}
                                                                               checked={this.state.isFeeDeducted.value}
                                                                               onChange={this.handleIsFeeDeducted}
                                                                               className="form-check-input"
                                                                               type="checkbox"/>
                                                                        {t('manifestation:isFeeDeducted')}</label>
                                                                    </div>
                                                                </div>

                                                                {
                                                                    this.state.isFeeDeducted.value ?
                                                                        <div className="col-sm-6">
                                                                            <div>
                                                                                <label>{t('manifestation:artisteFee')}</label>
                                                                                <input className="form-control"
                                                                                       type="number"
                                                                                       min="0"
                                                                                       max="100"
                                                                                       onChange={this.handleArtisteFee}
                                                                                       value={this.state.artisteFee.value}/>
                                                                            </div>
                                                                        </div> : <div></div>
                                                                }
                                                            </div> : <div></div>
                                                    }
                                                    {
                                                        this.state.hasUnavailabiliytExtension.value ?
                                                            <div className="row">
                                                                <div className="col-sm-4">
                                                                    <div className="form-check"><label
                                                                        className="form-check-label">
                                                                        <input
                                                                            value={this.state.hasSpecialDispositionExtension.value}
                                                                            checked={this.state.hasSpecialDispositionExtension.value}
                                                                            onChange={this.handleHasSpecialDispositionExtension}
                                                                            className="form-check-input"
                                                                            type="checkbox"/>
                                                                        {t('manifestation:hasSpecialDispositionExtension')}
                                                                    </label>
                                                                    </div>
                                                                </div>

                                                                {
                                                                    this.state.hasSpecialDispositionExtension.value ?
                                                                        <div className="col-sm-8">
                                                                            <div>
                                                                                <label>{t('manifestation:specialDisposition')}</label>
                                                                                <input className="form-control"
                                                                                       type="text"
                                                                                       onChange={this.handleSpecialDisposition}
                                                                                       value={this.state.specialDisposition.value}/>
                                                                            </div>
                                                                        </div> : <div></div>
                                                                }
                                                            </div> : <div></div>
                                                    }
                                                    <div className="row">
                                                        <div className="col-sm-4">
                                                            <div className="form-check"><label
                                                                className="form-check-label">
                                                                <input
                                                                    value={this.state.hasBadWeatherExtension.value}
                                                                    checked={this.state.hasBadWeatherExtension.value}
                                                                    onChange={this.handleHasBadWeatherExtension}
                                                                    className="form-check-input"
                                                                    type="checkbox"/>
                                                                {t('manifestation:hasBadWeatherExtension')}</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {
                                                        this.state.hasBadWeatherExtension.value ?
                                                            <div className="row">
                                                                <div className="col-sm-4">
                                                                    <div>
                                                                        <label>{t('manifestation:badWeatherRate')}</label>
                                                                        <input className="form-control"
                                                                               type="number"
                                                                               min="0"
                                                                               max="100"
                                                                               onChange={this.handleBadWeatherRate}
                                                                               value={this.state.badWeatherRate.value}/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <div>
                                                                        <label>{t('manifestation:percentBudgetToBadWeather')}</label>
                                                                        <input className="form-control"
                                                                               type="number"
                                                                               min="0"
                                                                               max="100"
                                                                               onChange={this.handlePercentBudgetToBadWeather}
                                                                               value={this.state.percentBudgetToBadWeather.value}/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <div>
                                                                        <label>{t('manifestation:weatherBudget')}</label>
                                                                        <input className="form-control"
                                                                               type="number"
                                                                               min="0"
                                                                               max="100"
                                                                               onChange={this.handleWeatherBudget}
                                                                               value={this.state.weatherBudget.value}/>
                                                                    </div>
                                                                </div>
                                                            </div> : <div></div>
                                                    }
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <div className="form-check"><label
                                                                className="form-check-label">
                                                                <input value={this.state.hasCrowShortageExtension.value}
                                                                       checked={this.state.hasCrowShortageExtension.value}
                                                                       onChange={this.handleHasCrowShortageExtension}
                                                                       className="form-check-input"
                                                                       type="checkbox"/>
                                                                {t('manifestation:hasCrowShortageExtension')}</label>
                                                            </div>
                                                        </div>

                                                        {
                                                            this.state.hasCrowShortageExtension.value ?
                                                                <div className="col-sm-4">
                                                                    <div>
                                                                        <label>{t('manifestation:franchise')}</label>
                                                                        <input className="form-control"
                                                                               type="number"
                                                                               min="0"
                                                                               max="100"
                                                                               onChange={this.handleFranchise}
                                                                               value={this.state.franchise.value}/>
                                                                    </div>
                                                                </div> : <div></div>
                                                        }
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-sm-4">
                                                            <div className="form-check"><label
                                                                className="form-check-label">
                                                                <input value={this.state.hasBombingExtension.value}
                                                                       checked={this.state.hasBombingExtension.value}
                                                                       onChange={this.handleHasBombingExtension}
                                                                       className="form-check-input"
                                                                       type="checkbox"/>
                                                                {t('manifestation:hasBombingExtension')}</label>
                                                            </div>
                                                        </div>
                                                        {
                                                            this.state.hasBombingExtension.value ?
                                                                <div className="col-sm-4">
                                                                    <div className="form-check"><label
                                                                        className="form-check-label">
                                                                        <input
                                                                            value={this.state.bombingHasOptionThreat.value}
                                                                            checked={this.state.bombingHasOptionThreat.value}
                                                                            onChange={this.handleBombingHasOptionThreat}
                                                                            className="form-check-input"
                                                                            type="checkbox"/>
                                                                        {t('manifestation:bombingHasOptionThreat')}
                                                                    </label>
                                                                    </div>
                                                                </div> : <div></div>
                                                        }
                                                        {
                                                            this.state.hasBombingExtension.value ?
                                                                <div className="col-sm-4">
                                                                    <div className="form-check"><label
                                                                        className="form-check-label">
                                                                        <input
                                                                            value={this.state.bombingHasOptionRecommendation.value}
                                                                            checked={this.state.bombingHasOptionRecommendation.value}
                                                                            onChange={this.handleBombingHasOptionRecommendation}
                                                                            className="form-check-input"
                                                                            type="checkbox"/>
                                                                        {t('manifestation:bombingHasOptionRecommendation')}
                                                                    </label>
                                                                    </div>
                                                                </div> : <div></div>
                                                        }

                                                    </div>
                                                    {
                                                        this.state.hasBombingExtension.value ?
                                                            <div className="row">
                                                                <div className="col-sm-4">
                                                                    <div>
                                                                        <label>{t('manifestation:bombingRate')}</label>
                                                                        <input className="form-control"
                                                                               type="number"
                                                                               min="0"
                                                                               max="100"
                                                                               onChange={this.handleBombingRate}
                                                                               value={this.state.bombingRate.value}/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <div>
                                                                        <label>{t('manifestation:bombingNumberOfDay')}</label>
                                                                        <input className="form-control"
                                                                               type="number"
                                                                               min="0"
                                                                               max="100"
                                                                               onChange={this.handleBombingNumberOfDay}
                                                                               value={this.state.bombingNumberOfDay.value}/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <div>
                                                                        <label>{t('manifestation:bombingNumberOfKilometre')}</label>
                                                                        <input className="form-control"
                                                                               type="number"
                                                                               min="0"
                                                                               max="100"
                                                                               onChange={this.handleBombingNumberOfKilometre}
                                                                               value={this.state.bombingNumberOfKilometre.value}/>
                                                                    </div>
                                                                </div>
                                                            </div> : <div></div>
                                                    }

                                                    <div className="row">
                                                        <div className="col-sm-4">
                                                            <div className="form-check"><label
                                                                className="form-check-label">
                                                                <input value={this.state.hasMoralReasonExtension.value}
                                                                       checked={this.state.hasMoralReasonExtension.value}
                                                                       onChange={this.handleHasMoralReasonExtension}
                                                                       className="form-check-input"
                                                                       type="checkbox"/>
                                                                {t('manifestation:hasMoralReasonExtension')}</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-4">
                                                            <div className="form-check"><label
                                                                className="form-check-label">
                                                                <input value={this.state.hasExpertFeeExtension.value}
                                                                       checked={this.state.hasExpertFeeExtension.value}
                                                                       onChange={this.handleHasExpertFeeExtension}
                                                                       className="form-check-input"
                                                                       type="checkbox"/>
                                                                {t('manifestation:hasExpertFeeExtension')}</label>
                                                            </div>
                                                        </div>
                                                        {
                                                            this.state.hasExpertFeeExtension.value ?
                                                                <div className="col-sm-4">
                                                                    <div>
                                                                        <label>{t('manifestation:expertWarrantyAmount')}</label>
                                                                        <input className="form-control"
                                                                               type="number"
                                                                               min="0"
                                                                               max="100"
                                                                               onChange={this.handleExpertWarrantyAmount}
                                                                               value={this.state.expertWarrantyAmount.value}/>
                                                                    </div>
                                                                </div> : <div></div>

                                                        }
                                                        {
                                                            this.state.hasExpertFeeExtension.value ?
                                                                <div className="col-sm-4">
                                                                    <div>
                                                                        <label>{t('manifestation:expertFranchise')}</label>
                                                                        <input className="form-control"
                                                                               type="number"
                                                                               min="0"
                                                                               max="100"
                                                                               onChange={this.handleExpertFranchise}
                                                                               value={this.state.expertFranchise.value}/>
                                                                    </div>
                                                                </div> : <div></div>
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                            <fieldset className="form-group">
                                                <legend><span>{t('manifestation:budget')}</span>
                                                </legend>
                                            </fieldset>
                                            <div className="row">
                                                <div className="col-sm-10">
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <div
                                                                className={"form-group " + (this.state.BNSType.valid ? "" : "has-error has-danger")}>
                                                                <label>{t('manifestation:BNSType')}</label>
                                                                <select className="form-control"
                                                                        value={this.state.BNSType.value}
                                                                        onChange={this.handleBNSType}>
                                                                    <option value="">
                                                                        {t('manifestation:noBNS')}
                                                                    </option>
                                                                    <option value="DEDUCTED_BSN">
                                                                        {t('manifestation:deductedBNS')}
                                                                    </option>
                                                                    <option value="NOT_DECUTED_BNS">
                                                                        {t('manifestation:notDeductedBNS')}
                                                                    </option>
                                                                </select>
                                                                {
                                                                    this.state.BNSType.valid ?
                                                                        <div></div>
                                                                        :<div
                                                                        className={"help-block form-text " + (this.state.BNSType.valid ? "" : "with-errors") + " form-control-feedback"}>
                                                                        <ul className="list-unstyled">
                                                                            <li>{t('manifestation:BNSType')}</li>
                                                                        </ul>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <div
                                                                className={"form-group " + (this.state.applicableFranchise.valid ? "" : "has-error has-danger")}>
                                                                <label>{t('manifestation:applicableFranchise')}</label>
                                                                <select className="form-control"
                                                                        value={this.state.applicableFranchise.value}
                                                                        onChange={this.handleApplicableFranchise}>
                                                                    <option value="">
                                                                        {t('manifestation:noFranchise')}
                                                                    </option>
                                                                    <option value="CAPITAL_FRANCHISE">
                                                                        {t('manifestation:capitalFranchise')}
                                                                    </option>
                                                                    <option value="NUMBER_REPRESENTATION_FRANCHISE">
                                                                        {t('manifestation:nomberRepresentationFranchise')}
                                                                    </option>
                                                                    <option value="OTHER_FRANCHISE">
                                                                        {t('manifestation:otherFranchise')}
                                                                    </option>
                                                                </select>
                                                                {
                                                                    this.state.applicableFranchise.valid ?
                                                                        <div></div>
                                                                        :<div
                                                                        className={"help-block form-text " + (this.state.applicableFranchise.valid ? "" : "with-errors") + " form-control-feedback"}>
                                                                        <ul className="list-unstyled">
                                                                            <li>{t('manifestation:applicableFranchiseError')}</li>
                                                                        </ul>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">

                                                        <div className="col-sm-4">
                                                            <div
                                                                className={"form-group " + (this.state.comprehensiveInsuranceRate.valid ? "" : "has-error has-danger")}>
                                                                <label>{t('manifestation:comprehensiveInsuranceRate')}</label>
                                                                <input className="form-control"
                                                                       type="number"
                                                                       min="0"
                                                                       max="5"
                                                                       onChange={this.handleComprehensiveInsuranceRate}
                                                                       value={this.state.comprehensiveInsuranceRate.value}/>
                                                                {
                                                                    this.state.comprehensiveInsuranceRate.valid ?
                                                                        <div></div>
                                                                        :<div
                                                                        className={"help-block form-text " + (this.state.comprehensiveInsuranceRate.valid ? "" : "with-errors") + " form-control-feedback"}>
                                                                        <ul className="list-unstyled">
                                                                            <li>{t('manifestation:comprehensiveInsuranceRateError')}</li>
                                                                        </ul>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                        {
                                                            this.state.BNSType.value ?
                                                                <div className="col-sm-4">
                                                                    <div
                                                                        className={"form-group " + (this.state.BNS.valid ? "" : "has-error has-danger")}>
                                                                        <label>{t('manifestation:BNS')}</label>
                                                                        <input className="form-control"
                                                                               type="number"
                                                                               min="0"
                                                                               max="50"
                                                                               onChange={this.handleBNS}
                                                                               value={this.state.BNS.value}/>
                                                                        {
                                                                            this.state.BNS.valid ?
                                                                                <div></div>
                                                                                :<div
                                                                                className={"help-block form-text " + (this.state.BNS.valid ? "" : "with-errors") + " form-control-feedback"}>
                                                                                <ul className="list-unstyled">
                                                                                    <li>{t('manifestation:BNSError')}</li>
                                                                                </ul>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </div> : <div></div>
                                                        }
                                                        {
                                                            this.state.applicableFranchise.value ?
                                                                <div className="col-sm-4">
                                                                    <div>
                                                                        <label>{t('manifestation:franchiseAmount')}</label>
                                                                        <input className="form-control"
                                                                               type="number"
                                                                               min="0"
                                                                               max="100"
                                                                               onChange={this.handleFranchiseAmount}
                                                                               value={this.state.franchiseAmount.value}/>
                                                                    </div>
                                                                </div> : <div></div>
                                                        }

                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-4">
                                                            <div>
                                                                <label>{t('manifestation:notBNSContribution')}</label>
                                                                <input className="form-control"
                                                                       type="number"
                                                                       value={budgetObject.notBNSContribution}
                                                                       disabled={true}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <div>
                                                                <label>{t('manifestation:BNS')}</label>
                                                                <input className="form-control"
                                                                       type="number"
                                                                       value={budgetObject.BNS}
                                                                       disabled={true}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <div>
                                                                <label>{t('manifestation:wholeContribution')}</label>
                                                                <input className="form-control"
                                                                       type="number"
                                                                       value={budgetObject.wholeContribution}
                                                                       disabled={true}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            &nbsp;
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="table-responsive">
                                                            <table
                                                                className="table table-bordered table-lg table-v2 table-striped">
                                                                <thead>
                                                                <tr>
                                                                    <th></th>
                                                                    <th>{t('manifestation:allRisk')}</th>
                                                                    <th>{t('manifestation:unavailability')}</th>
                                                                    <th>{t('manifestation:badWeather')}</th>
                                                                    <th>{t('manifestation:bombing')}</th>
                                                                    <th>{t('manifestation:total')}</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                <tr >
                                                                    <td>{t('manifestation:exposedBudget')}</td>
                                                                    <td>{budgetObject.A1}</td>
                                                                    <td>
                                                                        <input className="form-control"
                                                                               type="number"
                                                                               min="0"
                                                                               max="50"
                                                                               onChange={this.handleExposedBudgetUnavailability}
                                                                               value={this.state.exposedBudgetUnavailability.value}/>

                                                                    </td>
                                                                    <td>
                                                                        <input className="form-control"
                                                                               type="number"
                                                                               min="0"
                                                                               max="50"
                                                                               onChange={this.handleExposedBudgetBadWeather}
                                                                               value={this.state.exposedBudgetBadWeather.value}/>

                                                                    </td>
                                                                    <td>
                                                                        <input className="form-control"
                                                                               type="number"
                                                                               min="0"
                                                                               max="50"
                                                                               onChange={this.handleExposedBudgetBombing}
                                                                               value={this.state.exposedBudgetBombing.value}/>

                                                                    </td>
                                                                    <td>{budgetObject.A5}</td>
                                                                </tr>
                                                                {
                                                                    this.state.BNSType.value ?
                                                                        <tr >
                                                                            <td>{t('manifestation:HTRate')}</td>
                                                                            <td>{budgetObject.B1}</td>
                                                                            <td>
                                                                                <div
                                                                                    className={"form-group " + (this.state.excludingTaxRateUnavailability.valid ? "" : "has-error has-danger")}>
                                                                                    <input className="form-control"
                                                                                           type="number"
                                                                                           min="0"
                                                                                           max="50"
                                                                                           onChange={this.handleExcludingTaxRateUnavailability}
                                                                                           value={this.state.excludingTaxRateUnavailability.value}/>
                                                                                </div>


                                                                            </td>
                                                                            <td>
                                                                                <div
                                                                                    className={"form-group " + (this.state.excludingTaxRateBadWeather.valid ? "" : "has-error has-danger")}>

                                                                                    <input className="form-control"
                                                                                           type="number"
                                                                                           min="0"
                                                                                           max="50"
                                                                                           onChange={this.handleExcludingTaxRateBadWeather}
                                                                                           value={this.state.excludingTaxRateBadWeather.value}/>
                                                                                </div>


                                                                            </td>
                                                                            <td>
                                                                                <div
                                                                                    className={"form-group " + (this.state.excludingTaxRateBombing.valid ? "" : "has-error has-danger")}>

                                                                                    <input className="form-control"
                                                                                           type="number"
                                                                                           min="0"
                                                                                           max="50"
                                                                                           onChange={this.handleExcludingTaxRateBombing}
                                                                                           value={this.state.excludingTaxRateBombing.value}/>
                                                                                </div>

                                                                            </td>
                                                                            <td>{budgetObject.B5}</td>
                                                                        </tr> : <tr></tr>
                                                                }
                                                                {
                                                                    this.state.BNSType.value ?
                                                                        <tr >
                                                                            <td>{t('manifestation:HTAmount')}</td>
                                                                            <td>{budgetObject.C1}</td>
                                                                            <td>{budgetObject.C2}</td>
                                                                            <td>{budgetObject.C3}</td>
                                                                            <td>{budgetObject.C4}</td>
                                                                            <td>{budgetObject.C5}</td>
                                                                        </tr> : <tr></tr>
                                                                }

                                                                <tr >
                                                                    <td>{t('manifestation:HTBNS')}</td>
                                                                    <td>{budgetObject.D1}</td>
                                                                    <td>{budgetObject.D2}</td>
                                                                    <td>{budgetObject.D3}</td>
                                                                    <td>{budgetObject.D4}</td>
                                                                    <td>{budgetObject.D5}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td>{t('manifestation:ovationCommission')}</td>
                                                                    <td>{budgetObject.E1}</td>
                                                                    <td>{budgetObject.E2}</td>
                                                                    <td>{budgetObject.E3}</td>
                                                                    <td>
                                                                        <div
                                                                            className={"form-group " + (this.state.ovationCommission.valid ? "" : "has-error has-danger")}>
                                                                            <input className="form-control"
                                                                                   type="number"
                                                                                   min="0"
                                                                                   max="100"
                                                                                   onChange={this.handleOvationCommission}
                                                                                   value={this.state.ovationCommission.value}/>
                                                                        </div>

                                                                    </td>
                                                                    <td>{budgetObject.E5}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td>{t('manifestation:ovationCommissionBNS')}</td>
                                                                    <td>{budgetObject.F1}</td>
                                                                    <td>{budgetObject.F2}</td>
                                                                    <td>{budgetObject.F3}</td>
                                                                    <td>
                                                                        <div
                                                                            className={"form-group " + (this.state.ovationBSNCommission.valid ? "" : "has-error has-danger")}>
                                                                            <input className="form-control"
                                                                                   type="number"
                                                                                   min="0"
                                                                                   max="100"
                                                                                   onChange={this.handleOvationBSNCommission}
                                                                                   value={this.state.ovationBSNCommission.value}/>
                                                                        </div>

                                                                    </td>
                                                                    <td>{budgetObject.F5}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td>
                                                                        <div
                                                                            className={"form-group " + (this.state.taxRate.valid ? "" : "has-error has-danger")}>
                                                                            {t('manifestation:TaxPercent')}
                                                                            <input className="form-control"
                                                                                   type="number"
                                                                                   min="0"
                                                                                   max="50"
                                                                                   onChange={this.handleTaxRate}
                                                                                   value={this.state.taxRate.value}/>
                                                                        </div>

                                                                    </td>
                                                                    <td>{budgetObject.G1}</td>
                                                                    <td>{budgetObject.G2}</td>
                                                                    <td>{budgetObject.G3}</td>
                                                                    <td>{budgetObject.G4}</td>
                                                                    <td>{budgetObject.G5}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td>{t('manifestation:BNSTaxe')}</td>
                                                                    <td>{budgetObject.H1}</td>
                                                                    <td>{budgetObject.H2}</td>
                                                                    <td>{budgetObject.H3}</td>
                                                                    <td>{budgetObject.H4}</td>
                                                                    <td>{budgetObject.H5}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td>{t('manifestation:TTCAmount')}</td>
                                                                    <td>{budgetObject.I1}</td>
                                                                    <td>{budgetObject.I2}</td>
                                                                    <td>{budgetObject.I3}</td>
                                                                    <td>{budgetObject.I4}</td>
                                                                    <td>{budgetObject.I5}</td>
                                                                </tr>
                                                                {
                                                                    this.state.BNSType ?
                                                                        <tr >
                                                                            <td>{t('manifestation:TTCBNS')}</td>
                                                                            <td>{budgetObject.J1}</td>
                                                                            <td>{budgetObject.J2}</td>
                                                                            <td>{budgetObject.J3}</td>
                                                                            <td>{budgetObject.J4}</td>
                                                                            <td>{budgetObject.J5}</td>
                                                                        </tr> : <tr></tr>
                                                                }

                                                                <tr >
                                                                    <td>{t('manifestation:chargedAmount')}</td>
                                                                    <td>{budgetObject.K1}</td>
                                                                    <td>{budgetObject.K2}</td>
                                                                    <td>{budgetObject.K3}</td>
                                                                    <td>{budgetObject.K4}</td>
                                                                    <td>{budgetObject.K5}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td>{t('manifestation:toBeReversedAmount')}</td>
                                                                    <td>{budgetObject.L1}</td>
                                                                    <td>{budgetObject.L2}</td>
                                                                    <td>{budgetObject.L3}</td>
                                                                    <td>{budgetObject.L4}</td>
                                                                    <td>{budgetObject.L5}</td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <fieldset className="form-group">
                                                        <legend><span>{t('manifestation:planning')}</span>
                                                        </legend>
                                                        <ScheduleContainer handleUpdate={this.handleScheduleUpdate} data={this.state.scheduleData}/>
                                                    </fieldset>
                                                    <fieldset className="form-group">
                                                        <legend><span>{t('manifestation:indiponibility')}</span>
                                                        </legend>
                                                    </fieldset>
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    <div className="form-check"><label
                                                                        className="form-check-label">
                                                                        <input
                                                                            value={this.state.isPersonUnavailability.value}
                                                                            checked={this.state.isPersonUnavailability.value}
                                                                            onChange={(e) => {this.handleCheckbox(e, "isPersonUnavailability")}}
                                                                            className="form-check-input"
                                                                            type="checkbox"/>
                                                                        {t('manifestation:isPersonIndiponibility')}</label>
                                                                    </div>
                                                                </div>
                                                                {
                                                                    this.state.isPersonUnavailability.value ?
                                                                        <div className="col-sm-6">
                                                                            <div
                                                                                className={"form-group " + (this.state.numberPersonInsured.valid ? "" : "has-error has-danger")}>
                                                                                {t('manifestation:numberInsuredPerson')}
                                                                                <input className="form-control"
                                                                                       type="number"
                                                                                       min="0"
                                                                                       max="50"
                                                                                       onChange={(e) => this.handleNumberPersonInsured(e)}
                                                                                       value={this.state.numberPersonInsured.value}/>
                                                                            </div>
                                                                        </div> : <div></div>
                                                                }

                                                            </div>
                                                            {
                                                                this.state.isPersonUnavailability.value ?
                                                                    <div className="row">
                                                                        <div className="table-responsive">
                                                                            <table
                                                                                className="table table-bordered table-lg table-v2 table-striped">
                                                                                <thead>
                                                                                <tr>
                                                                                    <th>#</th>
                                                                                    <th>{t('manifestation:band')}</th>
                                                                                    <th>{t('manifestation:insuredPeople')}</th>
                                                                                    <th>{t('manifestation:function')}</th>
                                                                                    <th>{t('manifestation:replaceable')}</th>
                                                                                    <th>{t('manifestation:age')}</th>
                                                                                    <th>{t('manifestation:medicalExamination')}</th>
                                                                                </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                {personInsuredListDOM}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>   : <div></div>
                                                            }
                                                            {
                                                                this.state.isPersonUnavailability.value ?
                                                                    <div className="row">
                                                                        <div className="col-sm-4">
                                                                            <div className="form-check"><label
                                                                                className="form-check-label">
                                                                                <input
                                                                                    value={this.state.isTechnicianIndispensable.value}
                                                                                    checked={this.state.isTechnicianIndispensable.value}
                                                                                    onChange={(e) => {this.handleCheckbox(e, "isTechnicianIndispensable")}}
                                                                                    className="form-check-input"
                                                                                    type="checkbox"/>
                                                                                {t('manifestation:isTechnicianIndispensable')}
                                                                            </label>
                                                                            </div>
                                                                        </div>
                                                                        {
                                                                            this.state.isTechnicianIndispensable.value ?
                                                                                <div className="col-sm-4">
                                                                                    <div
                                                                                        className={"form-group " + (this.state.numberTechnicianInsured.valid ? "" : "has-error has-danger")}>
                                                                                        {t('manifestation:numberTechnicianInsured')}
                                                                                        <input className="form-control"
                                                                                               type="number"
                                                                                               min="0"
                                                                                               max="50"
                                                                                               onChange={(e) => this.handleNumberTechnicianInsured(e)}
                                                                                               value={this.state.numberTechnicianInsured.value}/>
                                                                                    </div>
                                                                                </div> : <div></div>
                                                                        }
                                                                        {
                                                                            this.state.isTechnicianIndispensable.value ?
                                                                                <div className="col-sm-4">
                                                                                    <div className="form-check"><label
                                                                                        className="form-check-label">
                                                                                        <input
                                                                                            value={this.state.isTechnicianInsuredNamed.value}
                                                                                            checked={this.state.isTechnicianInsuredNamed.value}
                                                                                            onChange={(e) => this.handleCheckbox(e, "isTechnicianInsuredNamed")}
                                                                                            className="form-check-input"
                                                                                            type="checkbox"/>
                                                                                        {t('manifestation:isTechnicianInsuredNamed')}
                                                                                    </label>
                                                                                    </div>
                                                                                </div> : <div></div>
                                                                        }
                                                                    </div>
                                                                    :<div></div>
                                                            }
                                                            {
                                                                this.state.isPersonUnavailability.value && this.state.isTechnicianIndispensable.value && this.state.isTechnicianInsuredNamed.value ?
                                                                    <div className="row">
                                                                        <div className="table-responsive">
                                                                            <table
                                                                                className="table table-bordered table-lg table-v2 table-striped">
                                                                                <thead>
                                                                                <tr>
                                                                                    <th>#</th>
                                                                                    <th>{t('manifestation:lastName')}</th>
                                                                                    <th>{t('manifestation:firstName')}</th>
                                                                                    <th>{t('manifestation:age')}</th>
                                                                                    <th>{t('manifestation:medicalExamination')}</th>
                                                                                </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                {technicianInsuredListDOM}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                    : <div></div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="form-buttons-w">
                                                    <button
                                                        className={"btn btn-primary " + (this.state.canSubmit ? '' : 'disabled')}
                                                        type="submit" onClick={this.save}>Enregistrer
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
