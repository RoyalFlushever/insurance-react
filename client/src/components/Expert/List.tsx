import * as React from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {loadExperts, deleteExpert, getCount, saveExpert} from './../../actions/expert'
import i18n from './../../i18n'
import { translate, Interpolate, Trans } from 'react-i18next'
import  PropTypes from 'prop-types'
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router'

@translate([], { wait: true })

class Expert extends React.Component<any, any> {
  static PropTypes = {
    experts: PropTypes.array
  }
  public columns: Array<string>;

  constructor(props) {
    super(props);
    this.state = {
      experts: this.props.experts,
      rowCount: 10,
      offset: 0,
      pageCount: 0,
      searchValue: '',
      searchValueTemp: '',
      sortParams: {
        column: 'businessName',
        orderASC: true
      }
    }
    this.handleAddExpert = this.handleAddExpert.bind(this)
    this.handleEditExpert = this.handleEditExpert.bind(this)
    this.handleViewExpert = this.handleViewExpert.bind(this)
    this.handleDeleteExpert = this.handleDeleteExpert.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.loadData = this.loadData.bind(this)
    this.search = this.search.bind(this)
    this.setSortParams = this.setSortParams.bind(this)
    this.handleRowCount = this.handleRowCount.bind(this)
    this.columns = [
      'businessName',
      'address',
      'zipCode',
      'city',
    ]
  }

  componentDidMount() {
    this.props.getCount()
    this.loadData()
  }

  componentWillReceiveProps(nextProps) {
    const totalRowCount = nextProps.count
    this.setState({
      experts: nextProps.experts,
      pageCount: Math.ceil(totalRowCount / this.state.rowCount),
    })
  }

  search(event: any): void {
    this.setState({searchValue: event.target.value}, () => {
      this.loadData()
    })
  }

  loadData(): void {
    const params: any = {
      sort: this.state.sortParams.column,
      order: this.state.sortParams.orderASC ? 'ASC' : 'DESC',
      search: this.state.searchValue,
      offset: this.state.offset,
      limit: this.state.rowCount
    }
    this.props.loadExperts(params)
  }

  handleRowCount(event: any): void {
    this.setState({rowCount: event.target.value}, () => {
      this.loadData()
    })
  }

  setSortParams(sortColumn: string, event: any) {
    if (['businessName', 'address', 'zipCode', 'city'].indexOf(sortColumn) > -1) {
      let orderASC = sortColumn === this.state.sortParams.column ? !this.state.sortParams.orderASC : true
      this.setState({
        sortParams: {
            column: sortColumn,
            orderASC: orderASC
        }
      }, () => {
        this.loadData();
      })
    }
  }

  handlePageChange(event: any) {
    let rowCount = this.state.rowCount
    this.setState({
      offset: Math.ceil(event.selected * rowCount)
    }, () => {
      this.loadData()
    })
  }

  handleAddExpert(): void {
    this.props.saveExpert()
    browserHistory.push({
      pathname: '/addExpert',
      state: {type: 'add'}
    })
  }

  handleEditExpert = (id) => () => {
    browserHistory.push({
      pathname: '/addExpert',
      state: {
        type: 'edit',
        id: id
      }
    })
  }

  handleViewExpert = (id) => () => {
    browserHistory.push({
      pathname: '/viewExpert',
      state: {
        id: id
      }
    })
  }

  handleDeleteExpert = (id) => () => {
    this.props.deleteExpert(id)
    setTimeout(() => {
      this.loadData()
    }, 1000)
  }

  render() {
    const { t } = this.props
    let self = this
    let expertTableHeader = this.columns.map((item, i) => {
      let boundItemClick = self.setSortParams.bind(this, item)
      return (
        <th key={i} onClick={boundItemClick}>{t('assureur:' + item)} {item === self.state.sortParams.column ? (self.state.sortParams.orderASC ? <i className="os-icon os-icon-arrow-up2"></i> : <i className="os-icon os-icon-arrow-down"></i>) : ''}</th>
      )
    })
    let expertList = this.state.experts.map(expert => {
      return (
        <tr>
          <td>{expert.businessName}</td>
          <td>{expert.address1}</td>
          <td>{expert.zipCode}</td>
          <td>{expert.city}</td>
          <td className="row-actions">
            <a onClick={this.handleEditExpert(expert.id)}><i className="os-icon os-icon-pencil-2"></i></a>
            <a onClick={this.handleDeleteExpert(expert.id)}><i className="os-icon os-icon-database-remove"></i></a>
          </td>
        </tr>
      )
    })
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
                    {t('assureur:showExpertPageTitle')}
                  </h6>
                  <div className="element-box-tp">
                    <div className="controls-above-table">
                      <div className="row">
                        <div className="col-sm-6">
                          <button className="btn btn-sm btn-secondary" onClick={this.handleAddExpert}>{t('assureur:add')}</button>
                        </div>
                        <div className="col-sm-6">
                          <form className="form-inline justify-content-sm-end">
                            <input className="form-control form-control-sm rounded bright" placeholder={t('assureur:searchExpert')} type="text" value={this.state.searchValue} onChange={this.search}/>
                            <select className="form-control form-control-sm rounded bright" onChange={this.handleRowCount}>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-bordered table-lg table-v2 table-striped">
                        <thead>
                          <tr>
                            {expertTableHeader}
                            <th>{t('assureur:action')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {expertList}
                        </tbody>
                      </table>
                    </div>
                    <div className="controls-below-table">
                      <div className="table-records-info">
                        Showing records {this.state.offset} - {this.state.offset + this.state.rowCount}
                      </div>
                      <div className="table-records-pages" id="react-paginate">
                        <ReactPaginate
                          previousLabel={t('assureur:previousLabel')}
                          nextLabel={t('assureur:nextLabel')}
                          breakLabel={"..."}
                          activeClassName={"current"}
                          breakClassName={"break-me"}
                          pageCount={this.state.pageCount}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          onPageChange={this.handlePageChange}
                          containerClassName={"table-records-pages"}
                          subContainerClassName={"pages pagination"} />
                      </div>
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
  experts: state.experts,
  count: state.count
})

const mapDispatchToProps = (dispatch) => ({
  loadExperts: (params) => dispatch(loadExperts(params)),
  saveExpert: (business, address, address2, city, zipCode, country, phone, email, fax) => dispatch(saveExpert(business, address, address2, city, zipCode, country, phone, email, fax)),
  getCount: () => dispatch(getCount()),
  deleteExpert: (id) => dispatch(deleteExpert(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Expert)
