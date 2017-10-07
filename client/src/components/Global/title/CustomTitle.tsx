import * as React from "react";
import {translate, Interpolate, Trans} from 'react-i18next';


@translate(['form'], {wait: true})
export default class CustomTitle extends React.Component<any, any> {

    constructor(props: any) {
        super();
        this.state = {
            label: props.label,
        };
    }

    render() {
        return (
            <fieldset className="form-group">
                <legend><span>{this.state.label}</span>
                </legend>
            </fieldset>
        );
    }
}