import * as React from "react";
import {translate, Interpolate, Trans} from 'react-i18next';


@translate(['form'], {wait: true})
export default class CustomInputNumber extends React.Component<any, any> {
    validationFn;
    onChangeFn;

    constructor(props: any) {
        super();
        this.state = {
            isValid: this.validationFn ? this.validationFn(this.props.name, props.model) : true
        };
        this.validationFn = props.validationFn;
        this.onChangeFn = props.onChangeFn;

        this.handleFn = this.handleFn.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(this.validationFn){
            this.setState({
                isValid: this.validationFn ? this.validationFn(nextProps.name, nextProps.model) : true
            });
        }
    }

    handleFn(event: any) {
        event.preventDefault();
        this.setState({
            isValid: this.validationFn ? this.validationFn(this.props.name, event.target.value) : true
        });
        this.onChangeFn(event.target.value);
    }

    render() {
        return (
            <div className={"form-group " + (this.state.isValid ? "" : "has-error has-danger")}>
                <label>{this.props.label}</label>
                <input className="form-control" type="number" onChange={this.handleFn} value={this.props.model}/>
                {
                    this.state.isValid !== false ? <div></div>
                        :<div
                        className={"help-block form-text " + (this.state.isValid ? "" : "with-errors") + " form-control-feedback"}>
                        <ul className="list-unstyled">
                            <li>{this.props.errorLabel}</li>
                        </ul>
                    </div>
                }
            </div>
        );
    }
}