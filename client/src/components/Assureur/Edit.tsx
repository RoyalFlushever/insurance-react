import * as React from "react";
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import {translate, Interpolate, Trans} from 'react-i18next';
import i18n from '../../i18n';
import {Link, browserHistory} from 'react-router';
import  CustomInputText from './../Global/input/CustomInputText';
import  CustomInputSelect from './../Global/input/CustomInputSelect';
import  {IAssureur, Assureur} from './../../models/AssureurModel'
import CustomInputRate from "../Global/input/CustomInputRate";
import CustomTitle from "../Global/title/CustomTitle";
import AddUser from "../Global/addUser/AddUser";
import {AssureurService} from "./../../services/assureur";
import CustomInputZipCode from "../Global/input/CustomInputZipCode";
import CustomInputCity from "../Global/input/CustomInputCity";
import CustomInputCountry from "../Global/input/CustomInputCountry";
import {UserService} from '../../services/user';


@translate(['assureur', 'countries'], {wait: true})
export class AssureurEdit extends React.Component<any, any> {

    public state: any;

    constructor(props: any) {
        super(props);
        axios.defaults.baseURL = '/api/insuranceCompany';
        this.state = {
            canSubmit: false,
            assureur: new Assureur()
        };
        this.setAssureur = this.setAssureur.bind(this);
        this.checkForm = this.checkForm.bind(this);
        this.getEditDataIfEditMode = this.getEditDataIfEditMode.bind(this);
        this.save = this.save.bind(this);
        this.getEditDataIfEditMode();

        UserService.getMe().then(
            res => {
                console.log(res.data);
                this.setState({
                    canEditState: UserService.isAdmin(res.data)
                })
            }
        );


    }

    getEditDataIfEditMode() {
        if (this.props.params.id) {
            AssureurService.getAssurreurById(this.props.params.id).then(resp => {
                let row = resp.data;
                this.state.assureur.hydrate(row);
                this.setState({
                    assureur: this.state.assureur
                })
            })
        }
    }

    save(event: any) {
        event.preventDefault();
        if (this.state.canSubmit) {
            let method = (this.props.params.id ? axios.put : axios.post);
            method('/' + (this.props.params.id ? this.props.params.id : ''), {
                assureur: this.state.assureur
            }).then(resp => {
                browserHistory.push('/assureur')
            })
        }
    }

    setAssureur(attribut, value) {
        this.state.assureur[attribut] = value;
        this.setState({assureur: this.state.assureur});
    }

    checkForm() {
        this.state.canSubmit = this.state.assureur.validateObject();
    }

    render() {
        const {t} : any = this.props;
        this.checkForm();
        return (
            <div className="content-w">
                <div className="content-i">
                    <div className="content-box">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="element-wrapper">
                                    <h6 className="element-header">
                                        {
                                            (this.props.params.id ? t('assureur:editAssureurPageTitle')
                                                : t('assureur:createAssureurPageTitle'))
                                        }
                                    </h6>
                                    <div className="element-box">
                                        <form id="formValidate">
                                            <CustomTitle label={t('assureur:generalInformation')}>
                                            </CustomTitle>
                                            <div className="row">
                                                <div className="col-sm-4">
                                                    <CustomInputText
                                                        name="businessName"
                                                        label={t('assureur:businessName')}
                                                        validationFn={this.state.assureur.validationFn}
                                                        onChangeFn={(newValue) => this.setAssureur("businessName", newValue)}
                                                        model={this.state.assureur.businessName}
                                                        errorLabel={t('assureur:businessNameError')}
                                                    ></CustomInputText>
                                                </div>
                                                <div className="col-sm-4">
                                                    <CustomInputSelect
                                                        name="status"
                                                        label={t('assureur:status')}
                                                        hasRight={this.state.canEditState}
                                                        onChangeFn={(newValue) => this.setAssureur("status", newValue)}
                                                        model={this.state.assureur.status}
                                                        optionList={[
                                                                {
                                                                    value: true,
                                                                    label: t('assureur:enabled')
                                                                },
                                                                {
                                                                    value: false,
                                                                    label: t('assureur:disable')
                                                                }
                                                            ]}
                                                    ></CustomInputSelect>
                                                </div>
                                                <div className="col-sm-4">
                                                    <CustomInputRate
                                                        name="rate"
                                                        label={t('assureur:rate')}
                                                        onChangeFn={(newValue) => this.setAssureur("rate", newValue)}
                                                        model={this.state.assureur.rate}
                                                    ></CustomInputRate>
                                                </div>
                                                <div className="col-sm-4">
                                                    <CustomInputText
                                                        name="siret"
                                                        label={t('assureur:siret')}
                                                        validationFn={this.state.assureur.validationFn}
                                                        onChangeFn={(newValue) => this.setAssureur("siret", newValue)}
                                                        model={this.state.assureur.siret}
                                                        errorLabel={t('assureur:businessNameError')}
                                                    ></CustomInputText>
                                                </div>
                                                <div className="col-sm-12">
                                                    <fieldset className="form-group">
                                                        <div className="form-group">
                                                            <label>{t('assureur:legalNotice')}</label>
                                                            <textarea className="form-control"
                                                                      value={this.state.assureur.legalNotice}
                                                                      onChange={(newValue) => this.setAssureur("legalNotice", newValue.target.value)}></textarea>
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                            <CustomTitle label={t('assureur:address')}></CustomTitle>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <CustomInputText
                                                        name="adress"
                                                        label={t('assureur:address')}
                                                        onChangeFn={(newValue) => this.setAssureur("address", newValue)}
                                                        model={this.state.assureur.address}
                                                    ></CustomInputText>
                                                </div>
                                                <div className="col-sm-6">
                                                    <CustomInputZipCode
                                                        name="zipCode"
                                                        label={t('assureur:zipCode')}
                                                        onChangeFn={(newValue) => this.setAssureur("zipCode", newValue)}
                                                        model={this.state.assureur.zipCode}
                                                    ></CustomInputZipCode>
                                                </div>
                                                <div className="col-sm-6">
                                                    <CustomInputCity
                                                        name="city"
                                                        label={t('assureur:city')}
                                                        onChangeFn={(newValue) => this.setAssureur("city", newValue)}
                                                        model={this.state.assureur.city}
                                                    ></CustomInputCity>
                                                </div>
                                                <div className="col-sm-6">
                                                    <CustomInputCountry
                                                        name="country"
                                                        label={t('assureur:country')}
                                                        onChangeFn={(newValue) => this.setAssureur("country", newValue)}
                                                        model={this.state.assureur.country}
                                                    ></CustomInputCountry>
                                                </div>
                                            </div>
                                            <CustomTitle label={t('assureur:addressAccounting')}></CustomTitle>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <CustomInputText
                                                        name="addressAccounting"
                                                        label={t('assureur:addressAccounting')}
                                                        onChangeFn={(newValue) => this.setAssureur("addressAccounting", newValue)}
                                                        model={this.state.assureur.addressAccounting}
                                                    ></CustomInputText>
                                                </div>
                                                <div className="col-sm-6">
                                                    <CustomInputZipCode
                                                        name="zipCodeAccounting"
                                                        label={t('assureur:zipCodeAccounting')}
                                                        onChangeFn={(newValue) => this.setAssureur("zipCodeAccounting", newValue)}
                                                        model={this.state.assureur.zipCodeAccounting}
                                                    ></CustomInputZipCode>
                                                </div>
                                                <div className="col-sm-6">
                                                    <CustomInputCity
                                                        name="cityAccounting"
                                                        label={t('assureur:cityAccounting')}
                                                        onChangeFn={(newValue) => this.setAssureur("cityAccounting", newValue)}
                                                        model={this.state.assureur.cityAccounting}
                                                    ></CustomInputCity>
                                                </div>
                                                <div className="col-sm-6">
                                                    <CustomInputCountry
                                                        name="countryAccounting"
                                                        label={t('assureur:countryAccounting')}
                                                        onChangeFn={(newValue) => this.setAssureur("countryAccounting", newValue)}
                                                        model={this.state.assureur.countryAccounting}
                                                    ></CustomInputCountry>
                                                </div>
                                            </div>
                                            <CustomTitle label={t('assureur:contacts')}></CustomTitle>
                                            <AddUser
                                                users={this.state.assureur.contacts}
                                            ></AddUser>
                                            <div className="form-buttons-w">
                                                <button
                                                    className={"btn btn-primary " + (this.state.canSubmit ? '' : 'disabled')}
                                                    type="submit" onClick={this.save}>Enregistrer
                                                </button>
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