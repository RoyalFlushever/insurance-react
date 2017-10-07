import * as React from "react";
import {translate, Interpolate, Trans} from 'react-i18next';
import Modal from 'react-modal';
import FontAwesome from "react-fontawesome";
import CustomInputSelect from "../input/CustomInputSelect";
import CustomInputText from "../input/CustomInputText";
import CustomInputNumber from "../input/CustomInputNumber";
import User from "./../../../models/UserModel";


@translate(['user', 'error'], {wait: true})
export default class CustomInputRate extends React.Component<any, any> {

    constructor(props: any) {
        super();
        this.state = {
            showModal: false,
            customStyles: {
                content: {
                    bottom: 'auto',
                    overflow: 'auto'
                }
            }
        };

        this.onCreateUser = this.onCreateUser.bind(this);
        this.onEditUser = this.onEditUser.bind(this);
        this.onDeleteUser = this.onDeleteUser.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.saveUser = this.saveUser.bind(this);
    }

    onCreateUser(e) {
        e.preventDefault();
        var u = new User();
        this.setState({
            mode: 'create',
            showModal: true,
            currentUser: u
        });
    }

    onEditUser(user) {
        var u = new User();
        u.hydrate(user);
        this.setState({
            mode: 'edit',
            showModal: true,
            index: this.props.users.indexOf(user),
            currentUser: u
        });
    }

    onDeleteUser(user) {
        if(user.isDeleted === true){
            user.isDeleted = false;
        } else{
            user.isDeleted = true;
        }
        this.forceUpdate();
    }

    saveUser() {
        if (this.state.mode === "create") {
            if (this.props.users) {
                this.props.users.push(this.state.currentUser);
            }
            this.setState({
                mode: null,
                showModal: false,
                selected: null,
                currentUser: null,
            });
        } else if (this.state.mode === "edit") {
            if(this.props.users[this.state.index]){
                this.props.users[this.state.index] = this.state.currentUser;
            }
            this.setState({
                mode: null,
                showModal: false,
                selected: null,
                currentUser: null,
            });
        }
    }

    closeModal() {
        this.setState({
            mode: null,
            showModal: false,
            selected: null,
            currentUser: null,
        });
    }

    setUser(attribut, value) {
        this.state.currentUser[attribut] = value;
        this.setState({currentUser: this.state.currentUser});
    }

    render() {
        const {t} : any = this.props;
        return (
            <div>
                <div>
                    <div className="controls-above-table">
                        <div className="row">
                            <div className="col-sm-6">
                                <button className="btn btn-sm btn-primary" onClick={(e) => this.onCreateUser(e)}>
                                    <FontAwesome name="plus-square"/>&nbsp;&nbsp;{t('user:addUser')}</button>
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>{t('common:firstName')}</th>
                                <th>{t('common:lastName')}</th>
                                <th>{t('common:email')}</th>
                                <th>{t('common:phone')}</th>
                                <th>{t('common:edit')}</th>
                                <th>{t('common:delete')}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.users ? this.props.users.map((user, index) =>
                                    <tr key={index} className={ (user.isDeleted == true ? "userIsDeleted" : "")}>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>
                                            <a onClick={(e) => this.onEditUser(user)}><i className="os-icon os-icon-pencil-2"></i></a>
                                        </td>
                                        <td>
                                            <a onClick={(e) => this.onDeleteUser(user)}><i className="os-icon os-icon-ui-15"></i></a>
                                        </td>
                                    </tr>
                                ) : null
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                <Modal isOpen={this.state.showModal} style={this.state.customStyles} contentLabel="Modal"
                       onRequestClose={this.closeModal}>

                    <h1>{ t("client:user-edit") }</h1>
                    {this.state.currentUser ?

                        <form>
                            <div className="row">
                                <div className="col-md-4">
                                    <CustomInputSelect
                                        name="status"
                                        label={t('assureur:status')}
                                        onChangeFn={(newValue) => this.setUser("genre", newValue)}
                                        model={this.state.currentUser.genre}
                                        optionList={[
                                                                    {
                                                                        value: "1",
                                                                        label: t('common:title-madam')
                                                                    },
                                                                    {
                                                                        value: "2",
                                                                        label: t('common:title-sir')
                                                                    }
                                                                ]}
                                    ></CustomInputSelect>
                                </div>
                                <div className="col-md-4">
                                    <CustomInputText
                                        name="firstName"
                                        label={t('user:firstName')}
                                        validationFn={this.state.currentUser.validationFn}
                                        onChangeFn={(newValue) => this.setUser("firstName", newValue)}
                                        model={this.state.currentUser.firstName}
                                        errorLabel={t('error:firstName')}
                                    ></CustomInputText>
                                </div>
                                <div className="col-md-4">
                                    <CustomInputText
                                        name="lastName"
                                        label={t('user:lastName')}
                                        validationFn={this.state.currentUser.validationFn}
                                        onChangeFn={(newValue) => this.setUser("lastName", newValue)}
                                        model={this.state.currentUser.lastName}
                                        errorLabel={t('error:lastName')}
                                    ></CustomInputText>
                                </div>

                                <div className="col-md-6">
                                    <CustomInputText
                                        name="address"
                                        label={t('user:address')}
                                        validationFn={this.state.currentUser.validationFn}
                                        onChangeFn={(newValue) => this.setUser("address", newValue)}
                                        model={this.state.currentUser.address}
                                        errorLabel={t('error:address')}
                                    ></CustomInputText>
                                </div>
                                <div className="col-md-4">
                                    <CustomInputNumber
                                        name="zipcode"
                                        label={t('user:zipcode')}
                                        validationFn={this.state.currentUser.validationFn}
                                        onChangeFn={(newValue) => this.setUser("zipcode", newValue)}
                                        model={this.state.currentUser.zipcode}
                                        errorLabel={t('error:zipcode')}
                                    ></CustomInputNumber>
                                </div>
                                <div className="col-md-4">
                                    <CustomInputText
                                        name="city"
                                        label={t('user:city')}
                                        validationFn={this.state.currentUser.validationFn}
                                        onChangeFn={(newValue) => this.setUser("city", newValue)}
                                        model={this.state.currentUser.city}
                                        errorLabel={t('error:city')}
                                    ></CustomInputText>
                                </div>
                                <div className="col-md-4">
                                    <CustomInputText
                                        name="email"
                                        label={t('user:email')}
                                        validationFn={this.state.currentUser.validationFn}
                                        onChangeFn={(newValue) => this.setUser("email", newValue)}
                                        model={this.state.currentUser.email}
                                        errorLabel={t('error:email')}
                                    ></CustomInputText>
                                </div>
                                <div className="col-md-4">
                                    <CustomInputNumber
                                        name="phone"
                                        label={t('user:phone')}
                                        validationFn={this.state.currentUser.validationFn}
                                        onChangeFn={(newValue) => this.setUser("phone", newValue)}
                                        model={this.state.currentUser.phone}
                                        errorLabel={t('error:phone')}
                                    ></CustomInputNumber>
                                </div>
                                <div className="col-md-4">
                                    <CustomInputNumber
                                        name="mobile"
                                        label={t('user:mobile')}
                                        validationFn={this.state.currentUser.validationFn}
                                        onChangeFn={(newValue) => this.setUser("mobile", newValue)}
                                        model={this.state.currentUser.mobile}
                                        errorLabel={t('error:phone')}
                                    ></CustomInputNumber>
                                </div>
                            </div>
                        </form>
                        : null }

                    <div className="modal-footer">
                        <button className="btn btn-secondary" type="button"
                                onClick={this.closeModal}> {t('common:close')}</button>
                        <button onClick={this.saveUser} className="btn btn-primary"
                                type="button">{t('common:save')}</button>
                    </div>
                </Modal>
            </div>

        );
    }
}