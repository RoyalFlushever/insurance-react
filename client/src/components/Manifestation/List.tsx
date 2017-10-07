import * as React from "react";
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { translate, Interpolate, Trans } from 'react-i18next';
import {ManifestationService} from "../../services/manifestation";
import i18n from '../../i18n';
import { Link } from 'react-router'

export interface ManifestationListProps { }
export interface ManifestationListState {
    searchValue: string,
    rowCount: number,
    offset: number,
    sortParams: any,
    pageCount: number,
    manifestationList: any,
}

@translate(['manifestation'], { wait: true })
export class ManifestationList extends React.Component<ManifestationListProps, ManifestationListState> {
    public columns: Array<string>;
    public state: any;

    constructor(props: ManifestationListProps) {
        super(props);
        axios.defaults.baseURL = '/api/manifestations';
        this.columns = ['type',
            'reference',
            'eventName',
            'premiumIncludingTax',
            'BNS',
            'client',
            ];
        this.state = {
            searchValue: '',
            rowCount: 10,
            offset: 0,
            sortParams: {
                column: 'eventName',
                orderASC: true
            },
            pageCount: 0,
            manifestationList: []
        };
        this.search = this.search.bind(this);
        this.handleRowCount = this.handleRowCount.bind(this);
        this.setSortParams = this.setSortParams.bind(this);
        this.editCompany = this.editCompany.bind(this);
        this.enableCompany = this.enableCompany.bind(this);
        this.deleteManifestation = this.deleteManifestation.bind(this);
        this.upgradeToContract = this.upgradeToContract.bind(this);
        this.downgradeToProject = this.downgradeToProject.bind(this);
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

    deleteManifestation(id: number, event: any) {
        event.preventDefault();
        axios.delete('/' + id).then(() => {
            this.loadDataFromServer();
        })
    }

    upgradeToContract(id: number, event: any){
        event.preventDefault();
        alert("Sorry, I will add conform later!")
        ManifestationService.update(id, {'sortPDF': 1}).then(() => {
            this.loadDataFromServer();
        })
    }
    downgradeToProject(id: number, event: any){
        event.preventDefault();
        alert("Sorry, This is for test! PDF will move to project status!")
        ManifestationService.update(id, {'sortPDF': 0}).then(() => {
            this.loadDataFromServer();
        })
    }

    search(event: any) {
        event.preventDefault();
        this.setState({searchValue: event.target.value}, () => {
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
        axios.get('/count', {params: {}}).then((resp) => {
            let totalRowCount = resp.data.count
            axios.get('', {params: params}).then((resp) => {
                console.log(resp)
                let rowCount = this.state.rowCount
                this.setState({
                    pageCount: Math.ceil(totalRowCount / rowCount),
                    manifestationList: resp.data
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

        let insuranceCompanyList = this.state.manifestationList.map(manifestation => {
            let deleteManifestation = self.deleteManifestation.bind(this, manifestation.id);
            let upgradeToContract = self.upgradeToContract.bind(this, manifestation.id);
            let downgradeToProject = self.downgradeToProject.bind(this, manifestation.id);
            return (
                <tr key={manifestation.id}>
                    <td>{manifestation.type}</td>
                    <td>{manifestation.businessName}</td>
                    <td>{manifestation.eventName}</td>
                    <td>{manifestation.totalDeclaredBudget}</td>
                    <td>{manifestation.BNS}</td>
                    <td>{manifestation.accountManagerId}</td>
                    <td className="row-actions">
                        <Link to={"/manifestation/edit/" + manifestation.id}><i className="os-icon os-icon-pencil-2"></i></Link>
                        {
                            manifestation.deletedAt ?
                                <a onClick={deleteManifestation} href=""><i className="os-icon os-icon-others-43"></i></a>
                                :
                                <a onClick={deleteManifestation} href=""><i className="os-icon os-icon-ui-15"></i></a>
                        }
                        <Link to={"/preview/" + manifestation.id}><i className="os-icon os-icon-newspaper"></i></Link>
                        {
                            manifestation.sortPDF == 0?
                                <a onClick={upgradeToContract} href=""><i className="os-icon os-icon-mail-19"></i></a>
                                :
                                <a onClick={downgradeToProject} href=""><i className="os-icon os-icon-common-07"></i></a>
                        }
                    </td>
                </tr>
            )
        })

        // the first elem is the database name
        // the second elem is the title to display
        let insuranceCompanyTableHeader = this.columns.map((item, i) => {
            let boundItemClick = self.setSortParams.bind(this, item);
            return (
                <th key={i} onClick={boundItemClick}>{t('manifestation:' + item)} {item === self.state.sortParams.column ? (self.state.sortParams.orderASC ? <i className="os-icon os-icon-arrow-up2"></i> : <i className="os-icon os-icon-arrow-down"></i>) : ''}</th>
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
                                        {t('manifestation:manifestationListTitle')}
                                    </h6>
                                    <div className="element-box-tp">
                                        <div className="controls-above-table">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <Link className="btn btn-sm btn-secondary" to="/manifestation/create">{t('addManifestation')}</Link>
                                                </div>
                                                <div className="col-sm-6">
                                                    <form className="form-inline justify-content-sm-end">
                                                        <input className="form-control form-control-sm rounded bright" placeholder={t('manifestation:searchAManifestation')} type="text" value={this.state.searchValue} onChange={this.search} />
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
                                                    <th>{t('manifestation:action')}</th>
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
                                                    previousLabel={t('manifestation:previousLabel')}
                                                    nextLabel={t('manifestation:nextLabel')}
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
