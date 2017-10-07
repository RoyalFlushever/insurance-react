import * as React from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import _ from 'lodash'
import i18n from './../../i18n'
import { translate, Interpolate, Trans } from 'react-i18next'

@translate([], { wait: true })

class AddExpert extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.handleBack = this.handleBack.bind(this)
    }

    handleBack(): void {
        browserHistory.push('/expert')
    }

    render() {
        const id = this.props.location.state.id
        const expert = _.find(this.props.experts, ['id', id])
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
                                    <h6 className="element-header">{t('common:showExpert')}</h6>
                                    <div className="element-box">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label className="control-label">{t('common:businessName')}</label>
                                                    <label className="form-control">{expert.businessName}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label className="control-label">{t('common:address')}</label>
                                                    <label className="form-control">{expert.address1}</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label className="control-label">{t('common:address2')}</label>
                                                    <label className="form-control">{expert.address2}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label className="control-label">{t('common:city')}</label>
                                                    <label className="form-control">{expert.city}</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label className="control-label">{t('common:zipCode')}</label>
                                                    <label className="form-control">{expert.zipCode}</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label className="control-label">{t('common:country')}</label>
                                                    <label className="form-control">{expert.country}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label className="control-label">{t('common:switchboardPhone')}</label>
                                                    <label className="form-control">{expert.switchboardPhone}</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label className="control-label">{t('common:email')}</label>
                                                    <label className="form-control">{expert.email}</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label className="control-label">{t('common:fax')}</label>
                                                    <label className="form-control">{expert.fax}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-buttons-w">
                                            <button className="btn btn-danger" onClick={this.handleBack}>{t('common:back')}</button>
                                        </div>
                                    </div>
                                </div>
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
    experts: state.experts
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(AddExpert)
