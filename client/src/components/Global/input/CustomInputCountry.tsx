import * as React from "react";
import {translate, Interpolate, Trans} from 'react-i18next';


@translate(['form'], {wait: true})
export default class CustomInputCountry extends React.Component<any, any> {
    validationFn;
    onChangeFn;

    constructor(props: any) {
        super();
/*        this.state = {
            name: props.name,
            label: props.label,
            model: props.model,
            isValid:  props.validationFn ? undefined : true,
            errorLabel: props.errorLabel,
            translationLabel: props.translationLabel
        };*/
        this.state = {
            isValid:  props.validationFn ? undefined : true,
        };
        this.validationFn = props.validationFn;
        this.onChangeFn = props.onChangeFn;

        this.handleFn = this.handleFn.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(this.validationFn){
            this.setState({
                isValid: this.validationFn(nextProps.name, nextProps.model)
            });
        }
    }

    handleFn(event: any) {
        event.preventDefault();
        if(this.validationFn){
            this.setState({
                isValid: this.validationFn(this.props.name, event.target.value)
            });
        }
        if( this.onChangeFn){
            this.onChangeFn(event.target.value);
        }
    }

    render() {
        return (
            <div className={"form-group " + (this.state.isValid ? "" : "has-error has-danger")}>
                <label>{this.props.label}</label>
                <input className="form-control" type="text" onChange={this.handleFn} value={this.props.model}/>
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