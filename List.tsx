import * as React from "react";
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { translate, Interpolate, Trans } from 'react-i18next';
import i18n from '../../i18n';
import { Link } from 'react-router'
import {RolesService} from '../../services/role';

export interface UserListProps { }
export interface UserListState {
    searchValue: string,
    filterValue: string,
    roleValue: string,
    rowCount: number,
    totalRowCount: number,
    offset: number,
    sortParams: any,
    pageCount: number,
    userList: Array<any>
}

@translate(['user'], { wait: true })
export class UserList extends React.Component<UserListProps, UserListState> {
    public columns: Array<string>;
    public state: any;
    
    constructor(props: UserListProps) {
        super(props);
        axios.defaults.baseURL = '/api/users';
        this.columns = [
                        'firstName',
                        'lastName',
                        'email',
                        'phone',
                        'role'
                        ];
        this.state = {
            searchValue: '',
            filterValue: '',
            roleValue:'',
            rowCount: 10,
            totalRowCount: 10,
            offset: 0,
            sortParams: {
                column: 'lastName',
                orderASC: true
            },
            pageCount: 0,
            userList: []
        };

        this.search = this.search.bind(this);
        this.filter = this.filter.bind(this);
        this.handleRowCount = this.handleRowCount.bind(this);
        this.setSortParams = this.setSortParams.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser= this.deleteUser.bind(this);
        this.loadDataFromServer = this.loadDataFromServer.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleRole = this.handleRole.bind(this);
    }

    editUser(id: number, event: any) {
        event.preventDefault();
    }



    deleteUser(id: number, event: any) {
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

    filter(event: any) {
        event.preventDefault();
        this.setState({filterValue: event.target.value}, () => {
            this.loadDataFromServer();
        });
    }

    handleRowCount(event: any) {
        this.setState({rowCount: event.target.value}, () => {
            this.loadDataFromServer();
        });
    }

    handleRole(event: any) {
        event.preventDefault();
        this.setState({roleValue: event.target.value}, () => {
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
        if (['firstName', 'lastName', 'email', 'phone','role'].indexOf(sortColumn) > -1) {
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
            filter: this.state.filterValue,
            role: this.state.roleValue,
            offset: this.state.offset,
            limit: this.state.rowCount
        };
        axios.get('/count', {params: {params}}).then((resp) => {
            let totalRowCount = resp.data.count
            
            axios.get('', {params: params}).then((resp) => {
                let rowCount = this.state.rowCount
                this.setState({
                    pageCount: Math.ceil(totalRowCount / rowCount),
                    userList: resp.data
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
        const roleListDOM = this.state.userList.map((user) =>
        <option key={user.role.id} value={user.role.label}>{user.role.label}</option>
        );
        let userList = this.state.userList.map(user => {
            let deleteButton = self.deleteUser.bind(this, user.id);
            return (

                <tr key={user.id}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.role.label}</td>
                    <td className="row-actions">
                      <Link to={"/user/edit/" + user.id}><i className="os-icon os-icon-pencil-2"></i></Link>
                      {
                            <a onClick={deleteButton} href=""><i className="os-icon os-icon-ui-15"></i></a>
                      }
                </td>
                </tr>
            )
        })

        // the first elem is the database name
        // the second elem is the title to display
        let tableHeader = this.columns.map((item, i) => {
            let boundItemClick = self.setSortParams.bind(this, item);
            return (
                <th key={i} onClick={boundItemClick}>{t('user:' + item)} {item === self.state.sortParams.column ? (self.state.sortParams.orderASC ? <i className="os-icon os-icon-arrow-up2"></i> : <i className="os-icon os-icon-arrow-down"></i>) : ''}</th>
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
                          {t('user:userPageTitle')}
                        </h6>
                        <div className="element-box-tp">
                          <div className="controls-above-table">
                            <div className="row">
                              <div className="col-sm-6">
                                <Link className="btn btn-sm btn-secondary" to="/user/create">{t('addUser')}</Link>
{/*
                                {t('hideDisabledBusinessProviderList')} <input type="checkbox" name="" value="" onChange={this.handleHideDisabledBusinessProviderList} checked={this.state.hideDisabledBusinessProviderList}/>
*/}
                              </div>
                              <div className="col-sm-6">
                                <form className="form-inline justify-content-sm-end">
                                  <input className="form-control form-control-sm rounded bright" placeholder={t('user:searchUser')} type="text" value={this.state.searchValue} onChange={this.search} />
                                  <input className="form-control form-control-sm rounded bright" placeholder={t('user:filterRole')} type="text" value={this.state.filterValue} onChange={this.filter} />
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
                                  {tableHeader}
                                  <th>{t('user:action')}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {userList}
                              </tbody>
                            </table>
                          </div>
                          <div className="controls-below-table">
                            <div className="table-records-info">
                              Showing records {this.state.offset} - {this.state.offset + this.state.rowCount}
                            </div>
                            <div className="table-records-pages" id="react-paginate">
                                <ReactPaginate
                                   previousLabel={t('user:previousLabel')}
                                   nextLabel={t('user:nextLabel')}
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
