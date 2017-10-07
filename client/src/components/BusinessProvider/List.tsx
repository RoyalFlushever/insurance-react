import * as React from "react";
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { translate, Interpolate, Trans } from 'react-i18next';
import i18n from '../../i18n';
import { Link } from 'react-router'

export interface BusinessProviderListProps { }
export interface BusinessProviderListState {
    searchValue: string,
    hideDisabledBusinessProviderList: boolean,
    rowCount: number,
    offset: number,
    sortParams: any,
    pageCount: number,
    allBusinessProviderList: Array<any>
}

@translate(['businessProvider'], { wait: true })
export class BusinessProviderList extends React.Component<BusinessProviderListProps, BusinessProviderListState> {
    public columns: Array<string>;
    public state: any;

    constructor(props: BusinessProviderListProps) {
        super(props);
        axios.defaults.baseURL = '/api/businessProviders';
        this.columns = ['deletedAt',
                        'businessName',
                        'businessProviderLastName',
                        'email',
                        'phone',
                        'commissionPercent',
                        ];
        this.state = {
            hideDisabledBusinessProviderList: true,
            searchValue: '',
            rowCount: 10,
            offset: 0,
            sortParams: {
                column: 'society',
                orderASC: true
            },
            pageCount: 0,
            allBusinessProviderList: []
        };
        this.search = this.search.bind(this);
        this.handleHideDisabledBusinessProviderList = this.handleHideDisabledBusinessProviderList.bind(this);
        this.handleRowCount = this.handleRowCount.bind(this);
        this.setSortParams = this.setSortParams.bind(this);
        this.editBusinessProvider = this.editBusinessProvider.bind(this);
        this.enableBusinessProvider = this.enableBusinessProvider.bind(this);
        this.disableBusinessProvider= this.disableBusinessProvider.bind(this);
        this.loadDataFromServer = this.loadDataFromServer.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    editBusinessProvider(id: number, event: any) {
        event.preventDefault();
    }

    /**
     * Go To Edit business Provider
     * @param id
     * @param event
     */
    enableBusinessProvider(id: number, event: any) {
        event.preventDefault();
        axios.patch('/' + id).then(() => {
            this.loadDataFromServer();
        })
    }

    disableBusinessProvider(id: number, event: any) {
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

    handleHideDisabledBusinessProviderList(event: any) {
        this.setState({hideDisabledBusinessProviderList: event.target.checked}, () => {
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
        if (['deletedAt', 'businessName', 'businessProviderLastName', 'email', 'phone', 'commissionPercent'].indexOf(sortColumn) > -1) {
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
        if (!this.state.hideDisabledBusinessProviderList)
            params.showDisabled = true;
        axios.get('/count', {params: {showDisabled: !this.state.hideDisabledBusinessProviderList ? true : null }}).then((resp) => {
            let totalRowCount = resp.data.count
            axios.get('', {params: params}).then((resp) => {
                console.log(resp)
                let rowCount = this.state.rowCount
                this.setState({
                    pageCount: Math.ceil(totalRowCount / rowCount),
                    allBusinessProviderList: resp.data
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
        let businessProviderList = this.state.allBusinessProviderList.map(businessProvider => {
            let enableButton = self.enableBusinessProvider.bind(this, businessProvider.id);
            let disableButton = self.disableBusinessProvider.bind(this, businessProvider.id);
            return (

                <tr key={businessProvider.id}>
                    <td>{businessProvider.deletedAt === null ? <div className="status-pill green" data-title="Active" data-toggle="tooltip"></div> : <div className="status-pill red" data-title="Inactive" data-toggle="tooltip"></div>}</td>
                    <td>{businessProvider.businessName}</td>
                    <td>{businessProvider.businessProviderLastName}</td>
                    <td>{businessProvider.email}</td>
                    <td>{businessProvider.phone}</td>
                    <td>{businessProvider.commissionPercent}</td>
                    <td className="row-actions">
                      <Link to={"/businessProvider/edit/" + businessProvider.id}><i className="os-icon os-icon-pencil-2"></i></Link>
                      {
                        businessProvider.deletedAt ?
                            <a onClick={enableButton} href=""><i className="os-icon os-icon-others-43"></i></a>
                        :
                            <a onClick={disableButton} href=""><i className="os-icon os-icon-ui-15"></i></a>
                      }
                </td>
                </tr>
            )
        })

        // the first elem is the database name
        // the second elem is the title to display
        let businessProviderTableHeader = this.columns.map((item, i) => {
            let boundItemClick = self.setSortParams.bind(this, item);
            return (
                <th key={i} onClick={boundItemClick}>{t('businessProvider:' + item)} {item === self.state.sortParams.column ? (self.state.sortParams.orderASC ? <i className="os-icon os-icon-arrow-up2"></i> : <i className="os-icon os-icon-arrow-down"></i>) : ''}</th>
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
                          {t('businessProvider:businessProviderPageTitle')}
                        </h6>
                        <div className="element-box-tp">
                          <div className="controls-above-table">
                            <div className="row">
                              <div className="col-sm-6">
                                <Link className="btn btn-sm btn-secondary" to="/businessProvider/create">{t('addABusinessProvider')}</Link>
                                {t('hideDisabledBusinessProviderList')} <input type="checkbox" name="" value="" onChange={this.handleHideDisabledBusinessProviderList} checked={this.state.hideDisabledBusinessProviderList}/>
                              </div>
                              <div className="col-sm-6">
                                <form className="form-inline justify-content-sm-end">
                                  <input className="form-control form-control-sm rounded bright" placeholder={t('businessProvider:searchAnBusinessProvider')} type="text" value={this.state.searchValue} onChange={this.search} />
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
                                  {businessProviderTableHeader}
                                  <th>{t('businessProvider:action')}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {businessProviderList}
                              </tbody>
                            </table>
                          </div>
                          <div className="controls-below-table">
                            <div className="table-records-info">
                              Showing records {this.state.offset} - {this.state.offset + this.state.rowCount}
                            </div>
                            <div className="table-records-pages" id="react-paginate">
                                <ReactPaginate
                                   previousLabel={t('businessProvider:previousLabel')}
                                   nextLabel={t('businessProvider:nextLabel')}
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
