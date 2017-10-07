import * as React from "react";
import {translate, Interpolate, Trans} from 'react-i18next';


@translate(['form'], {wait: true})
export default class CustomInputSelect extends React.Component<any, any> {
    validationFn;
    onChangeFn;

    constructor(props: any) {
        super();

        this.validationFn = props.validationFn;
        this.onChangeFn = props.onChangeFn;

        this.handleFn = this.handleFn.bind(this);
    }

    handleFn(event: any) {
        event.preventDefault();
        this.setState({
            isValid: this.validationFn ? this.validationFn(this.props.name, event.target.value) : true
        });
        if(this.onChangeFn){
            this.onChangeFn(event.target.value);
        }
    }



    render() {

        let optionListDOM = this.props.optionList.map(_option => {
            return (
                <option key={_option.value} value={_option.value}>
                    {_option.label}
                </option>
            )
        });
        return (
            <div className="form-group">
                <label>{this.props.label}</label>
                <select disabled={this.props.hasRight === false} className="form-control"
                        value={this.props.model}
                        onChange={this.handleFn}>

                    <option value=""></option>
                    {optionListDOM}
                </select>
            </div>
        );
    }
}