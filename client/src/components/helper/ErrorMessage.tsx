import * as React from "react";

export interface Props {
    validation: any;
}

export interface State {}

class ErrorMessage extends React.Component<Props, State> {
    render() {
        return !this.props.validation || this.props.validation.valid ? null :
        <div className="help-block form-text with-errors form-control-feedback">
            <ul className="list-unstyled">
                {
                    this.props.validation.errors.map((message, index) =>
                        <li key={index}>{ message }</li>
                    )
                }
            </ul>
        </div>
    }
}

export default ErrorMessage;
