import * as React from "react";
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import {translate, Interpolate, Trans} from 'react-i18next';
import i18n from '../../i18n';
import {Link, browserHistory} from 'react-router';
import {RolesService} from '../../services/role';
import {UserService} from '../../services/user';

export interface UserEditProps {
    params: any;
}

type FormObject = {value: string, valid: boolean}

export interface UserEditState {
    isAdmin: boolean,
    canSubmit: boolean,
    redirect: boolean,
    genre: FormObject,
    role: FormObject,
    firstName: FormObject,
    lastName: FormObject,
    address: FormObject,
    address2: FormObject,
    zipCode: FormObject,
    city: FormObject,
    email: FormObject
    phone: FormObject,
    mobilePhone: FormObject
    password: FormObject
}

@translate(['user'], {wait: true})
export class UserEdit extends React.Component<UserEditProps, UserEditState> {
    public columnsTranslations: Array<Array<string>>;
    public state: any;
    public nameConstant: any;
    public roleList: any;

    constructor(props: UserEditProps) {
        super(props);
        axios.defaults.baseURL = '/api/users';
        this.state = {
            isAdmin : false,
            canSubmit: false,
            redirect: false,
            genre: this.makeFormObject('', false),
            role: this.makeFormObject('', false),
            lastName: this.makeFormObject('', false),
            firstName: this.makeFormObject('', false),
            address: this.makeFormObject('', true),
            address2: this.makeFormObject('', true),
            zipCode: this.makeFormObject('', true),
            city: this.makeFormObject('', true),
            email: this.makeFormObject('', false),
            phone: this.makeFormObject('', false),
            mobilePhone: this.makeFormObject('', false),
            password: this.makeFormObject('', true)
        };

        UserService.getMe().then(
            res => {
                console.log(res.data);
                this.setState({
                    isAdmin: UserService.isAdmin(res.data)
                })
            }
        );

        this.roleList = [];
        RolesService.find().then(
            resp => {
                this.roleList = resp.data;
                this.forceUpdate();
            }
        );

        this.handleGenre = this.handleGenre.bind(this);
        this.handleRole = this.handleRole.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.handleAddress2 = this.handleAddress2.bind(this);
        this.handleZipCode = this.handleZipCode.bind(this);
        this.handleCity = this.handleCity.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleMobilePhone = this.handleMobilePhone.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
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
            if (elem !== 'canSubmit' && elem !== 'redirect' &&  elem !== 'isAdmin' && !this.state[elem].valid)
                canSubmit = false
        })
        this.state.canSubmit = canSubmit
    }

    handleGenre(event: any) {
        event.preventDefault();
        this.setState({
            genre: this.makeFormObject(event.currentTarget.value, event.currentTarget.value ? true : false)
        })
    }

    handleRole(event: any) {
        event.preventDefault();
        this.setState({
            role: this.makeFormObject(event.target.value,event.target.value ? true : false)
        })
    }

    handleLastName(event: any) {
        event.preventDefault();
        this.setState({
            lastName: this.makeFormObject(event.target.value, event.target.value ? true : false)
        })
    }

    handleFirstName(event: any) {
        event.preventDefault();
        this.setState({
            firstName: this.makeFormObject(event.target.value, event.target.value ? true : false)
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

    handlePhone(event: any) {
        event.preventDefault();
        this.setState({
            phone: this.makeFormObject(event.target.value, (this.state.mobilePhone.value || event.target.value) ? true : false)
        })
        this.setState({
            mobilePhone: this.makeFormObject(this.state.mobilePhone.value, (this.state.phone.value || this.state.mobilePhone) ? true : false)
        })
    }

    handleMobilePhone(event: any) {
        event.preventDefault();
        this.setState({
            mobilePhone: this.makeFormObject(event.target.value, (this.state.phone.value || event.target.value) ? true : false)
        })
        this.setState({
            phone: this.makeFormObject(this.state.phone.value, (this.state.mobilePhone.value ||this.state.phone) ? true : false)
        })
    }

    handlePassword(event: any) {
        event.preventDefault();
        this.setState({
            password: this.makeFormObject(event.target.value, true)
        })
    }


    handleEmail(event: any) {
        event.preventDefault();
        let isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value);
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
                genre: this.state.genre.value,
                roleId: this.state.role.value,
                firstName: this.state.firstName.value,
                lastName: this.state.lastName.value,
                address: this.state.address.value,
                address2: this.state.address2.value,
                zipCode: this.state.zipCode.value,
                city: this.state.city.value,
                email: this.state.email.value,
                phone: this.state.phone.value,
                mobilePhone: this.state.mobilePhone.value,
                password: this.state.password.value,
            }).then(resp => {
                browserHistory.push('/user')
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
                    genre: this.makeFormObject(row.genre, true),
                    role: this.makeFormObject(row.roleId, true),
                    lastName: this.makeFormObject(row.lastName, true),
                    firstName: this.makeFormObject(row.firstName, true),
                    city: this.makeFormObject(row.city, true),
                    address: this.makeFormObject(row.address, true),
                    address2: this.makeFormObject(row.address2, true),
                    zipCode: this.makeFormObject(row.zipCode, true),
                    phone: this.makeFormObject(row.phone, true),
                    mobilePhone: this.makeFormObject(row.mobilePhone, true),
                    email: this.makeFormObject(row.email, true),
                    password: this.makeFormObject(row.password, true),
                })
            })
        }
    }

    render() {
        const {t} : any = this.props;
        const roleListDOM = this.roleList.map((role) =>
            <option key={role.id} value={role.id}>{role.nameFr}</option>
        );


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
                                            (this.props.params.id ? t('businessProvider:editUserPageTitle')
                                                : t('businessProvider:createUserPageTitle'))
                                        }
                                    </h6>
                                    <div className="element-box">

                                        <form id="formValidate">
                                            <div className="row">
                                                <div className="col-sm-10">
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <div className={"form-group " + (this.state.genre.valid ? "" : "has-error has-danger")}>
                                                            <label>{t('user:genre')}</label>
                                                                <select className="form-control"
                                                                        value={this.state.genre.value}
                                                                        onChange={this.handleGenre}>
                                                                    <option value="">
                                                                    </option>
                                                                    <option value="mr">
                                                                        {t('manifestation:mr')}
                                                                    </option>
                                                                    <option value="mrs">
                                                                        {t('manifestation:mrs')}
                                                                    </option>
                                                                </select>
                                                                {
                                                                    this.state.genre.valid ? <div></div>
                                                                        :<div
                                                                        className={"help-block form-text " + (this.state.genre.valid ? "" : "with-errors") + " form-control-feedback"}>
                                                                        <ul className="list-unstyled">
                                                                            <li>{t('manifestation:genreError')}</li>
                                                                        </ul>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <div className={"form-group " + (this.state.role.valid ? "" : "has-error has-danger")}>
                                                                <label>{t('user:role')}</label>
                                                                <select className="form-control" disabled={!this.state.isAdmin}
                                                                        value={this.state.role.value}
                                                                        onChange={this.handleRole}>
                                                                    <option value="">
                                                                    </option>
                                                                    {roleListDOM}
                                                                </select>
                                                                {
                                                                    this.state.role.valid ? <div></div>
                                                                        :<div
                                                                        className={"help-block form-text " + (this.state.role.valid ? "" : "with-errors") + " form-control-feedback"}>
                                                                        <ul className="list-unstyled">
                                                                            <li>{t('manifestation:roleError')}</li>
                                                                        </ul>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <div
                                                                className={"form-group " + (this.state.lastName.valid ? "" : "has-error has-danger")}>
                                                                <label>{t('manifestation:lastName')}</label>
                                                                <input className="form-control" type="text"
                                                                       onChange={this.handleLastName}
                                                                       value={this.state.lastName.value}/>
                                                                {
                                                                    this.state.lastName.valid ?
                                                                        <div></div>
                                                                        :<div
                                                                        className={"help-block form-text " + (this.state.lastName.valid ? "" : "with-errors") + " form-control-feedback"}>
                                                                        <ul className="list-unstyled">
                                                                            <li>{t('manifestation:lastNameError')}</li>
                                                                        </ul>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <div
                                                                className={"form-group " + (this.state.firstName.valid ? "" : "has-error has-danger")}>
                                                                <label>{t('manifestation:firstName')}</label>
                                                                <input className="form-control" type="text"
                                                                       onChange={this.handleFirstName}
                                                                       value={this.state.firstName.value}/>
                                                                {
                                                                    this.state.firstName.valid ?
                                                                        <div></div>
                                                                        :<div
                                                                        className={"help-block form-text " + (this.state.firstName.valid ? "" : "with-errors") + " form-control-feedback"}>
                                                                        <ul className="list-unstyled">
                                                                            <li>{t('manifestation:firstNameError')}</li>
                                                                        </ul>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <div
                                                                className={"form-group " + (this.state.address.valid ? "" : "has-error has-danger")}>
                                                                <label>{t('manifestation:address')}</label>
                                                                <input className="form-control" type="text"
                                                                       onChange={this.handleAddress}
                                                                       value={this.state.address.value}/>
                                                                {
                                                                    this.state.address.valid ?
                                                                        <div></div>
                                                                        :<div
                                                                        className={"help-block form-text " + (this.state.address.valid ? "" : "with-errors") + " form-control-feedback"}>
                                                                        <ul className="list-unstyled">
                                                                            <li>{t('manifestation:addressError')}</li>
                                                                        </ul>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <div
                                                                className={"form-group " + (this.state.address2.valid ? "" : "has-error has-danger")}>
                                                                <label>{t('manifestation:address2')}</label>
                                                                <input className="form-control" type="text"
                                                                       onChange={this.handleAddress2}
                                                                       value={this.state.address2.value}/>
                                                                {
                                                                    this.state.address2.valid ?
                                                                        <div></div>
                                                                        :<div
                                                                        className={"help-block form-text " + (this.state.address2.valid ? "" : "with-errors") + " form-control-feedback"}>
                                                                        <ul className="list-unstyled">
                                                                            <li>{t('manifestation:address2Error')}</li>
                                                                        </ul>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <div
                                                                className={"form-group " + (this.state.zipCode.valid ? "" : "has-error has-danger")}>
                                                                <label>{t('manifestation:zipCode')}</label>
                                                                <input className="form-control" type="text"
                                                                       onChange={this.handleZipCode}
                                                                       value={this.state.zipCode.value}/>
                                                                {
                                                                    this.state.zipCode.valid ?
                                                                        <div></div>
                                                                        :<div
                                                                        className={"help-block form-text " + (this.state.zipCode.valid ? "" : "with-errors") + " form-control-feedback"}>
                                                                        <ul className="list-unstyled">
                                                                            <li>{t('manifestation:zipCodeError')}</li>
                                                                        </ul>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <div
                                                                className={"form-group " + (this.state.city.valid ? "" : "has-error has-danger")}>
                                                                <label>{t('manifestation:city')}</label>
                                                                <input className="form-control" type="text"
                                                                       onChange={this.handleCity}
                                                                       value={this.state.city.value}/>
                                                                {
                                                                    this.state.city.valid ?
                                                                        <div></div>
                                                                        :<div
                                                                        className={"help-block form-text " + (this.state.city.valid ? "" : "with-errors") + " form-control-feedback"}>
                                                                        <ul className="list-unstyled">
                                                                            <li>{t('manifestation:cityError')}</li>
                                                                        </ul>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <div
                                                                className={"form-group " + (this.state.email.valid ? "" : "has-error has-danger")}>
                                                                <label>{t('manifestation:email')}</label>
                                                                <input className="form-control" type="text"
                                                                       onChange={this.handleEmail}
                                                                       value={this.state.email.value}/>
                                                                {
                                                                    this.state.email.valid ?
                                                                        <div></div>
                                                                        :<div
                                                                        className={"help-block form-text " + (this.state.email.valid ? "" : "with-errors") + " form-control-feedback"}>
                                                                        <ul className="list-unstyled">
                                                                            <li>{t('manifestation:emailError')}</li>
                                                                        </ul>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <div
                                                                className={"form-group " + (this.state.phone.valid ? "" : "has-error has-danger")}>
                                                                <label>{t('manifestation:phone')}</label>
                                                                <input className="form-control" type="text"
                                                                       onChange={this.handlePhone}
                                                                       value={this.state.phone.value}/>
                                                                {
                                                                    this.state.phone.valid ?
                                                                        <div></div>
                                                                        :<div
                                                                        className={"help-block form-text " + (this.state.phone.valid ? "" : "with-errors") + " form-control-feedback"}>
                                                                        <ul className="list-unstyled">
                                                                            <li>{t('manifestation:phoneError')}</li>
                                                                        </ul>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <div
                                                                className={"form-group " + (this.state.mobilePhone.valid ? "" : "has-error has-danger")}>
                                                                <label>{t('manifestation:mobilePhone')}</label>
                                                                <input className="form-control" type="text"
                                                                       onChange={this.handleMobilePhone}
                                                                       value={this.state.mobilePhone.value}/>
                                                                {
                                                                    this.state.mobilePhone.valid ?
                                                                        <div></div>
                                                                        :<div
                                                                        className={"help-block form-text " + (this.state.mobilePhone.valid ? "" : "with-errors") + " form-control-feedback"}>
                                                                        <ul className="list-unstyled">
                                                                            <li>{t('manifestation:mobilePhoneError')}</li>
                                                                        </ul>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {
                                                        !this.props.params.id ?
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <div
                                                                    className={"form-group " + (this.state.password.valid ? "" : "has-error has-danger")}>
                                                                    <label>{t('manifestation:password')}</label>
                                                                    <input className="form-control" type="password"
                                                                           onChange={this.handlePassword}
                                                                           value={this.state.password.value}/>
                                                                    {
                                                                        this.state.password.valid ?
                                                                            <div></div>
                                                                            :<div
                                                                            className={"help-block form-text " + (this.state.password.valid ? "" : "with-errors") + " form-control-feedback"}>
                                                                            <ul className="list-unstyled">
                                                                                <li>{t('manifestation:phoneError')}</li>
                                                                            </ul>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div> : <div></div>
                                                    }

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
