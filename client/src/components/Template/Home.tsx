import * as React from "react";
import ReactPaginate from 'react-paginate';
import {translate, Interpolate, Trans} from 'react-i18next';
import i18n from '../../i18n';
import {Link, browserHistory} from 'react-router';
import {RolesService} from '../../services/role';
import {AssureurService} from "../../services/assureur";
import {VersionService} from "../../services/version";
import {ParagraphService} from "../../services/paragraph";
import $ from 'jquery';
declare var $: any;

export interface TemplateHomeProps {
	params: any;
}

type FormObject = {value: string, valid: boolean}

@translate(['template'], {wait: true})
export class TemplateHome extends React.Component<TemplateHomeProps, any> {


	constructor(props: TemplateHomeProps) {
		super(props);
		this.state = {
			insurances: [],
			versions: [],
			paragraphs: [],
			activeInsurance: 0,
			activeVersion: 0,
			versionsForOption: [],
			newVersionFrom: 0,
			newVersionLabel: '',
			newVersionActivation: '2017-07-01',
			editVersionLabel: '',
			editVersionActivation: ''
		};
		AssureurService.find().then(
			insurances => {
				this.setState({
					insurances: insurances.data
				});
				
				let insurance_id = insurances.data[this.state.activeInsurance]['id'];
				this._retriveVersion(insurance_id);
			}
		);
	}
	_retriveVersion(insurance_id){
		VersionService.find({'insurance_id': insurance_id}).then(
			versions => {
				this.setState({
					versions: versions.data
				});
				let version_id = versions.data[this.state.activeVersion]['id'];
				this._retriveParagraph(version_id);
			}
		);
	}
	_retriveParagraph(version_id){
		ParagraphService.find({'version_id': version_id}).then(
			paragraphs => {
				this.setState({
					paragraphs: paragraphs.data
				});
			}
		);
	}
	insertNewVersion(){
		let newData = {
			insurance_id: this.state.insurances[this.state.activeInsurance]['id'],
			label: this.state.newVersionLabel,
			activation: this.state.newVersionActivation,
		}
		let from_version_id = parseInt(this.state.newVersionFrom);
		VersionService.insert(newData).then(
			newVersions => {
				if(newVersions.data.id){
					ParagraphService.find({'version_id': from_version_id}).then(
						paragraphs => {
							paragraphs.data.map((paragraph, index)=>{
								let new_paragraphData={
									group: paragraph.group,
									version_id: newVersions.data.id,
									level: paragraph.level,
									subLevel: paragraph.subLevel,
									title: paragraph.title,
									condition: paragraph.condition,
									editor: paragraph.editor
								}
								ParagraphService.insert(new_paragraphData).then(
									paragraph => {}
								);
							});
						}
					);
					let insurance_id = this.state.insurances[this.state.activeInsurance]['id'];
					this._retriveVersion(insurance_id);
				}
			}
		);
		this.setState({newVersionLabel: ''});
		$("button[data-dismiss='modal']").trigger('click');
	}
	changeCompany(index){
		this.setState({activeInsurance: index});
		this.setState({activeVersion: 0});
		let insurance_id = this.state.insurances[index]['id'];
		this._retriveVersion(insurance_id);
	}
	changeVersion(index){
		this.setState({activeVersion: index});
		let version_id = this.state.versions[index]['id'];
		this._retriveParagraph(version_id);
	}
	openEditModal(){
		$('#editVersionModal').modal('show');
		let tempLabel = this.state.versions[this.state.activeVersion]['label'];
		let tempActivation = this.state.versions[this.state.activeVersion]['activation'];
		$('#edit_version_label').val(tempLabel);
		$('#edit_version_activation').val(tempActivation);
		this.setState({editVersionLabel: tempLabel});
		this.setState({editVersionActivation: tempActivation});
	}
	updateVersion(){
		let label = this.state.editVersionLabel;
		let activation = this.state.editVersionActivation;
		let id = this.state.versions[this.state.activeVersion]['id'];
		let updatedData = {
			label: label,
			activation: activation
		}
		VersionService.update(id, updatedData).then(
			result => {
				if(result.data[0] == 1){
					let insurance_id = this.state.insurances[this.state.activeInsurance]['id'];
					this._retriveVersion(insurance_id);
				}
			}
		);
		$('#editVersionModal').modal('hide');
	}
	deleteVersion(){
		let id = this.state.versions[this.state.activeVersion]['id'];
		this.setState({activeVersion: 0});
		VersionService.delete(id).then(
			() => {
				let insurance_id = this.state.insurances[this.state.activeInsurance]['id'];
				this._retriveVersion(insurance_id);
			}
		);
		$('#deleteVersionModal').modal('hide');
	}
	addParagraph(e, group){
		e.preventDefault();
		let addUrl = `/template/add/${group}/${this.state.versions[this.state.activeVersion]['id']}`;
		browserHistory.push(addUrl);
	}
	deleteParagraph(id){
		ParagraphService.delete(id).then(
			() => {
				let insurance_id = this.state.insurances[this.state.activeInsurance]['id'];
				this._retriveVersion(insurance_id);
			}
		);
	}
	changeInsuranceForOptions(insurance_id){
		VersionService.find({'insurance_id': insurance_id}).then(
			versions => {
				this.setState({versionsForOption: versions.data});
			}
		);
		this.setState({newVersionFrom: 0});
	}
	render() {
		const insurance_options = ()=>{
			let items = [];
			items.push(<option key="0" value="0"> -- select a company -- </option>)
			this.state.insurances.map((company, index) => {
				items.push(<option key={index+1} value={company.id}>{company.businessName}</option>);
			});
			return items;
		}
		const version_options = ()=>{
			let items = [];
			items.push(<option key="0" value="0"> -- select a version -- </option>);
			this.state.versionsForOption.map((version, index) => {
				items.push(<option key={index+1} value={version.id}>{version.label}</option>);
			});
			return items;
		}
		var companiesDOM = this.state.insurances.map((company, index) => {
			return (
				<li key={index} className={"company_lists " + (this.state.activeInsurance == index ? 'active' : '')}  onClick={ ()=>{this.changeCompany(index)} }>
					<div><i className="os-icon os-icon-phone-21"></i><span>{company.businessName}</span></div>
				</li>
			)
		});
		var versionsDOM = this.state.versions.map((version, index)=>{
			return (
				<li key={index} className={"version_lists " + (this.state.activeVersion == index ? 'active' : '')} onClick={ ()=>{this.changeVersion(index);} }>
					<div>
						<span>{version.label}</span>
						{/*<div className="btn-group">
							<button aria-expanded="false" aria-haspopup="true" className="btn btn-white dropdown-toggle btn-sm" data-toggle="dropdown" id={"dropdownMenuButton"+index} type="button"><i className="icon-options"></i></button>
							<div aria-labelledby={"dropdownMenuButton"+index} className="dropdown-menu">
								<a className="dropdown-item" href="#"> Action</a>
								<a className="dropdown-item" href="#"> Another action</a>
								<a className="dropdown-item" href="#"> Something else here</a>
							</div>
						</div>*/}
					</div>
					<div className="version_timestamp">Active since  {version.activation}</div>
				</li>
			)
		});
		const table = (group)=>{
			return(
				<div className="message-content">
					<div className="table-responsive">
						<table className="table table-bordered table-v2 table-striped">
							<thead>
								<tr>
									<th>Level</th>
									<th>SubLevel</th>
									<th>Title</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
							{
								this.state.paragraphs.map((paragraph, index)=>{
									if(group == paragraph.group){
										return(
											<tr key={index}>
												<td>{paragraph.level}</td>
												<td>{paragraph.subLevel}</td>
												<td>{paragraph.title}</td>
												<td className="row-actions">
													<Link to={"/template/edit/" + paragraph.id} ><i className="os-icon os-icon-pencil-2"></i></Link>
													<a href="#" onClick={()=>{this.deleteParagraph(paragraph.id);}}><i className="os-icon os-icon-ui-15"></i></a>
												</td>
											</tr>
										);
									}
								})
							}
								
							</tbody>
						</table>
					</div>
				</div>
			)
		}
		const pdfListDOM = ()=>{
			return(
				<div className="pdf_list_dom">
					<div className="aec-full-message-w">
						<div className="aec-full-message">
							<div className="message-head">
								<div className="user-w with-status status-green">
									<div className="user-name">
										<h6 className="user-title">
											Projet
										</h6>
									</div>
								</div>
							</div>
							<div className="add_lock">
								<a href="" className="btn btn-sm btn-primary" onClick={(e)=>{this.addParagraph(e, 0)}}><i className="os-icon os-icon-ui-22"></i><span>Add</span></a>
								<a href="#"><i className="fa fa-unlock"></i></a>
							</div>
							{table(0)}
						</div>
					</div>
					<div className="aec-full-message-w">
						<div className="aec-full-message">
							<div className="message-head">
								<div className="user-w with-status status-green">
									<div className="user-name">
										<h6 className="user-title">
											Contrat
										</h6>
									</div>
								</div>
							</div>
							<div className="add_lock">
								<a href="" className="btn btn-sm btn-primary" onClick={(e)=>{this.addParagraph(e, 1)}}><i className="os-icon os-icon-ui-22"></i><span>Add</span></a>
								<a href="#"><i className="fa fa-unlock"></i></a>
							</div>
							{table(1)}
						</div>
					</div>
					<div className="aec-full-message-w">
						<div className="aec-full-message">
							<div className="message-head">
								<div className="user-w with-status status-green">
									<div className="user-name">
										<h6 className="user-title">
											Attestation
										</h6>
									</div>
								</div>
							</div>
							<div className="add_lock">
								<a href="" className="btn btn-sm btn-primary" onClick={(e)=>{this.addParagraph(e, 2)}}><i className="os-icon os-icon-ui-22"></i><span>Add</span></a>
								<a href="#"><i className="fa fa-unlock"></i></a>
							</div>
							{table(2)}
						</div>
					</div>
				</div>
		)}
		const Manifestation = ()=>{
			return(
				<div className="app-email-w forse-show-content">
					<div className="app-email-i">
						<div className="ae-side-menu">
							<ul className="ae-main-menu">
								{companiesDOM}
							</ul>
						</div>
						<div className="ae-side-menu">
							<div className="list_create_btn">
								{/*<a href="" data-target="#newVersionModal" data-toggle="modal"><i className="os-icon os-icon-common-03"></i><span>Create new version</span></a>*/}
								<a href="#" className="btn btn-sm btn-outline-primary" data-target="#newVersionModal" data-toggle="modal"><i className="os-icon os-icon-ui-22"></i><span>Add</span></a>
								<a href="#" className="btn btn-sm btn-outline-info" onClick={this.openEditModal.bind(this)}><i className="os-icon os-icon-edit-1"></i><span>Edit</span></a>
								<a href="#" className="btn btn-sm btn-outline-danger"  data-target="#deleteVersionModal" data-toggle="modal"><i className="os-icon os-icon-ui-15"></i><span>Delete</span></a>
							</div>
							<ul className="ae-main-menu">
								{versionsDOM}
							</ul>
							
						</div>
						<div className="ae-content-w">
							<div className="ae-content">
								{pdfListDOM()}
							</div>
						</div>
					</div>
				</div>
		)}
		return (
			<div className="content-w template">
				<div className="content-i">
					<div className="content-box">
						<div className="os-tabs-w">
							
							<ul className="nav nav-tabs nav-fill custom_tab_ctrl">
								<li className="nav-item">
									<a aria-expanded="true" className="nav-link active" data-toggle="tab" href="#manifestation">Manifestation</a>
								</li>
								<li className="nav-item">
									<a aria-expanded="false" className="nav-link" data-toggle="tab" href="#media">Media</a>
								</li>
								<li className="nav-item">
									<a aria-expanded="false" className="nav-link" data-toggle="tab" href="#rc_event">RC event</a>
								</li>
								<li className="nav-item">
									<a aria-expanded="false" className="nav-link" data-toggle="tab" href="#salon">Salon</a>
								</li>
								<li className="nav-item">
									<a aria-expanded="false" className="nav-link" data-toggle="tab" href="#police">Police cadre Salon</a>
								</li>
								<li className="nav-item">
									<a aria-expanded="false" className="nav-link" data-toggle="tab" href="#tous">Tous risques Materiels</a>
								</li>
							</ul>
							<div className="tab-content">
								<div className="tab-pane active" id="manifestation" role="tabpanel"><Manifestation/></div>
								<div className="tab-pane" id="media" role="tabpanel">Media</div>
								<div className="tab-pane" id="rc_event" role="tabpanel">RC event</div>
								<div className="tab-pane" id="salon" role="tabpanel">Salon</div>
								<div className="tab-pane" id="police" role="tabpanel">Police cadre Salon</div>
								<div className="tab-pane" id="tous" role="tabpanel">Tous risques Materiels</div>
							</div>
						</div>
					</div>
				</div>
						<div aria-hidden="true" aria-labelledby="versionModalLabel" className="modal fade" id="newVersionModal" role="dialog">
							<div className="modal-dialog" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="versionModalLabel">
											Create new version
										</h5>
										<button aria-label="Close" className="close" data-dismiss="modal" type="button"><span aria-hidden="true"> &times;</span></button>
									</div>
									<div className="modal-body">
										<form>
											<div className="form-group row">
												<label htmlFor="" className="col-form-label col-sm-4"> Label</label>
												<div className="col-sm-8">
													<input className="form-control" placeholder="Enter version name" type="text" value={this.state.newVersionLabel} onChange={ (e)=>{this.setState({newVersionLabel: e.target.value});} }/>
												</div>
											</div>
											<div className="form-group row">
												<label htmlFor="" className="col-form-label col-sm-4"> Activation date</label>
												<div className="col-sm-8">
													<input className="single-daterange form-control" placeholder="Enter Activation Date" type="date" value={this.state.newVersionActivation} onChange={ (e)=>{this.setState({newVersionActivation: e.target.value});} }/>
												</div>
											</div>
											<div className="form-group row">
												<label className="col-form-label col-sm-4" htmlFor=""> For</label>
												<div className="col-sm-8">
													<select className="form-control"  onChange={(e)=>{this.changeInsuranceForOptions(e.target.value);}}>
														{insurance_options()}
													</select>
												</div>
											</div>
											<div className="form-group row">
												<label className="col-form-label col-sm-4" htmlFor=""> From</label>
												<div className="col-sm-8">
													<select className="form-control" onChange={(e)=>{this.setState({newVersionFrom: e.target.value});}}>
														{version_options()}
													</select>
												</div>
											</div>
										</form>
									</div>
									<div className="modal-footer">
										<button className="btn btn-secondary" data-dismiss="modal" type="button"> Close</button>
										<button className="btn btn-primary" type="button" onClick={this.insertNewVersion.bind(this)} > Save</button>
									</div>
								</div>
							</div>
						</div>
						<div aria-hidden="true" aria-labelledby="editversionModalLabel" className="modal fade" id="editVersionModal" role="dialog">
							<div className="modal-dialog" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="editversionModalLabel">
											Edit version
										</h5>
										<button aria-label="Close" className="close" data-dismiss="modal" type="button"><span aria-hidden="true"> &times;</span></button>
									</div>
									<div className="modal-body">
										<form>
											<div className="form-group row">
												<label htmlFor="" className="col-form-label col-sm-4"> Label</label>
												<div className="col-sm-8">
													<input className="form-control" id="edit_version_label" placeholder="Enter company name" type="text" onChange={ (e)=>{this.setState({editVersionLabel: e.target.value});} }/>
												</div>
											</div>
											<div className="form-group row">
												<label htmlFor="" className="col-form-label col-sm-4"> Activation date</label>
												<div className="col-sm-8">
													<input className="single-daterange form-control" id="edit_version_activation" placeholder="Enter Activation Date" type="date" onChange={ (e)=>{this.setState({editVersionActivation: e.target.value});} }/>
												</div>
											</div>
										</form>
									</div>
									<div className="modal-footer">
										<button className="btn btn-secondary" data-dismiss="modal" type="button"> Close</button>
										<button className="btn btn-primary" type="button" onClick={this.updateVersion.bind(this)} > Update</button>
									</div>
								</div>
							</div>
						</div>
						<div aria-hidden="true" aria-labelledby="deleteVersionModalLabel" className="modal fade" id="deleteVersionModal" role="dialog">
							<div className="modal-dialog" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="deleteVersionModalLabel">
											Are you sure?
										</h5>
										<button aria-label="Close" className="close" data-dismiss="modal" type="button"><span aria-hidden="true"> &times;</span></button>
									</div>
									<div className="modal-body">
										<p>Do you want to delete this version?</p>
									</div>
									<div className="modal-footer">
										<button className="btn btn-secondary" data-dismiss="modal" type="button"> Close</button>
										<button className="btn btn-danger" type="button" onClick={this.deleteVersion.bind(this)} > Delete</button>
									</div>
								</div>
							</div>
						</div>
			</div>
		);
	}
}
