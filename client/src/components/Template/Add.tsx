import * as React from "react";
import {translate, Interpolate, Trans} from 'react-i18next';
import {Link, browserHistory} from 'react-router';
import {ParagraphService} from "../../services/paragraph";
import $ from 'jquery';
declare var $: any;

import CKEditor from "react-ckeditor-component";

export interface TemplateAddProps {
	params: any;
}

@translate(['template'], {wait: true})
export class TemplateAdd extends React.Component<TemplateAddProps, any> {
	constructor(props: TemplateAddProps) {
		super(props);
		this.state = {
			level: 0,
			subLevel: 0,
			title: '',
			condition: '',
			editor: ''
		}
	}
	save(){
		let newData = {
			group: this.props.params.group,
			version_id: this.props.params.version_id,
			level: this.state.level,
			subLevel: this.state.subLevel,
			title: this.state.title,
			condition: this.state.condition,
			editor: this.state.editor
		}
		ParagraphService.insert(newData).then(
			paragraph => {
				if(paragraph.data.id){
					browserHistory.push('/template');
				}
			}
		);
	}
	render(){
		const levelOptions = ()=>{
			let items = [];         
			for (let i = 0; i <= 20; i++) {             
				items.push(<option key={i} value={i}>{i}</option>);
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
												<select className="form-control" onChange={(e)=>{this.setState({level: e.target.value})}}>
													{levelOptions()}
												</select>
											</div>
										</div>
										<div className="col-sm-6">
											<div className="form-group">
												<label className="form-control-label">Sub Level</label>
												<select className="form-control" onChange={(e)=>{this.setState({subLevel: e.target.value})}}>
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