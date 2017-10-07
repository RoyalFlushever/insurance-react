import * as React from "react";
import Client from "../../classes/client"
import {translate, Interpolate, Trans} from 'react-i18next';
import i18n from '../../i18n';
import FontAwesome from "react-fontawesome";
import {findClients, countClients} from "../../services/client";
import axios from "axios";
import ReactPaginate from 'react-paginate';

export interface Props {
}

export interface State {
    clients: Client[],
    searchParams: any,
    rowCount : number,
    pageCount : number
}

@translate(['client', 'countries'], {wait: true})
export class ClientList extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            clients: [],
            searchParams: {
                offset: 0,
                limit: 2,
                sort: 'businessName',
                order: 'ASC',
            },
            rowCount : null,
            pageCount : null
        };
        axios.defaults.baseURL = '/api/client';
        this.setSearchParams = this.setSearchParams.bind(this);
        this.getSortClass = this.getSortClass.bind(this);
        this.setSort = this.setSort.bind(this);
        this.paginate = this.paginate.bind(this);
    }

    componentDidMount() {
        this.search();
    }

    setSearchParams(event, field){
        let searchParams = this.state.searchParams
        searchParams[field] = event.target.value
        if (["sort", "order", "search"].indexOf(field) > -1){
            searchParams.offset = 0;
        }
        this.setState({
            searchParams: searchParams
        });
        this.search();
    }

    search(){
        countClients(this.state.searchParams).then((resp) => {
            let totalRowCount = resp.data.count
            findClients(this.state.searchParams).then((resp) => {
                let limit = this.state.searchParams.limit
                this.setState({
                    pageCount: Math.ceil(totalRowCount / limit),
                    clients : resp.data,
                    rowCount : resp.data.length
                });
            });
        });

    }

    getSortClass(field){
        if (this.state.searchParams.sort == field){
            return this.state.searchParams.order == "DESC" ? "sorting_desc" : "sorting_asc";
        }else{
            return "sorting";
        }
    }

    setSort(event, field){
        let searchParams = this.state.searchParams
        if (this.state.searchParams.sort == field){
            searchParams.order = searchParams.order == "DESC" ? "ASC" : "DESC"
        }else{
            searchParams.order = "ASC"
            searchParams.sort = field
        }
        this.setState({
            searchParams : searchParams
        }, () => {
            this.search()
        })
    }

    paginate(event: any){
        let searchParams = this.state.searchParams;
        searchParams.offset = Math.ceil(event.selected * this.state.searchParams.limit);
        this.setState({
            searchParams: searchParams
        }, () => {
            this.search()
        })
    }

    render() {
        const {t} : any = this.props

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
                                        {t('client:clientList')}
                                    </h6>
                                    <div className="element-box-tp">
                                        <div className="controls-above-table">
                                            <div className="row">
                                                <div className="col-sm-4">
                                                    <a className="btn btn-sm btn-primary" href="/client/add">
                                                        <FontAwesome name="plus-square"/>&nbsp;&nbsp;Ajouter
                                                    </a>
                                                </div>
                                                <div className="col-sm-8">
                                                    <form className="form-inline justify-content-sm-end">
                                                        <input className="form-control form-control-sm rounded bright" placeholder={t("client:search")} type="text" value={this.state.searchParams.search} onChange={(e) => this.setSearchParams(e, "search")}/>
                                                        <select className="form-control form-control-sm rounded bright" value={this.state.searchParams.limit} onChange={(e) => this.setSearchParams(e, "limit")}>
                                                            <option value="2">2</option>
                                                            <option value="25">25</option>
                                                            <option value="50">50</option>
                                                            <option value="100">100</option>
                                                        </select>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-striped dataTable">
                                                <thead>
                                                <tr>
                                                    <th className={this.getSortClass('status')} onClick={(e) => this.setSort(e, "status")}>{t('common:status')}</th>
                                                    <th className={this.getSortClass('businessName')} onClick={(e) => this.setSort(e, "businessName")}>{t('common:businessName')}</th>
                                                    <th className={this.getSortClass('address')} onClick={(e) => this.setSort(e, "address")}>{t('common:address')}</th>
                                                    <th className={this.getSortClass('postalCode')} onClick={(e) => this.setSort(e, "postalCode")}>{t('common:postalCode')}</th>
                                                    <th className={this.getSortClass('city')} onClick={(e) => this.setSort(e, "city")}>{t('common:city')}</th>
                                                    <th className={this.getSortClass('phone')} onClick={(e) => this.setSort(e, "phone")}>{t('common:phone')}</th>
                                                    <th>{t('common:email')}</th>
                                                    <th>{t('common:actions')}</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    this.state.clients.map((client, index) =>
                                                        <tr key={index}>
                                                            <td>{client.businessStatus ? client.businessStatus.label : "-"}</td>
                                                            <td>{client.businessName}</td>
                                                            <td>{client.address}</td>
                                                            <td>{client.postalCode}</td>
                                                            <td>{client.city}</td>
                                                            <td>{client.phone ? client.phone : client.stdPhone}</td>
                                                            <td>{client.email}</td>
                                                            <td>
                                                                <a className="btn btn-secondary" href={"/client/edit/" + client.id}>
                                                                    <FontAwesome name="pencil-square-o"/>
                                                                </a>
                                                                &nbsp;
                                                                <a className="btn btn-secondary" href={"/client/view/" + client.id}>
                                                                    <FontAwesome name="eye"/>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                                </tbody>
                                           </table>
                                       </div>
                                        <div className="controls-below-table">
                                            <div className="table-records-info">
                                                {t("common:paginate-info")} {this.state.searchParams.offset + 1} - {this.state.searchParams.offset + this.state.rowCount }
                                            </div>
                                            <div className="table-records-pages" id="react-paginate">
                                                <ReactPaginate
                                                    previousLabel={t('common:paginate-previous')}
                                                    nextLabel={t('common:paginate-next')}
                                                    breakLabel={"..."}
                                                    activeClassName={"current"}
                                                    breakClassName={"break-me"}
                                                    pageCount={this.state.pageCount}
                                                    marginPagesDisplayed={2}
                                                    pageRangeDisplayed={5}
                                                    onPageChange={this.paginate}
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
