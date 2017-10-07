import * as React from "react";
import {translate, Interpolate, Trans} from 'react-i18next';


@translate(['form'], {wait: true})
export default class CustomInputRate extends React.Component<any, any> {
    validationFn;
    onChangeFn;

    constructor(props: any) {
        super();
        /*this.state = {
         name: props.name ,
         label: props.label,
         min: props.min ? props.min : 0,
         max: props.max ? props.max : 100,
         model: props.model ? + props.model + " %" : "0 %",
         isValid:  props.validationFn ? undefined : true,
         errorLabel: props.errorLabel,
         translationLabel: props.translationLabel
         };*/
        this.state = {
            model: props.model ? +props.model + " %" : "0 %",
            isValid: props.validationFn ? undefined : true,
            min: props.min ? props.min : 0,
            max: props.max ? props.max : 100,
        };
        this.validationFn = props.validationFn;
        this.onChangeFn = props.onChangeFn;

        this.handleFn = this.handleFn.bind(this);
        this.handleChangeFn = this.handleChangeFn.bind(this);
    }

    componentWillReceiveProps(nextProps) {
            this.setState({
                model: nextProps.model ? +nextProps.model + " %" : "0 %",
                isValid: this.validationFn ? this.validationFn(nextProps.name, nextProps.model) : true
            });
    }

    handleFn(event: any) {
        let value = event.target.value;
        let newValue = parseFloat(value.replace(/,/g, '.'));
        newValue = newValue < this.state.min ? this.state.min : newValue;
        newValue = newValue > this.state.max ? this.state.max : newValue;
        if (!newValue) {
            newValue = 0;
        }
        let displayValue = newValue + " %";
        event.preventDefault();
        this.setState({
            model: displayValue,
            isValid: this.validationFn ? this.validationFn(this.props.name, event.target.value) : true
        });
        this.onChangeFn(newValue);
    }

    handleChangeFn(event: any) {
        this.setState({
            model: event.target.value
        })
    }

    render() {
        return (
            <div>
                <label>{this.props.label}</label>
                <input className="form-control" type="text"
                       onBlur={this.handleFn}
                       onChange={this.handleChangeFn}
                       value={this.state.model}
                />
            </div>
        );
    }
}