import * as React from "react";
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import {translate, Interpolate, Trans} from 'react-i18next';
import i18n from '../../i18n';
import {Link, browserHistory} from 'react-router';

export interface BusinessProviderEditProps {
    params: any;
}

type FormObject = {value: string, valid: boolean}

export interface BusinessProviderEditState {
    canSubmit: boolean,
    redirect: boolean,
    type: FormObject,
    businessName: FormObject,
    companyId: FormObject,
    businessProviderLastName: FormObject,
    businessProviderFirstName: FormObject,
    status: FormObject,
    commissionPercent: FormObject,
    address: FormObject,
    address2: FormObject,
    zipCode: FormObject,
    city: FormObject,
    country: FormObject
    email: FormObject,
    phone: FormObject,
}

@translate(['businessProvider', 'countries'], {wait: true})
export class BusinessProviderEdit extends React.Component<BusinessProviderEditProps, BusinessProviderEditState> {
    public columnsTranslations: Array<Array<string>>;
    public state: any;
    public nameConstant: any;

    constructor(props: BusinessProviderEditProps) {
        super(props);
        axios.defaults.baseURL = '/api/businessProviders';
        this.nameConstant = {
            professional: 'professional',
            particular: 'particular'
        }
        this.state = {
            canSubmit: false,
            redirect: false,
            type: this.makeFormObject('', true),
            businessName: this.makeFormObject('', true),
            companyId: this.makeFormObject('', true),
            businessProviderLastName: this.makeFormObject('', true),
            businessProviderFirstName: this.makeFormObject('', true),
            status: this.makeFormObject('', true),
            commissionPercent: this.makeFormObject('', true),
            address: this.makeFormObject('', true),
            address2: this.makeFormObject('', true),
            zipCode: this.makeFormObject('', true),
            city: this.makeFormObject('', true),
            country: this.makeFormObject('', true),
            email: this.makeFormObject('', true),
            phone: this.makeFormObject('', true)
        };
        this.handleType = this.handleType.bind(this);
        this.handleBusinessName = this.handleBusinessName.bind(this);
        this.handleCompanyId = this.handleCompanyId.bind(this);
        this.handleBusinessProviderLastName = this.handleBusinessProviderLastName.bind(this);
        this.handleBusinessProviderFirstName = this.handleBusinessProviderFirstName.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
        this.handleCommissionPercent = this.handleCommissionPercent.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.handleAddress2 = this.handleAddress2.bind(this);
        this.handleZipCode = this.handleZipCode.bind(this);
        this.handleCity = this.handleCity.bind(this);
        this.handleCountry = this.handleCountry.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.checkForm = this.checkForm.bind(this);
        this.save = this.save.bind(this);
        this.getEditDataIfEditMode();
    }

    makeFormObject(value: string, valid: boolean) {
        return {
            value: value === null ? '' : value,
            valid: valid
        }
    }

    checkForm() {
        let canSubmit = true
        Object.keys(this.state).map(elem => {
            if (elem !== 'canSubmit' && elem !== 'redirect' && !this.state[elem].valid)
                canSubmit = false
        })
        this.state.canSubmit = canSubmit
    }

    handleType(event: any) {
        this.setState({
            type: this.makeFormObject(event.currentTarget.value, true)
        })
    }

    handleBusinessName(event: any) {
        event.preventDefault();
        this.setState({
            businessName: this.makeFormObject(event.target.value, event.target.value.length > 3)
        })
    }

    handleCompanyId(event: any) {
        event.preventDefault();
        this.setState({
            companyId: this.makeFormObject(event.target.value, this.isValidSiret(event.target.value))
        })
    }

    handleBusinessProviderLastName(event: any) {
        event.preventDefault();
        this.setState({
            businessProviderLastName: this.makeFormObject(event.target.value, true)
        })
    }

    handleBusinessProviderFirstName(event: any) {
        event.preventDefault();
        this.setState({
            businessProviderFirstName: this.makeFormObject(event.target.value, true)
        })
    }

    handleStatus(event: any) {
        event.preventDefault();
        this.setState({
            status: this.makeFormObject(event.target.value, true)
        })
    }

    handleCommissionPercent(event: any) {
        event.preventDefault();
        this.setState({
            commissionPercent: this.makeFormObject(event.target.value, true)
        })
    }

    handleAddress(event: any) {
        event.preventDefault();
        this.setState({
            address: this.makeFormObject(event.target.value, true)
        })
    }

    handleAddress2(event: any) {
        event.preventDefault();
        this.setState({
            address2: this.makeFormObject(event.target.value, true)
        })
    }

    handleZipCode(event: any) {
        event.preventDefault();
        this.setState({
            zipCode: this.makeFormObject(event.target.value, true)
        })
    }

    handleCity(event: any) {
        event.preventDefault();
        this.setState({
            city: this.makeFormObject(event.target.value, true)
        })
    }

    handleCountry(event: any) {
        event.preventDefault();
        this.setState({
            country: this.makeFormObject(event.target.value, true)
        })
    }

    handlePhone(event: any) {
        event.preventDefault();
        this.setState({
            phone: this.makeFormObject(event.target.value, true)
        })
    }

    isValidSiret(siret: string) {
        siret = siret.replace(/\s+/g, '')
        if (isNaN(parseInt(siret)) || siret.length != 14)
            return false;
        let sum: number = 0;
        let tmp: number;
        for (let cpt = 0; cpt < siret.length; cpt++) {
            if ((cpt % 2) == 0) {
                tmp = parseInt(siret.charAt(cpt)) * 2;
                if (tmp > 9)
                    tmp -= 9;
            }
            else
                tmp = parseInt(siret.charAt(cpt));
            sum += tmp;
        }
        if ((sum % 10) == 0)
            return true;
        return false;
    }

    handleEmail(event: any) {
        event.preventDefault();
        let isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)
        this.setState({
            email: {
                value: event.target.value,
                valid: isValid
            }
        })
    }

    save(event: any) {
        event.preventDefault();
        console.log(this.state);
        if (this.state.canSubmit) {
            let method = (this.props.params.id ? axios.put : axios.post)
            method('/' + (this.props.params.id ? this.props.params.id : ''), {
                type: this.state.type.value,
                businessName: this.state.businessName.value,
                companyId: this.state.companyId.value,
                businessProviderLastName: this.state.businessProviderLastName.value,
                businessProviderFirstName: this.state.businessProviderFirstName.value,
                status: this.state.status.value,
                commissionPercent: this.state.commissionPercent.value,
                address: this.state.address.value,
                address2: this.state.address2.value,
                zipCode: this.state.zipCode.value,
                city: this.state.city.value,
                country: this.state.country.value,
                email: this.state.email.value,
                phone: this.state.phone.value,
            }).then(resp => {
                console.log(this.state.status.value, ' wow ', resp.data.deletedAt)
                browserHistory.push('/businessProvider')
            })
        }
    }

    getEditDataIfEditMode() {
        if (this.props.params.id) {
            console.log(this.props.params.id)
            axios.get('/' + this.props.params.id, {}).then(resp => {
                console.log(resp.data)
                let row = resp.data;
                this.setState({
                    type: this.makeFormObject(row.type, true),
                    businessName: this.makeFormObject(row.businessName, true),
                    companyId: this.makeFormObject(row.companyId, true),
                    businessProviderLastName: this.makeFormObject(row.businessProviderLastName, true),
                    businessProviderFirstName: this.makeFormObject(row.businessProviderFirstName, true),
                    status: this.makeFormObject(row.status, true),
                    commissionPercent: this.makeFormObject(row.commissionPercent, true),
                    city: this.makeFormObject(row.city, true),
                    address: this.makeFormObject(row.address, true),
                    address2: this.makeFormObject(row.address2, true),
                    zipCode: this.makeFormObject(row.zipCode, true),
                    country: this.makeFormObject(row.country, true),
                    phone: this.makeFormObject(row.phone, true),
                    email: this.makeFormObject(row.email, true),
                })
            })
        }
    }

    render() {
        const {t} : any = this.props;
        this.checkForm()
        console.log('render')
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
                                            (this.props.params.id ? t('businessProvider:editBusinessProviderPageTitle')
                                                : t('businessProvider:createBusinessProviderPageTitle'))
                                        }
                                    </h6>
                                    <div className="element-box">

                                        <form id="formValidate">


                                            <div className="row">
                                                <div className="col-sm-8">
                                                    <div className="row">
                                                        <div className="form-group row">
                                                            <label className="col-sm-4 col-form-label"></label>
                                                            <div className="col-sm-8">
                                                                <div className="form-check">
                                                                    <label className="form-check-label">
                                                                        <input className="form-check-input"
                                                                               name="optionsRadios" type="radio"
                                                                               value={this.nameConstant.professional}
                                                                               checked={this.state.type.value === this.nameConstant.professional}
                                                                               onChange={this.handleType}/>
                                                                        {t('businessProvider:professional')}</label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <label className="form-check-label">
                                                                        <input className="form-check-input"
                                                                               name="optionsRadios" type="radio"
                                                                               value={this.nameConstant.particular}
                                                                               checked={this.state.type.value === this.nameConstant.particular}
                                                                               onChange={this.handleType}/>
                                                                        {t('businessProvider:particular')}</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {
                                                        this.state.type.value === 'professional' ?
                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    <div
                                                                        className={"form-group " + (this.state.businessName.valid ? "" : "has-error has-danger")}>
                                                                        <label>{t('businessProvider:businessName')}</label>
                                                                        <input className="form-control" type="text"
                                                                               onChange={this.handleBusinessName}
                                                                               value={this.state.businessName.value}/>
                                                                        {
                                                                            this.state.businessName.valid ? <div></div>
                                                                                :<div
                                                                                className={"help-block form-text " + (this.state.businessName.valid ? "" : "with-errors") + " form-control-feedback"}>
                                                                                <ul className="list-unstyled">
                                                                                    <li>{t('businessProvider:businessNameError')}</li>
                                                                                </ul>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div
                                                                        className={"form-group " + (this.state.companyId.valid ? "" : "has-error has-danger")}>
                                                                        <label>{t('businessProvider:companyId')}</label>
                                                                        <input className="form-control" type="text"
                                                                               onChange={this.handleCompanyId}
                                                                               value={this.state.companyId.value}/>
                                                                        {
                                                                            this.state.companyId.valid ? <div></div>
                                                                                :<div
                                                                                className={"help-block form-text " + (this.state.companyId.valid ? "" : "with-errors") + " form-control-feedback"}>
                                                                                <ul className="list-unstyled">
                                                                                    <li>{t('businessProvider:companyIdError')}</li>
                                                                                </ul>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            :
                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    <div
                                                                        className={"form-group " + (this.state.businessProviderLastName.valid ? "" : "has-error has-danger")}>
                                                                        <label>{t('businessProvider:businessProviderLastName')}</label>
                                                                        <input className="form-control" type="text"
                                                                               onChange={this.handleBusinessProviderLastName}
                                                                               value={this.state.businessProviderLastName.value}/>
                                                                        {
                                                                            this.state.businessProviderLastName.valid ?
                                                                                <div></div>
                                                                                :<div
                                                                                className={"help-block form-text " + (this.state.businessProviderLastName.valid ? "" : "with-errors") + " form-control-feedback"}>
                                                                                <ul className="list-unstyled">
                                                                                    <li>{t('businessProvider:businessProviderLastNameError')}</li>
                                                                                </ul>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div
                                                                        className={"form-group " + (this.state.businessProviderFirstName.valid ? "" : "has-error has-danger")}>
                                                                        <label>{t('businessProvider:businessProviderFirstName')}</label>
                                                                        <input className="form-control" type="text"
                                                                               onChange={this.handleBusinessProviderFirstName}
                                                                               value={this.state.businessProviderFirstName.value}/>
                                                                        {
                                                                            this.state.businessProviderFirstName.valid ?
                                                                                <div></div>
                                                                                :<div
                                                                                className={"help-block form-text " + (this.state.businessProviderFirstName.valid ? "" : "with-errors") + " form-control-feedback"}>
                                                                                <ul className="list-unstyled">
                                                                                    <li>{t('businessProvider:businessProviderFirstNameError')}</li>
                                                                                </ul>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                    }


                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <div className="form-group">
                                                                <label>{t('businessProvider:status')}</label>
                                                                <select className="form-control"
                                                                        value={this.state.status.value}
                                                                        onChange={this.handleStatus}>
                                                                    <option value="inProgress">
                                                                        {t('businessProvider:inProgress')}
                                                                    </option>
                                                                    <option value="prospect">
                                                                        {t('businessProvider:prospect')}
                                                                    </option>
                                                                    <option value="terminated">
                                                                        {t('businessProvider:terminated')}
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <div className="form-group">
                                                                <label>{t('businessProvider:commissionPercent')}</label>
                                                                <select className="form-control"
                                                                        value={this.state.commissionPercent.value}
                                                                        onChange={this.handleCommissionPercent}>
                                                                    <option value="30%">
                                                                        30 %
                                                                    </option>
                                                                    <option value="50%">
                                                                        50 %
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <div
                                                                className={"form-group " + (this.state.address.valid ? "" : "has-error has-danger")}>
                                                                <label>{t('businessProvider:address')}</label>
                                                                <input className="form-control" type="text"
                                                                       onChange={this.handleAddress}
                                                                       value={this.state.address.value}/>
                                                                {
                                                                    this.state.address.valid ? <div></div>
                                                                        :<div
                                                                        className={"help-block form-text " + (this.state.address.valid ? "" : "with-errors") + " form-control-feedback"}>
                                                                        <ul className="list-unstyled">
                                                                            <li>{t('businessProvider:address')}</li>
                                                                        </ul>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <div
                                                                className={"form-group " + (this.state.address2.valid ? "" : "has-error has-danger")}>
                                                                <label>{t('businessProvider:address2')}</label>
                                                                <input className="form-control" type="text"
                                                                       onChange={this.handleAddress2}
                                                                       value={this.state.address2.value}/>
                                                                {
                                                                    this.state.address2.valid ? <div></div>
                                                                        :<div
                                                                        className={"help-block form-text " + (this.state.address2.valid ? "" : "with-errors") + " form-control-feedback"}>
                                                                        <ul className="list-unstyled">
                                                                            <li>{t('businessProvider:address2')}</li>
                                                                        </ul>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <div
                                                                className={"form-group " + (this.state.city.valid ? "" : "has-error has-danger")}>
                                                                <label>{t('businessProvider:city')}</label>
                                                                <input className="form-control" type="text"
                                                                       onChange={this.handleCity}
                                                                       value={this.state.city.value}/>
                                                                {
                                                                    this.state.city.valid ? <div></div>
                                                                        :<div
                                                                        className={"help-block form-text " + (this.state.city.valid ? "" : "with-errors") + " form-control-feedback"}>
                                                                        <ul className="list-unstyled">
                                                                            <li>{t('businessProvider:city')}</li>
                                                                        </ul>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <div
                                                                className={"form-group " + (this.state.zipCode.valid ? "" : "has-error has-danger")}>
                                                                <label>{t('businessProvider:zipCode')}</label>
                                                                <input className="form-control" type="text"
                                                                       onChange={this.handleZipCode}
                                                                       value={this.state.zipCode.value}/>
                                                                {
                                                                    this.state.zipCode.valid ? <div></div>
                                                                        :<div
                                                                        className={"help-block form-text " + (this.state.zipCode.valid ? "" : "with-errors") + " form-control-feedback"}>
                                                                        <ul className="list-unstyled">
                                                                            <li>{t('businessProvider:zipCode')}</li>
                                                                        </ul>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <div className="form-group">
                                                                <label>{t('businessProvider:country')}</label>
                                                                <select className="form-control"
                                                                        value={this.state.country.value}
                                                                        onChange={this.handleCountry}>
                                                                    <option value="france">
                                                                        {t('countries:france')}
                                                                    </option>
                                                                    <option value="germany">
                                                                        {t('countries:germany')}
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <div
                                                                className={"form-group " + (this.state.email.valid ? "" : "has-error has-danger")}>
                                                                <label>{t('businessProvider:email')}</label>
                                                                <input className="form-control" type="text"
                                                                       onChange={this.handleEmail}
                                                                       value={this.state.email.value}/>
                                                                {
                                                                    this.state.email.valid ? <div></div>
                                                                        :<div
                                                                        className={"help-block form-text " + (this.state.email.valid ? "" : "with-errors") + " form-control-feedback"}>
                                                                        <ul className="list-unstyled">
                                                                            <li>{t('businessProvider:email')}</li>
                                                                        </ul>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <div
                                                                className={"form-group " + (this.state.phone.valid ? "" : "has-error has-danger")}>
                                                                <label>{t('businessProvider:phone')}</label>
                                                                <input className="form-control" type="text"
                                                                       onChange={this.handlePhone}
                                                                       value={this.state.phone.value}/>
                                                                {
                                                                    this.state.phone.valid ? <div></div>
                                                                        :<div
                                                                        className={"help-block form-text " + (this.state.phone.valid ? "" : "with-errors") + " form-control-feedback"}>
                                                                        <ul className="list-unstyled">
                                                                            <li>{t('businessProvider:phone')}</li>
                                                                        </ul>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

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
