import * as React from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import _ from 'lodash'
import {saveExpert, updateExpert, deleteExpert} from './../../actions/expert'
import {loadContacts, updateContact, addContact, deleteContact} from './../../actions/contact'
import i18n from './../../i18n'
import { translate, Interpolate, Trans } from 'react-i18next'
import Modal from 'react-modal'

const customStyles = {
  content : {
    backgroundColor: '#fff',
    borderRadius: 5,
    maxWidth: 500,
    minHeight: 300,
    margin: '0 auto',
    padding: 30
  }
}

@translate([], { wait: true })

class AddExpert extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      business: this.props.business,
      address: this.props.address,
      address2: this.props.address2,
      city: this.props.city,
      zipCode: this.props.zipCode,
      country: this.props.city,
      phone: this.props.phone,
      contacts: this.props.contacts,
      modalIsOpen: false,
      modalState: 'add',
      email: this.props.email,
      fax: this.props.fax,
      contact: this.props.contact,
      c_last_name: this.props.c_last_name,
      c_first_name: this.props.c_first_name,
      c_address1: this.props.c_address1,
      c_address2: this.props.c_address2,
      c_skill: this.props.c_skill,
      c_gender: this.props.c_gender,
      c_zipCode: this.props.c_zipCode,
      c_city: this.props.c_city,
      c_phone: this.props.c_phone,
      c_mobile: this.props.c_mobile,
      c_mail: this.props.c_mail,
      c_fax: this.props.c_fax
    }
    this.handleChangeBusinessName = this.handleChangeBusinessName.bind(this)
    this.handleChangeAddress = this.handleChangeAddress.bind(this)
    this.handleChangeAddress2 = this.handleChangeAddress2.bind(this)
    this.handleChangeCity = this.handleChangeCity.bind(this)
    this.handleChangeZipCode = this.handleChangeZipCode.bind(this)
    this.handleChangeCountry = this.handleChangeCountry.bind(this)
    this.handleChangePhone = this.handleChangePhone.bind(this)
    this.handleAddExpert = this.handleAddExpert.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleChangeGender = this.handleChangeGender.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangeFax = this.handleChangeFax.bind(this)
    this.handleChangeSkill = this.handleChangeSkill.bind(this)
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this)
    this.handleChangeLastName = this.handleChangeLastName.bind(this)
    this.handleAddContact = this.handleAddContact.bind(this)
    this.handleChangeMobile = this.handleChangeMobile.bind(this)
    this.handleDeleteContact = this.handleDeleteContact.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  componentDidMount() {
    if (this.props.location.state.type === 'edit') {
      this.props.loadContacts(this.props.location.state.id)
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({contacts: nextProps.contacts})
  }

  handleChangeBusinessName(event: any) : void {
    this.setState({ business: event.target.value })
  }

  handleChangeAddress(event: any) : void {
    if (this.state.modalState === 'edit' || this.state.modalState === 'add') {
      this.setState({ c_address1: event.target.value })
    }
    this.setState({ address: event.target.value })
  }

  handleChangeAddress2(event: any) : void {
    if (this.state.modalState === 'edit' || this.state.modalState === 'add') {
      this.setState({ c_address2: event.target.value })
    }
    this.setState({ address2: event.target.value })
  }

  handleChangeCity(event: any) : void {
    if (this.state.modalState === 'edit' || this.state.modalState === 'add') {
      this.setState({ c_city: event.target.value })
    }
    this.setState({ city: event.target.value })
  }

  handleChangeZipCode(event: any) : void {
    if (this.state.modalState === 'edit' || this.state.modalState === 'add') {
      this.setState({ c_zipCode: event.target.value })
    }
    this.setState({ zipCode: event.target.value })
  }

  handleChangeCountry(event: any) : void {
    this.setState({ country: event.target.value })
  }

  handleChangePhone(event: any) : void {
    if (this.state.modalState === 'edit' || this.state.modalState === 'add') {
      this.setState({ c_phone: event.target.value })
    }
    this.setState({ phone: event.target.value })
  }

  handleChangeGender(event: any) : void {
    this.setState({ c_gender: event.target.value })
  }

  handleChangeSkill(event: any) : void {
    this.setState({ c_skill: event.target.value })
    console.log(this.state.c_skill)
  }

  handleChangeLastName(event: any) : void {
    this.setState({ c_last_name: event.target.value })
  }

  handleChangeFirstName(event: any) : void {
    this.setState({ c_first_name: event.target.value })
  }

  handleChangeEmail(event: any) : void {
    if (this.state.modalState === 'edit' || this.state.modalState === 'add') {
      this.setState({ c_mail: event.target.value })
    }
    this.setState({ email: event.target.value })
  }

  handleChangeFax(event: any) : void {
    if (this.state.modalState === 'edit' || this.state.modalState === 'add') {
      this.setState({ c_fax: event.target.value })
    }
    this.setState({ fax: event.target.value })
    console.log(this.state.fax)
  }

  handleChangeMobile(event: any) : void {
    this.setState({ c_mobile: event.target.value })
  }


  handleAddExpert(): void {
    if (this.props.location.state.type === "edit") {
      this.props.updateExpert(this.props.location.state.id, this.state.business, this.state.address, this.state.address2, this.state.city, this.state.zipCode, this.state.country, this.state.phone, this.state.email, this.state.fax)
    } else {
      this.props.updateExpert(this.props.expert.id, this.state.business, this.state.address, this.state.address2, this.state.city, this.state.zipCode, this.state.country, this.state.phone, this.state.email, this.state.fax)
    }
    browserHistory.push('/expert')
  }

  handleCancel(): void {
    if (this.props.location.state.type === 'add') {
      this.props.deleteExpert(this.props.expert.id)
    }
    browserHistory.push('/expert')
  }

  handleAddContact(): void {
    if (this.state.modalState === 'edit') {
      this.props.updateContact(this.state.contact.id, this.state.c_first_name, this.state.c_last_name, this.state.c_address1, this.state.c_address2, this.state.c_zipCode, this.state.c_mail, this.state.c_city, this.state.c_phone, this.state.c_mobile, this.state.c_fax, this.state.c_skill, this.state.c_gender)
      setTimeout(() => {
        this.props.loadContacts(this.props.location.state.id)
        this.closeModal()
      }, 100)
    } else {
      const id = this.props.location.state.type !== 'edit' ? this.props.expert.id : this.props.location.state.id
      this.props.addContact(id, this.state.c_first_name, this.state.c_last_name, this.state.c_address1, this.state.c_address2, this.state.c_zipCode, this.state.c_mail, this.state.c_city, this.state.c_phone, this.state.c_mobile, this.state.c_fax, this.state.c_skill, this.state.c_gender)
      setTimeout(() => {
        this.props.loadContacts(id)
        this.closeModal()
      }, 100)
    }

  }

  handleDeleteContact = (id) => () => {
    this.props.deleteContact(id)
    setTimeout(() => {
      this.props.loadContacts(id)
    }, 100)
  }

  openModal = (type, id) => () => {
    if (type === 'edit') {
      this.setState({modalIsOpen: true, modalState: 'edit', contact: _.find(this.props.contacts, ['id', id])})
    } else if (type === 'add') {
      this.setState({modalIsOpen: true, modalState: 'add'})
    }
  }

  closeModal() {
    this.setState({modalIsOpen: false})
  }

  render() {
    let id
    let expert
    if (this.props.location.state.type === "edit") {
        id = this.props.location.state.id
        expert = _.find(this.props.experts, ['id', id])
    } else {
      expert = this.props.expert
    }
    const { t } = this.props


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
                      (this.props.location.state.id ? t('common:editAssureurPageTitle')
                      : t('common:createAssureurPageTitle'))
                    }
                  </h6>
                  <div className="element-box">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">{t('assureur:businessName')}</label>
                          <input className="form-control" defaultValue={this.props.location.state.type === 'edit' ? expert.businessName : ""} onChange={this.handleChangeBusinessName} />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">{t('assureur:address')}</label>
                          <input className="form-control" defaultValue={this.props.location.state.type === 'edit' ? expert.address1 : ""} onChange={this.handleChangeAddress} />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">{t('assureur:address2')}</label>
                          <input className="form-control" defaultValue={this.props.location.state.type === 'edit' ? expert.address2 : ""} onChange={this.handleChangeAddress2} />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">{t('assureur:city')}</label>
                          <input className="form-control" defaultValue={this.props.location.state.type === 'edit' ? expert.city : ""} onChange={this.handleChangeCity} />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">{t('assureur:zipCode')}</label>
                          <input className="form-control" defaultValue={this.props.location.state.type === 'edit' ? expert.zipCode : ""} onChange={this.handleChangeZipCode} />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">{t('assureur:country')}</label>
                          <select className="form-control" onChange={this.handleChangeCountry}>
                              <option>Select Country</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">{t('assureur:switchboardPhone')}</label>
                          <input className="form-control" defaultValue={this.props.location.state.type === 'edit' ? expert.switchboardPhone : ""} onChange={this.handleChangePhone} />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">{t('assureur:email')}</label>
                          <input className="form-control" defaultValue={this.props.location.state.type === 'edit' ? expert.email : ""} onChange={this.handleChangeEmail} />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">{t('assureur:fax')}</label>
                          <input className="form-control" defaultValue={this.props.location.state.type === 'edit' ? expert.fax : ""} onChange={this.handleChangeFax} />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <h1 className="form-header">{t('assureur:addContact')}</h1>
                        <div className="form-desc"></div>
                      </div>
                      <div className="row">
                        <div className="controls-above-table">
                          <div className="col-sm-6">
                            <button className="btn btn-sm btn-secondary" onClick={this.openModal('add', '0')}>{t('assureur:add')}</button>
                          </div>
                        </div>
                        <table className="table table-bordered table-lg table-v2 table-striped">
                          <thead>
                            <tr>
                              <th>{t('assureur:last_name')}</th>
                              <th>{t('assureur:first_name')}</th>
                              <th>{t('assureur:email')}</th>
                              <th>{t('assureur:telephone')}</th>
                              <th>{t('assureur:skill')}</th>
                              <th>{t('assureur:actions')}</th>
                            </tr>
                          </thead>
                          <tbody>
                          {
                            this.state.contacts.length ?
                              this.state.contacts.map((contact) => {
                                return (
                                  <tr>
                                    <td>{contact.last_name}</td>
                                    <td>{contact.first_name}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.switchboardPhone}</td>
                                    <td>{contact.skill}</td>
                                    <td className="row-actions">
                                      <a onClick={this.openModal('edit', contact.id)}><i className="os-icon os-icon-pencil-2"></i></a>
                                      <a onClick={this.handleDeleteContact(contact.id)}><i className="os-icon os-icon-database-remove"></i></a>
                                    </td>
                                  </tr>
                                )
                              }) :
                              <tr></tr>
                          }
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="form-buttons-w">
                      <button className="btn btn-primary" onClick={this.handleAddExpert}>{t('assureur:save')}</button>
                      <button className="btn btn-danger btn-margin" onClick={this.handleCancel}>{t('assureur:cancel')}</button>
                    </div>
                  </div>
                </div>
                <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} contentLabel="Example Modal" style={customStyles}>
                  <div className="content-w">
                    <div className="content-i">
                      <div className="content-box">
                        <div className="element-wrapper">
                          <div>
                            <h1 className="form-header">{t('assureur:addExpert')}</h1>
                            <div className="form-desc"></div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="control-label">{t('assureur:gender')}</label>
                                <select className="form-control">
                                  <option>{t('assureur:mrs')}</option>
                                  <option>{t('assureur:miss')}</option>
                                  <option>{t('assureur:gentleman')}</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="control-label">{t('assureur:skill')}</label>
                                <input defaultValue={this.state.modalState === 'edit' ? this.state.contact.skill : ""} className="form-control" onChange={this.handleChangeSkill}/>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="control-label">{t('assureur:last_name')}</label>
                                <input defaultValue={this.state.modalState === 'edit' ? this.state.contact.last_name : ""} className="form-control" onChange={this.handleChangeLastName} />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="control-label">{t('assureur:first_name')}</label>
                                <input defaultValue={this.state.modalState === 'edit' ? this.state.contact.first_name : ""} className="form-control" onChange={this.handleChangeFirstName} />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="control-label">{t('assureur:address1')}</label>
                              <input defaultValue={this.state.modalState === 'edit' ? this.state.contact.address1 : ""} className="form-control" onChange={this.handleChangeAddress} />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="control-label">{t('assureur:address2')}</label>
                              <input defaultValue={this.state.modalState === 'edit' ? this.state.contact.address2 : ""} className="form-control" onChange={this.handleChangeAddress2} />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="control-label">{t('assureur:zipCode')}</label>
                                <input defaultValue={this.state.modalState === 'edit' ? this.state.contact.zipCode : ""} className="form-control" onChange={this.handleChangeZipCode} />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="control-label">{t('assureur:city')}</label>
                                <input defaultValue={this.state.modalState === 'edit' ? this.state.contact.city : ""} className="form-control" onChange={this.handleChangeCity} />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="control-label">{t('assureur:email')}</label>
                                <input defaultValue={this.state.modalState === 'edit' ? this.state.contact.email : ""} className="form-control" onChange={this.handleChangeEmail} />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="control-label">{t('assureur:fax')}</label>
                                <input defaultValue={this.state.modalState === 'edit' ? this.state.contact.fax : ""} className="form-control" onChange={this.handleChangeFax} />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="control-label">{t('assureur:switchboardPhone')}</label>
                                <input defaultValue={this.state.modalState === 'edit' ? this.state.contact.switchboardPhone : ""} className="form-control" onChange={this.handleChangePhone}/>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="control-label">{t('assureur:mobile')}</label>
                                <input defaultValue={this.state.modalState === 'edit' ? this.state.contact.mobile : ""} className="form-control" onChange={this.handleChangeMobile} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-buttons-w">
                          <button className="btn btn-primary" onClick={this.handleAddContact}>{t('assureur:save')}</button>
                          <button className="btn btn-danger btn-margin" onClick={this.closeModal}>{t('assureur:cancel')}</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  experts: state.experts,
  expert: state.expert,
  contacts: state.contacts
})

const mapDispatchToProps = (dispatch) => ({
  saveExpert: (business, address, address2, city, zipCode, country, phone, email, fax) => dispatch(saveExpert(business, address, address2, city, zipCode, country, phone, email, fax)),
  updateExpert: (id, business, address, address2, city, zipCode, country, phone, email, fax) => dispatch(updateExpert(id, business, address, address2, city, zipCode, country, phone, email, fax)),
  deleteExpert: (id) => dispatch(deleteExpert(id)),
  loadContacts: (expert_id) => dispatch(loadContacts(expert_id)),
  updateContact: (id, first_name, last_name, address1, address2, zipCode, email, city, phone, mobile, fax, skill, gender) => dispatch(updateContact(id, first_name, last_name, address1, address2, zipCode, email, city, phone, mobile, fax, skill, gender)),
  addContact: (expert_id, first_name, last_name, address1, address2, zipCode, email, city, phone, mobile, fax, skill, gender) => dispatch(addContact(expert_id, first_name, last_name, address1, address2, zipCode, email, city, phone, mobile, fax, skill, gender)),
  deleteContact: (id) => dispatch(deleteContact(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddExpert)
