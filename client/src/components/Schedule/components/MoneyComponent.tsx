import * as React from "react";


const AsInlneText = ({value, handleChangeMode, ...props}) => {
  const opts = {};
  if (handleChangeMode && typeof handleChangeMode === "function"){
    opts["onClick"] = handleChangeMode;
  }
  return (
    <div
      className="input-sm"
      style={{textAlign: "right"}}
      {...opts}
    >&euro;&nbsp;{value?value:"..."}</div>
  );
}


const pattern = /\D/g;
const validate = (handleChange) => (e) => {
  const value = e.target.value || "";
  handleChange(value.replace(pattern, ''));
}


// has-error has-danger
export const MoneyGenerator = ({label, value, handleChange, ...props}) => {

  const opts = {};
  if (props.readOnly) opts['readOnly'] = 'readOnly';

  return (
    <div className="form-group ">
      <label>{label}</label>
      <div className="input-group">
        <span className="input-group-addon">&euro;</span>
        <input
          type="text"
          className="form-control text-right"
          value={value}
          onChange={validate(handleChange)}
          {...opts}
        />
      </div>
    </div>
  );
}

const AsInlneEdit = ({value, handleChange, handleChangeMode, ...props}) => {
  const opts = {};
  if (handleChangeMode && typeof handleChangeMode === "function" && !props.noInlineText){
    opts["onBlur"] = handleChangeMode;
  }

  return (
    <div className="input-group">
      <span className="input-group-addon">&euro;</span>
      <input
        autoFocus
        type="text"
        style={{minWidth: "75px"}}
        className="form-control text-right input"
        value={value}
        onChange={validate(handleChange)}
        {...opts}
      />
    </div>
  );
}


const AsInlneCreate = ({value, handleChange, ...props}) => {

  return (
    <div className="input-group">
      <span className="input-group-addon">&euro;</span>
      <input
        type="text"
        className="form-control text-right input-sm"
        value={value}
        onChange={validate(handleChange)}
      />
    </div>
  );
}

//
// export const MoneyGenerator = ({label, value, handleChange, ...props}) => (
//   <MoneyComponent label={label} value={value} handleChange={handleChange} {...props}/>
// );

const MoneyComponent = ({label, value, handleChange, ...props}) => {
  const modeDefined = props.mode !== undefined;
  if (modeDefined && props.mode === "inlineText") {
    return AsInlneText({value, handleChangeMode: props.handleChangeMode});
  } else if (modeDefined && props.mode === "inlineEdit") {
    return AsInlneEdit({value, handleChange: handleChange(), handleChangeMode: props.handleChangeMode, ...props});
  } else if (modeDefined && props.mode === "inlineCreate") {
    return AsInlneCreate({value, handleChange: handleChange()});
  } else {
    return MoneyGenerator({label, value, handleChange, ...props});
  }
}


export default MoneyComponent;
