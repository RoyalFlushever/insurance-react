import * as React from "react";

const AsInlneText = ({value, handleChangeMode, ...props}) => {
  const opts = {};
  if (handleChangeMode && typeof handleChangeMode === "function"){
    opts["onClick"] = handleChangeMode;
  }
  return (
    <div className="input-sm" {...opts}>{value?value:"..."}</div>
  );
}


// has-error has-danger
export const TextGenerator = ({label, value, handleChange, ...props}) => {
  let classNames = ["form-group"];
  if (props.required && (!value || typeof value!=="string")) classNames.push("has-danger");
  return (
    <div className={classNames.join(" ")}>
      <label>{label}</label>
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

const AsInlneEdit = ({value, handleChange, handleChangeMode, ...props}) => {
  const opts = {};
  if (handleChangeMode && typeof handleChangeMode === "function"){
    opts["onBlur"] = handleChangeMode;
  }

  return (
    <input
      autoFocus
      type="text"
      style={{minWidth: "75px"}}
      className="form-control input-sm"
      value={value}
      onChange={handleChange}
      {...opts}
    />
  );
}


const AsInlneCreate = ({value, handleChange, ...props}) => {

  return (
    <input
      type="text"
      className="form-control text-right input-sm"
      value={value}
      onChange={handleChange}
    />
  );
}


const TextComponent = ({label, value, handleChange, ...props}) => {
  const modeDefined = props.mode !== undefined;
  if (modeDefined && props.mode === "inlineText") {
    return AsInlneText({value, handleChangeMode: props.handleChangeMode});
  } else if (modeDefined && props.mode === "inlineEdit") {
    return AsInlneEdit({value, handleChange: handleChange(), handleChangeMode: props.handleChangeMode});
  } else if (modeDefined && props.mode === "inlineCreate") {
    return AsInlneCreate({value, handleChange: handleChange()});
  } else {
    return TextGenerator({label, value, handleChange, ...props});
  }
}

export default TextComponent;

// export const TextGenerator = ({label, value, handleChange, ...props}) => (
//   <TextComponent label={label} value={value} handleChange={handleChange} {...props}/>
// );
