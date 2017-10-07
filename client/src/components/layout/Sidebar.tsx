import * as React from "react";
import {translate, Interpolate, Trans} from 'react-i18next';
import i18n from '../../i18n';
import {Link } from 'react-router'
import axios from 'axios';

export interface SideBarState {
	user: any
}

export interface SidebarProps {
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
@translate([], {wait: true})
export class Sidebar extends React.Component<SidebarProps, SideBarState> {
	constructor(props: SideBarState) {
		super(props);
		this.state = {
			user: {
				email: 'Utilisateur'
			}
		};
		axios.get('/api/users/me').then(resp => {
			this.setState({
				user: resp.data
			})
		});
	}

	hasRight(rightLabel) {
		if (this.state.user && this.state.user.role) {
			let rightList = this.state.user.role.rightList;
			let found = false;
			rightList.forEach(function (_right) {
				if (rightLabel == _right.label) {
					found = true;
				}
			});
			return found;
		} else {
			return false;
		}
	}

	logOut(){
		axios({
			method: 'post',
			url: 'api/user/logout',
			baseURL: '/'
		})
		.then(resp => {
			window.location.pathname = '/login'
		});
	}

	render() {
		const {t} : any = this.props;
		return (
			<div className="desktop-menu menu-side-w menu-activated-on-click">
				<div className="logo-w">
					<a className="logo" href="#">
						<span>Ovatio</span></a>
				</div>
				<div className="menu-and-user">
					<div className="logged-user-w">
						<div className="logged-user-i">
							{/*                    <div className="avatar-w">
							 /!*<img alt="" src="img/avatar1.jpg"/>*!/
							 </div>*/}
							<div className="logged-user-info-w">
								<div className="logged-user-name">
									{ this.state.user ? this.state.user!.email : ''} <span onClick={() => this.logOut()} style={{fontSize : "small", color: "grey", fontStyle: "italic"}}>({t('common:logout')})</span>
								</div>

							</div>
						</div>
					</div>

					<ul className="main-menu">
						{
							this.hasRight('GET_USER_LIST') ?
								<li className="">
									<Link to="/user">
										<div className="icon-w">
											<div className="os-icon os-icon-window-content"></div>
										</div>
										<span>{t('common:userTab')}</span>
									</Link>
								</li> :
								<li className="">
									<Link to={`/user/edit/` + this.state.user.id }>
										<div className="icon-w">
											<div className="os-icon os-icon-window-content"></div>
										</div>
										<span>{t('common:myProfile')}</span>
									</Link>
								</li>
						}
						{
							this.hasRight('GET_COMPANY_LIST')?
								<li className="">
									<Link to="/assureur">
										<div className="icon-w">
											<div className="os-icon os-icon-window-content"></div>
										</div>
										<span>{t('common:assureurTab')}</span>
									</Link>
								</li> : null
						}
						{
							<li className="">
								<Link to="/businessProvider">
									<div className="icon-w">
										<div className="os-icon os-icon-window-content"></div>
									</div>
									<span>{t('common:businessProviderTab')}</span>
								</Link>
							</li>
						}
						{
							this.hasRight('GET_EXPERT_LIST')?
								<li className="">
									<Link to="/expert">
										<div className="icon-w">
											<div className="os-icon os-icon-window-content"></div>
										</div>
										<span>{t('common:expertTab')}</span>
									</Link>
								</li> : null
						}
						{
							this.hasRight('GET_CLIENT_LIST')?
								<li className="">
								<Link to="/client">
									<div className="icon-w">
										<div className="os-icon os-icon-window-content"></div>
									</div>
									<span>{t('common:clientTab')}</span>
								</Link>
							</li> : null
						}
						{
							<li className="">
								<Link to="/manifestation">
									<div className="icon-w">
										<div className="os-icon os-icon-window-content"></div>
									</div>
									<span>{t('common:manifestationTab')}</span>
								</Link>
							</li>
						}
						{
							<li className="">
								<Link to="/template">
									<div className="icon-w">
										<div className="os-icon os-icon-window-content"></div>
									</div>
									<span>{t('common:template')}</span>
								</Link>
							</li>
						}
					</ul>
				</div>
			</div>
		);
	}
}

export default Sidebar;
