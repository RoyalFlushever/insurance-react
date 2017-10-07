import * as React from "react";

// import DatePicker from "react-bootstrap-date-picker"; //https://github.com/pushtell/react-bootstrap-date-picker#api-reference
import DatePicker from "../../../lib/ReactBootstrapDatePicker";
import { ControlLabel, FormGroup, HelpBlock } from "react-bootstrap"


const AsInlneText = ({value, formattedValue, handleChangeMode, ...props}) => {
  // console.log('DateComponent AsInlineText: ', value, formattedValue);
  const opts = {};
  if (handleChangeMode && typeof handleChangeMode === "function"){
    opts["onClick"] = handleChangeMode;
  }
  let classNames = ["input-sm"];
  if (!props.minDate || !props.maxDate || value<props.minDate || value>props.maxDate) classNames.push("text-danger");
  // console.log('DateComponent asInlineText: ', {value, minDate: props.minDate, maxDate: props.maxDate, classNames});
  return (
    <div className={classNames.join(" ")} {...opts}>{value?formattedValue:"..."}</div>
  );
}


export class DateGenerator extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value && props.value.value ? props.value.value : "",
      label: props.label || "Select date",
      formattedValue: props.value && props.value.formattedValue ? props.value.formattedValue : "",
    }
  }

  componentWillReceiveProps(nextProps) {
    const data = {
      value: nextProps.value,
      formattedValue: nextProps.formattedValue,
    };
    this.setState(data);
  }

  handleChange = (value, formattedValue) => {
    const data = {
      value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
      formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
    };
    this.setState(data);
    this.props.handleChange(data);
  }

  componentDidUpdate() {
    // Access ISO String and formatted values from the DOM.
    // var hiddenInputElement = document.getElementById("example-datepicker");
    // console.log(hiddenInputElement.value); // ISO String, ex: "2016-11-19T12:00:00.000Z"
    // console.log(hiddenInputElement.getAttribute('data-formattedvalue')) // Formatted String, ex: "11/19/2016"
  }

  render() {
    const opts = {};
    if (this.props.minDate) opts['minDate'] = this.props.minDate;
    if (this.props.maxDate) opts['maxDate'] = this.props.maxDate;
    if (this.props.fieldKey) opts['fieldKey'] = this.props.fieldKey;
    let classNames = ["form-group"];
    if (this.props.required && (!this.state.value)) classNames.push("has-danger");
    return (
      <FormGroup className={classNames.join(" ")}>
        <ControlLabel>{this.props.label}</ControlLabel>
        <DatePicker
          dayLabels={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
          monthLabels={['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
          calendarPlacement="bottom"
          weekStartsOn={1}
          dateFormat="DD.MM.YYYY"
          value={this.state.value}
          formattedValue={this.state.formattedValue}
          onChange={this.handleChange}
          clearButtonElement={<span className="fa fa-calendar"></span>}
          onClear={()=>false}
          {...opts}
        />
      </FormGroup>
    )
  }
}


class AsInlneEdit extends DateGenerator {
  render() {
    const opts = {};
    if (this.props.minDate) opts['minDate'] = this.props.minDate;
    if (this.props.maxDate) opts['maxDate'] = this.props.maxDate;
    if (this.props.fieldKey) opts['fieldKey'] = this.props.fieldKey;
    if (this.props.handleChangeMode && typeof this.props.handleChangeMode === "function"){
      opts["onBlur"] = () => {
        this.props.handleChangeMode();
      }
    }
    return (
        <DatePicker
          autoFocus
          dayLabels={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
          monthLabels={['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
          calendarPlacement="bottom"
          weekStartsOn={1}
          dateFormat="DD.MM.YYYY"
          value={this.state.value}
          onChange={this.handleChange}
          style={{minWidth: "120px"}}
          clearButtonElement={<span className="fa fa-calendar"></span>}
          onClear={()=>false}
          {...opts}
        />
    )
  }
}


class AsInlneCreate extends DateGenerator {
  render() {
    const opts = {};
    if (this.props.minDate) opts['minDate'] = this.props.minDate;
    if (this.props.maxDate) opts['maxDate'] = this.props.maxDate;
    if (this.props.fieldKey) opts['fieldKey'] = this.props.fieldKey;
    if (this.props.handleChangeMode && typeof this.props.handleChangeMode === "function"){
      opts["onBlur"] = () => {
        this.props.handleChangeMode();
      }
    }
    return (
        <DatePicker
          dayLabels={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
          monthLabels={['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
          calendarPlacement="bottom"
          weekStartsOn={1}
          dateFormat="DD.MM.YYYY"
          value={this.state.value}
          onChange={this.handleChange}
          clearButtonElement={<span className="fa fa-calendar"></span>}
          onClear={()=>false}
          {...opts}
        />
    )
  }
}



const DateComponent = ({label, value, handleChange, ...props}) => {
  const dateValue = typeof value === "string" || !value ? value : value['value'];
  const modeDefined = props.mode !== undefined;
  if (modeDefined && props.mode === "inlineText") {
    return AsInlneText({handleChangeMode: props.handleChangeMode, ...value, ...props});
  } else if (modeDefined && props.mode === "inlineEdit") {
    return <AsInlneEdit label={label} value={dateValue} handleChange={handleChange()} {...props} />;
  } else if (modeDefined && props.mode === "inlineCreate") {
    return <AsInlneCreate label={label} value={dateValue} handleChange={handleChange()} {...props} />;
  } else {
    return <DateGenerator label={label} value={dateValue} handleChange={handleChange} {...props} />;
  }
}


export default DateComponent;
