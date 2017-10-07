import * as React from "react";
import {translate, Interpolate, Trans} from 'react-i18next';
import {Link, browserHistory} from 'react-router';
import {ParagraphService} from "../../services/paragraph";
import $ from 'jquery';
declare var $: any;

import CKEditor from "react-ckeditor-component";

export interface TemplateEditProps {
	params: any;
}

@translate(['template'], {wait: true})
export class TemplateEdit extends React.Component<TemplateEditProps, any> {
	constructor(props: TemplateEditProps) {
		super(props);
		this.state = {
			level: 0,
			subLevel: 0,
			title: '',
			condition: '',
			editor: ''
		}
		ParagraphService.find({'paragraph_id': this.props.params.paragraph_id}).then(
			paragraph => {
				console.log(paragraph.data)
				this.setState({
					level: paragraph.data[0].level,
					subLevel: paragraph.data[0].subLevel,
					title: paragraph.data[0].title,
					condition: paragraph.data[0].condition,
					editor: paragraph.data[0].editor
				})
			}
		);
	}
	save(){
		let id = this.props.params.paragraph_id;
		let updateData = {
			group: this.props.params.group,
			version_id: this.props.params.version_id,
			level: this.state.level,
			subLevel: this.state.subLevel,
			title: this.state.title,
			condition: this.state.condition,
			editor: this.state.editor
		}
		ParagraphService.update(id, updateData).then(
			result => {
				browserHistory.push('/template');
			}
		);
	}
	render(){
		const levelOptions = ()=>{
			let items = [];         
			for (let i = 0; i <= 20; i++) {
				items.push(<option key={i} value={i} >{i}</option>);
			}
			return items;
		}
		return(
			<div className="content-w templateAdd">
				<div className="content-i">
					<div className="content-box">
						<div className="element-wrapper">
							<h6 className="element-header">
								Paragraph Add
							</h6>
							<div className="element-box">
								<form>
									<div className="row">
										<div className="col-sm-6">
											<div className="form-group">
												<label className="form-control-label">Level</label>
												<select className="form-control" value={this.state.level} onChange={(e)=>{this.setState({level: e.target.value})}}>
													{levelOptions()}
												</select>
											</div>
										</div>
										<div className="col-sm-6">
											<div className="form-group">
												<label className="form-control-label">Sub Level</label>
												<select className="form-control" value={this.state.subLevel} onChange={(e)=>{this.setState({subLevel: e.target.value})}}>
													{levelOptions()}
												</select>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-6">
											<div className="form-group">
												<label className="form-control-label">Title</label>
												<input className="form-control" type="text" value={this.state.title} onChange={(e)=>{this.setState({title: e.target.value})}}/>
											</div>
										</div>
										<div className="col-sm-6">
											<div className="form-group">
												<label className="form-control-label">Display Condition</label>
												<input className="form-control" type="text" value={this.state.condition} onChange={(e)=>{this.setState({condition: e.target.value})}}/>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-12">
											<div className="form-group">
												<label className="form-control-label">Text editor</label>
												<CKEditor activeClass="p10" content={this.state.editor} onChange={(val)=>{this.setState({editor: val})}} />
											</div>
										</div>
									</div>
									<div className="form-buttons-w">
										<Link to="/template"><button className="mr-2 mb-2 btn btn-white" type="button" >Cancel</button></Link>
										<button className="mr-2 mb-2 btn btn-primary" type="button" onClick={this.save.bind(this)}>Save</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}