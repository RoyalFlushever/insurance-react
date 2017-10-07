import * as React from "react";
import axios from 'axios';
import {translate, Interpolate, Trans} from 'react-i18next';
import i18n from '../../i18n';
import Client from "../../classes/client";
import {getStates, saveClient, saveContact, getBusinessStatutses} from "../../services/client"
import {getCountries} from "../../services/country"
import Validate from "../../services/validate";
import ErrorMessage from "../helper/ErrorMessage";
import {UserService} from "../../services/user";
import {ContactList} from "./ContactList";
import {ClientContact} from "../../classes/clientContact";
import Modal from 'react-modal';
import {Utils} from "../helper/Utils";
import { toast } from 'react-toastify';
import {browserHistory} from "react-router";
import {BusinessProviderService} from "../../services/businessProvider";

const customStyles = {
    content : {
        top                   : '10%',
        left                  : '20%',
        right                 : '20%',
        bottom                : 'auto'
    }
}


export interface ClientEditProps {
    params: any;
    action: string;
}


export interface ClientEditState {
    client: Client,
    showModal: boolean,
    editContact: ClientContact,
    validations: any
    contactValidations: any
}

@translate(['client', 'countries'], {wait: true})
export class ClientEdit extends React.Component<ClientEditProps, ClientEditState> {
    public states: any;
    public statuses: any;
    public countries: any;
    public relationShipManagers: any;
    public businessProviders: any;
    public readonlyMode: boolean;

    public toastOptions = {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_RIGHT
    }

    constructor(props: ClientEditProps) {
        super(props);
        axios.defaults.baseURL = '/api/client';
        this.state = {
            client: this.getDefaultClient(),
            editContact: this.getDefaultContact(),
            validations: {},
            contactValidations: {},
            showModal: false
        };
        this.readonlyMode = this.props.action != "edit";
        this.statuses = [];
        getBusinessStatutses().then(
            resp => {
                this.statuses = resp.data;
            }
        );
        this.states = getStates();
        this.countries = getCountries();
        this.relationShipManagers = [];
        UserService.findUsersInOvatioGroup().then(
            resp => {
                this.relationShipManagers = resp.data;
            }
        );
        this.businessProviders = [];
        BusinessProviderService.find().then(
            resp => {
                this.businessProviders = resp.data;
            }
        );

        this.toggleState = this.toggleState.bind(this);
        this.handleField = this.handleField.bind(this);
        this.dump = this.dump.bind(this);
        this.formGroupClass = this.formGroupClass.bind(this);
        this.saveClient = this.saveClient.bind(this);
        this.saveContact = this.saveContact.bind(this);
        this.onAddContact = this.onAddContact.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        this.loadDataFromServer();
    }

    loadDataFromServer() {
        if (this.props.params.id) {
            axios.get('/' + this.props.params.id).then((resp) => {
                let client = resp.data[0];
                client = Utils.prepareNullValues(client);
                this.setState({
                    client: client
                });
                this.validate()
            });
        }
    }

    toggleState(event) {
        let client = this.state.client
        client.isPro = event.target.value == 1
        this.setState({
            client: client
        });
        this.validate()
    }

    handleField(event, field) {
        let client = this.state.client
        client[field] = event.target.value
        this.setState({
            client: client
        });
        this.validate();
    }

    handleContactField(event, field) {
        let contact = this.state.editContact
        contact[field] = event.target.value
        this.setState({
            editContact: contact
        });
        this.validateContact();
    }

    dump(e) {
        e.preventDefault();
        console.log(this.state.client)
        console.log(this.state.validations)
        return false;
    }

    formGroupClass(field, validations?) {
        if (validations == undefined){
            validations = this.state.validations;
        }
        let classes = "form-group";
        if (validations[field] != undefined && !validations[field].valid) {
            classes += " has-error has-danger"
        }
        return classes;
    }

    onContactEdit(contact){
        this.setState({
            showModal: true,
            editContact: contact
        });
    }

    onAddContact(e){
        e.preventDefault()
        this.setState({
            showModal: true,
            editContact: this.getDefaultContact()
        });
    }

    closeModal(){
        this.setState({
            showModal: false
        });
    }

    saveClient(e?){
        e.preventDefault()
        saveClient(this.state.client).then(
            (resp) => {
                toast.success("Données sauvegardées", this.toastOptions)
                if (this.state.client.id == null){
                    browserHistory.push("/client/edit/" + resp.data.id);
                    let newClient = this.state.client;
                    newClient.id = resp.data.id;
                    this.setState({
                        client: newClient
                    });
                }
            }
        );
    }

    saveContact(e){
        saveClient(this.state.client).then(
            (resp) => {
                saveContact(this.state.editContact).then(
                    (resp) => {
                        toast.success("Données sauvegardées", this.toastOptions)
                    }
                )
            }
        );

    }

    render() {
        const {t} : any = this.props
        const statusList = this.statuses.map((status) =>
            <option key={status.id} value={status.id}>{status.label}</option>
        );
        const relationShipManagerList = this.relationShipManagers.map((user) =>
            <option key={user.id} value={user.id}>{user.firstName + " " + user.lastName}</option>
        );
        const businessProviderList = this.businessProviders.map((bp) =>
            <option key={bp.id} value={bp.id}>{bp.businessName}</option>
        );
        const statesList = this.states.map((state) =>
            <option key={state.id} value={state.id}>{state.label}</option>
        );
        const countryList = this.countries.map((country) =>
            <option key={country.id} value={country.id}>{ t(country.label) }</option>
        );
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
                                            (this.props.params.id ? t('client:editClientTitle')
                                                : t('client:createClientTitle'))
                                        }
                                    </h6>
                                    <div className="element-box">

                                        <form id="formValidate">


                                            <div className="row">
                                                <div className="col-md-12 text-center">
                                                    <div className="btn-group" role="group">
                                                        <button type="button" onClick={this.toggleState} value="1"
                                                                className={'btn ' + (this.state.client.isPro ? 'btn-primary' : 'btn-outline-primary') }>{t('common:pro')}</button>
                                                        <button type="button" onClick={this.toggleState} value="0"
                                                                className={'btn ' + (this.state.client.isPro ? 'btn-outline-danger' : 'btn-danger') }>{t('common:private')}</button>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                        this.state.client.isPro ?
                                            <div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className={this.formGroupClass("businessName")}>
                                                            <label htmlFor="businessName"
                                                                className="form-control-label">{t('common:businessName')}
                                                                *</label>
                                                            <input className="form-control" type="text" id="businessName"
                                                                   value={this.state.client.businessName}
                                                                   onChange={(e) => this.handleField(e, "businessName")}/>
                                                            <ErrorMessage
                                                                validation={this.state.validations.businessName}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className={this.formGroupClass("siretNumber")}>
                                                            <label className="form-control-label">{t('common:siret')}
                                                                *</label>
                                                            <input className="form-control" type="text"
                                                                   value={this.state.client.siretNumber}
                                                                   onChange={(e) => this.handleField(e, "siretNumber")}/>
                                                            <ErrorMessage
                                                                validation={this.state.validations.siretNumber}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className={this.formGroupClass("statusId")}>
                                                            <label
                                                                className="form-control-label">{t('common:status')}
                                                                *</label>
                                                            <select className="form-control"
                                                                    value={this.state.client.statusId}
                                                                    onChange={(e) => this.handleField(e, "statusId")}>
                                                                <option value="">Choisir</option>
                                                                {statusList}
                                                            </select>
                                                            <ErrorMessage
                                                                validation={this.state.validations.statusId}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4 offset-4">
                                                        <div className={this.formGroupClass("vatNumber")}>
                                                            <label
                                                                className="form-control-label">{t('common:vatnumber')}</label>
                                                            <input className="form-control" type="text"
                                                                   value={this.state.client.vatNumber}
                                                                   onChange={(e) => this.handleField(e, "vatNumber")}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className={this.formGroupClass("stdphone")}>
                                                            <label
                                                                className="form-control-label">{t('common:stdphone')}</label>
                                                            <input className="form-control" type="text"
                                                                   value={this.state.client.stdPhone}
                                                                   onChange={(e) => this.handleField(e, "stdPhone")}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className={this.formGroupClass("title")}>
                                                            <label htmlFor="title"
                                                                   className="form-control-label">{t('common:title')}
                                                                *</label>
                                                                <select className="form-control"
                                                                        value={this.state.client.title}
                                                                        onChange={(e) => this.handleField(e, "title")}>
                                                                    <option key="">Choisir</option>
                                                                    <option key="1" value="1">Madame</option>
                                                                    <option key="2" value="2">Monsieur</option>
                                                                    <option key="3" value="3">Monsieur et Madame</option>
                                                                    <option key="4" value="4">Consorts</option>
                                                                    <option key="5" value="5">Indivision</option>
                                                                </select>
                                                            <ErrorMessage
                                                                validation={this.state.validations.title}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className={this.formGroupClass("lastName")}>
                                                            <label htmlFor="lastName"
                                                                   className="form-control-label">{t('common:lastName')}
                                                                *</label>
                                                            <input className="form-control" type="text" id="lastName"
                                                                   value={this.state.client.lastName}
                                                                   onChange={(e) => this.handleField(e, "lastName")}/>
                                                            <ErrorMessage
                                                                validation={this.state.validations.lastName}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className={this.formGroupClass("firstName")}>
                                                            <label htmlFor="firstName"
                                                                   className="form-control-label">{t('common:firstName')}
                                                                *</label>
                                                            <input className="form-control" type="text" id="firstName"
                                                                   value={this.state.client.firstName}
                                                                   onChange={(e) => this.handleField(e, "firstName")}/>
                                                            <ErrorMessage
                                                                validation={this.state.validations.firstName}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4 offset-4">
                                                        <div className={this.formGroupClass("email")}>
                                                            <label htmlFor="email"
                                                                   className="form-control-label">{t('common:email')}
                                                                *</label>
                                                            <input className="form-control" type="text" id="email"
                                                                   value={this.state.client.email}
                                                                   onChange={(e) => this.handleField(e, "email")}/>
                                                            <ErrorMessage
                                                                validation={this.state.validations.email}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className={this.formGroupClass("phone")}>
                                                            <label htmlFor="phone"
                                                                   className="form-control-label">{t('common:phone')}
                                                                </label>
                                                            <input className="form-control" type="text" id="phone"
                                                                   value={this.state.client.phone}
                                                                   onChange={(e) => this.handleField(e, "phone")}/>
                                                            <ErrorMessage
                                                                validation={this.state.validations.phone}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            }
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className={this.formGroupClass("relationShipManagerId")}>
                                                        <label htmlFor="relationShipManagerId"
                                                               className="form-control-label">{t('client:relationShipManager')}
                                                            *</label>
                                                        <select className="form-control" id="relationShipManagerId"
                                                                value={this.state.client.relationShipManagerId}
                                                                onChange={(e) => this.handleField(e, "relationShipManagerId")}>
                                                            <option value="">Choisir</option>
                                                            {relationShipManagerList}
                                                        </select>
                                                        <ErrorMessage
                                                            validation={this.state.validations.relationShipManagerId}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className={this.formGroupClass("stateId")}>
                                                        <label htmlFor="stateId"
                                                               className="form-control-label">{t('client:state')}
                                                            *</label>
                                                        <select className="form-control" id="stateId"
                                                                value={this.state.client.stateId}
                                                                onChange={(e) => this.handleField(e, "stateId")}>
                                                            <option value="">Choisir</option>
                                                            {statesList}
                                                        </select>
                                                        <ErrorMessage
                                                            validation={this.state.validations.stateId}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className={this.formGroupClass("address")}>
                                                        <label htmlFor="address"
                                                               className="form-control-label">{t('common:address')}
                                                            </label>
                                                        <input className="form-control" type="text" id="address"
                                                               value={this.state.client.address}
                                                               onChange={(e) => this.handleField(e, "address")}/>
                                                        <ErrorMessage
                                                            validation={this.state.validations.address}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className={this.formGroupClass("addressCompl")}>
                                                        <label htmlFor="addressCompl"
                                                               className="form-control-label">{t('common:addressCompl')}
                                                            </label>
                                                        <input className="form-control" type="text" id="addressCompl"
                                                               value={this.state.client.addressCompl}
                                                               onChange={(e) => this.handleField(e, "addressCompl")}/>
                                                        <ErrorMessage
                                                            validation={this.state.validations.addressCompl}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className={this.formGroupClass("postalCode")}>
                                                        <label htmlFor="postalCode"
                                                               className="form-control-label">{t('common:postalCode')}
                                                            </label>
                                                        <input className="form-control" type="text" id="postalCode"
                                                               value={this.state.client.postalCode}
                                                               onChange={(e) => this.handleField(e, "postalCode")}/>
                                                        <ErrorMessage
                                                            validation={this.state.validations.postalCode}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className={this.formGroupClass("city")}>
                                                        <label htmlFor="city"
                                                               className="form-control-label">{t('common:city')}
                                                            </label>
                                                        <input className="form-control" type="text" id="city"
                                                               value={this.state.client.city}
                                                               onChange={(e) => this.handleField(e, "city")}/>
                                                        <ErrorMessage
                                                            validation={this.state.validations.city}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className={this.formGroupClass("countryId")}>
                                                        <label htmlFor="countryId"
                                                               className="form-control-label">{t('common:country')}
                                                            </label>
                                                        <select className="form-control" id="countryId"
                                                                value={this.state.client.countryId}
                                                                onChange={(e) => this.handleField(e, "countryId")}>
                                                            <option value="">Choisir</option>
                                                            {countryList}
                                                        </select>
                                                        <ErrorMessage
                                                            validation={this.state.validations.countryId}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className={this.formGroupClass("businessProviderId")}>
                                                        <label htmlFor="businessProviderId"
                                                               className="form-control-label">{t('common:businessProvider')}
                                                            *</label>
                                                        <select className="form-control" id="businessProviderId"
                                                                value={this.state.client.businessProviderId}
                                                                onChange={(e) => this.handleField(e, "businessProviderId")}>
                                                            <option value="">Choisir</option>
                                                            {businessProviderList}
                                                        </select>
                                                        <ErrorMessage
                                                            validation={this.state.validations.businessProviderId}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <fieldset>
                                                        <legend>
                                                            <span>Contacts</span>
                                                        </legend>
                                                    </fieldset>
                                                    <ContactList contacts={this.state.client.contacts} onContactEdit={(contact) => this.onContactEdit(contact)} onAddContact={(e) => this.onAddContact(e)} />
                                                </div>
                                            </div>
                                            <div className="form-buttons-w">
                                                <button className="btn btn-primary"type="submit" onClick={this.saveClient}>Enregistrer</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.showModal} style={customStyles} contentLabel="Modal" onRequestClose={this.closeModal}>
                    <h1>{ t("client:contact-edit") }</h1>
                    <form>
                        <div className="row">
                            <div className="col-md-6">
                                <div className={this.formGroupClass("title", this.state.contactValidations)}>
                                    <label htmlFor="contact-title"
                                           className="form-control-label">{t('common:title')}
                                        *</label>
                                    <select className="form-control" id="contact-title"
                                            value={this.state.editContact.title}
                                            onChange={(e) => this.handleContactField(e, "title")}>
                                        <option key="">- { t('commion:title-select') } -</option>
                                        <option key="1" value="1">{ t('common:title-madam') }</option>
                                        <option key="2" value="2">{ t('common:title-sir') }</option>
                                    </select>
                                    <ErrorMessage
                                        validation={this.state.contactValidations.title}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className={this.formGroupClass("lastName", this.state.contactValidations)}>
                                    <label htmlFor="contact-lastName"
                                           className="form-control-label">{t('common:lastName')}
                                    </label>
                                    <input className="form-control" type="text" id="contact-lastName"
                                           value={this.state.editContact.lastName}
                                           onChange={(e) => this.handleContactField(e, "lastName")}/>
                                    <ErrorMessage
                                        validation={this.state.contactValidations.lastName}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={this.formGroupClass("firstName", this.state.contactValidations)}>
                                    <label htmlFor="contact-firstName"
                                           className="form-control-label">{t('common:firstName')}
                                    </label>
                                    <input className="form-control" type="text" id="firstName"
                                           value={this.state.editContact.firstName}
                                           onChange={(e) => this.handleContactField(e, "firstName")}/>
                                    <ErrorMessage
                                        validation={this.state.contactValidations.firstName}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className={this.formGroupClass("address", this.state.contactValidations)}>
                                    <label htmlFor="contact-address"
                                           className="form-control-label">{t('common:address')}
                                    </label>
                                    <input className="form-control" type="text" id="contact-address"
                                           value={this.state.editContact.address}
                                           onChange={(e) => this.handleContactField(e, "address")}/>
                                    <ErrorMessage
                                        validation={this.state.contactValidations.address}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className={this.formGroupClass("addressCompl", this.state.contactValidations)}>
                                    <label htmlFor="contact-addressCompl"
                                           className="form-control-label">{t('common:addressCompl')}
                                    </label>
                                    <input className="form-control" type="text" id="contact-addressCompl"
                                           value={this.state.editContact.addressCompl}
                                           onChange={(e) => this.handleContactField(e, "addressCompl")}/>
                                    <ErrorMessage
                                        validation={this.state.contactValidations.addressCompl}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className={this.formGroupClass("postalCode", this.state.contactValidations)}>
                                    <label htmlFor="contact-postalCode"
                                           className="form-control-label">{t('common:postalCode')}
                                    </label>
                                    <input className="form-control" type="text" id="contact-postalCode"
                                           value={this.state.editContact.postalCode}
                                           onChange={(e) => this.handleContactField(e, "postalCode")}/>
                                    <ErrorMessage
                                        validation={this.state.contactValidations.postalCode}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={this.formGroupClass("city", this.state.contactValidations)}>
                                    <label htmlFor="contact-city"
                                           className="form-control-label">{t('common:city')}
                                    </label>
                                    <input className="form-control" type="text" id="city"
                                           value={this.state.editContact.city}
                                           onChange={(e) => this.handleContactField(e, "city")}/>
                                    <ErrorMessage
                                        validation={this.state.contactValidations.city}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className={this.formGroupClass("email", this.state.contactValidations)}>
                                    <label htmlFor="contact-email"
                                           className="form-control-label">{t('common:email')}
                                    </label>
                                    <input className="form-control" type="text" id="email"
                                           value={this.state.editContact.email}
                                           onChange={(e) => this.handleContactField(e, "email")}/>
                                    <ErrorMessage
                                        validation={this.state.contactValidations.email}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={this.formGroupClass("fax", this.state.contactValidations)}>
                                    <label htmlFor="contact-fax"
                                           className="form-control-label">{t('common:fax')}
                                    </label>
                                    <input className="form-control" type="text" id="fax"
                                           value={this.state.editContact.fax}
                                           onChange={(e) => this.handleContactField(e, "fax")}/>
                                    <ErrorMessage
                                        validation={this.state.contactValidations.fax}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className={this.formGroupClass("phone", this.state.contactValidations)}>
                                    <label htmlFor="contact-phone"
                                           className="form-control-label">{t('common:phone')}
                                    </label>
                                    <input className="form-control" type="text" id="contact-phone"
                                           value={this.state.editContact.phone}
                                           onChange={(e) => this.handleContactField(e, "phone")}/>
                                    <ErrorMessage
                                        validation={this.state.contactValidations.phone}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={this.formGroupClass("mobile", this.state.contactValidations)}>
                                    <label htmlFor="contact-mobile"
                                           className="form-control-label">{t('common:mobile')}
                                    </label>
                                    <input className="form-control" type="text" id="mobile"
                                           value={this.state.editContact.mobile}
                                           onChange={(e) => this.handleContactField(e, "mobile")}/>
                                    <ErrorMessage
                                        validation={this.state.contactValidations.mobile}/>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" type="button" onClick={this.closeModal}> Close</button>
                        <button className="btn btn-primary" type="button" onClick={this.saveContact}> Save changes</button>
                    </div>
                </Modal>
            </div>
        );
    }

    getDefaultClient() {
        return {
            id: null,
            isPro: true,
            //Pro Specific
            businessName: "",
            siretNumber: "",
            statusId: 0,
            businessStatus: null,
            vatNumber: "",
            stdPhone: "",

            //Private Specific
            title: 0,
            lastName: "",
            firstName: "",
            email: "",
            phone: "",

            //Common
            relationShipManagerId: 1,
            stateId: 2,
            address: "",
            addressCompl: "",
            postalCode: "",
            city: "",
            countryId: 0,
            businessProviderId: 1,
            contacts: []
        }
    }

    getDefaultContact() {
        return {
            id: null,
            clientId: null,
            title: 0,
            lastName: "",
            firstName: "",
            email: "",
            phone: "",
            mobile: "",
            fax: "",
            address: "",
            addressCompl: "",
            postalCode: "",
            city: ""
        }
    }

    private validate() {
        let validations = Validate.validate(
            {
                businessName: () => Validate.requiredIf(this.state.client.isPro, this.state.client.businessName),
                siretNumber: [
                    () => Validate.requiredIf(this.state.client.isPro, this.state.client.siretNumber),
                    () => Validate.siret(this.state.client.siretNumber),
                ],
                statusId: () => Validate.requiredIf(this.state.client.isPro, this.state.client.statusId),

                title: () => Validate.requiredIf(!this.state.client.isPro, this.state.client.title),
                lastName: () => Validate.requiredIf(!this.state.client.isPro, this.state.client.lastName),
                firstName: () => Validate.requiredIf(!this.state.client.isPro, this.state.client.firstName),
                email: [
                    () => Validate.requiredIf(!this.state.client.isPro, this.state.client.email),
                    () => Validate.email(this.state.client.email)
                ]
            }
        )

        this.setState({
            validations: validations
        })
    }

    private validateContact() {
        let contactValidations = Validate.validate(
            {

            }
        )

        this.setState({
            contactValidations: contactValidations
        })
    }
}
