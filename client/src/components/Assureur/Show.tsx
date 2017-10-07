import * as React from "react";
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { translate, Interpolate, Trans } from 'react-i18next';
import i18n from '../../i18n';
import { Link } from 'react-router'

export interface AssureurShowProps { }
export interface AssureurShowState {
    searchValue: string,
    hideDisabledAssureurs: boolean,
    rowCount: number,
    offset: number,
    sortParams: any,
    pageCount: number,
    allInsuranceCompanies: Array<any>
}

@translate(['assureur'], { wait: true })
export class AssureurShow extends React.Component<AssureurShowProps, AssureurShowState> {
    public columns: Array<string>;
    public state: any;

    constructor(props: AssureurShowProps) {
        super(props);
        axios.defaults.baseURL = '/api/insuranceCompany';
        this.columns = ['deletedAt',
                        'businessName',
                        'address',
                        'zipCode',
                        'city',
                        'contactEmail',
                        'file'];
        this.state = {
            hideDisabledAssureurs: true,
            searchValue: '',
            rowCount: 10,
            offset: 0,
            sortParams: {
                column: 'businessName',
                orderASC: true
            },
            pageCount: 0,
            allInsuranceCompanies: []
        };
        this.search = this.search.bind(this);
        this.handleHideDisabledAssureurs = this.handleHideDisabledAssureurs.bind(this);
        this.handleRowCount = this.handleRowCount.bind(this);
        this.setSortParams = this.setSortParams.bind(this);
        this.editCompany = this.editCompany.bind(this);
        this.enableCompany = this.enableCompany.bind(this);
        this.disableCompany = this.disableCompany.bind(this);
        this.loadDataFromServer = this.loadDataFromServer.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    editCompany(id: number, event: any) {
        event.preventDefault();
    }

    enableCompany(id: number, event: any) {
        event.preventDefault();
        axios.patch('/' + id).then(() => {
            this.loadDataFromServer();
        })
    }

    disableCompany(id: number, event: any) {
        event.preventDefault();
        axios.delete('/' + id).then(() => {
            this.loadDataFromServer();
        })
    }

    search(event: any) {
        event.preventDefault();
        this.setState({searchValue: event.target.value}, () => {
            this.loadDataFromServer();
        });
    }

    handleHideDisabledAssureurs(event: any) {
        this.setState({hideDisabledAssureurs: event.target.checked}, () => {
            this.loadDataFromServer();
        });
    }

    handleRowCount(event: any) {
        this.setState({rowCount: event.target.value}, () => {
            this.loadDataFromServer();
        });
    }

    handlePageChange(event: any) {
        let rowCount = this.state.rowCount
        this.setState({
            offset: Math.ceil(event.selected * rowCount),
        }, () => {
            this.loadDataFromServer();
        })
    }

    setSortParams(sortColumn: string, event: any) {
        if (['deletedAt', 'businessName', 'address', 'zipCode', 'city'].indexOf(sortColumn) > -1) {
            let orderASC = sortColumn === this.state.sortParams.column ? !this.state.sortParams.orderASC : true
            this.setState({
                sortParams: {
                    column: sortColumn,
                    orderASC: orderASC
                }
            }, () => {
                this.loadDataFromServer();
            })
        }
    }

    loadDataFromServer() {
        let params: any = {
            sort: this.state.sortParams.column,
            order: this.state.sortParams.orderASC ? 'ASC' : 'DESC',
            search: this.state.searchValue,
            offset: this.state.offset,
            limit: this.state.rowCount
        };
        if (!this.state.hideDisabledAssureurs)
            params.showDisabled = true;
        axios.get('/count', {params: {showDisabled: !this.state.hideDisabledAssureurs ? true : null }}).then((resp) => {
            let totalRowCount = resp.data.count
            axios.get('', {params: params}).then((resp) => {
                console.log(resp)
                let rowCount = this.state.rowCount
                this.setState({
                    pageCount: Math.ceil(totalRowCount / rowCount),
                    allInsuranceCompanies: resp.data
                })
            })
        });
    }

    componentDidMount() {
        this.loadDataFromServer();
    }

    render() {
        let self = this;
        const { t } : any = this.props;
        let insuranceCompanyList = this.state.allInsuranceCompanies.map(insuranceCompany => {
            let enableButton = self.enableCompany.bind(this, insuranceCompany.id);
            let disableButton = self.disableCompany.bind(this, insuranceCompany.id);
            return (
                <tr key={insuranceCompany.id}>
                    <td>{insuranceCompany.status ? <div className="status-pill green" data-title="Active" data-toggle="tooltip"></div> : <div className="status-pill red" data-title="Inactive" data-toggle="tooltip"></div>}</td>
                    <td>{insuranceCompany.businessName}</td>
                    <td>{insuranceCompany.address}</td>
                    <td>{insuranceCompany.zipCode}</td>
                    <td>{insuranceCompany.city}</td>
                    <td>{insuranceCompany.contactEmail}</td>
                    <td>{insuranceCompany.file}</td>
                    <td className="row-actions">
                      <Link to={"/Assureur/edit/" + insuranceCompany.id}><i className="os-icon os-icon-pencil-2"></i></Link>
                </td>
                </tr>
            )
        })

        // the first elem is the database name
        // the second elem is the title to display
        let insuranceCompanyTableHeader = this.columns.map((item, i) => {
            let boundItemClick = self.setSortParams.bind(this, item);
            return (
                <th key={i} onClick={boundItemClick}>{t('assureur:' + item)} {item === self.state.sortParams.column ? (self.state.sortParams.orderASC ? <i className="os-icon os-icon-arrow-up2"></i> : <i className="os-icon os-icon-arrow-down"></i>) : ''}</th>
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
                          {t('assureur:showAssureurPageTitle')}
                        </h6>
                        <div className="element-box-tp">
                          <div className="controls-above-table">
                            <div className="row">
                              <div className="col-sm-6">
                                <Link className="btn btn-sm btn-secondary" to="/assureur/create">{t('addAnAssureur')}</Link>
                                {t('hideDisabledAssureurs')} <input type="checkbox" name="" value="" onChange={this.handleHideDisabledAssureurs} checked={this.state.hideDisabledAssureurs}/>
                              </div>
                              <div className="col-sm-6">
                                <form className="form-inline justify-content-sm-end">
                                  <input className="form-control form-control-sm rounded bright" placeholder={t('assureur:searchAnAssureur')} type="text" value={this.state.searchValue} onChange={this.search} />
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
                                  {insuranceCompanyTableHeader}
                                  <th>{t('assureur:action')}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {insuranceCompanyList}
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
        );
    }
}
