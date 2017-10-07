import * as React from "react";

const emptyItem = {key:"", value:"..."};

const AsInlneText = ({data, selected, handleChangeMode, ...props}) => {
  let item = !selected ? emptyItem : data.filter((e)=>e.key===selected)[0];
  item = item ? item : emptyItem;
  const opts = {};
  if (handleChangeMode && typeof handleChangeMode === "function"){
    opts["onClick"] = handleChangeMode;
  }
  return (
    <div
      className="input-sm"
      {...opts}
    >{item.value}</div>
  );
}


const selectOptions = (data) =>
  [(<option key="default" value="">Please select...</option>)]
  .concat(
    data.map(
      ({key, value}) => (<option key={key} value={key}>{value}</option>)
    )
  )


const AsInlneEdit = ({data, selected, handleChange, handleChangeMode, ...props}) => {
  const opts = {};
  if (handleChangeMode && typeof handleChangeMode === "function"){
    opts["onBlur"] = handleChangeMode;
  }
  return (
    <select
      autoFocus
      onChange={handleChange}
      value={selected}
      style={{minWidth: "150px"}}
      className="form-control input-sm"
      {...opts}
    >
      {selectOptions(data)}
    </select>
  );
}


const AsInlneCreate = ({data, selected, handleChange, ...props}) => {
  const opts = {};
  return (
    <select
      autoFocus
      onChange={handleChange}
      value={selected}
      className="form-control input-sm"
      {...opts}
    >
      {selectOptions(data)}
    </select>
  );
}


export const SelectGenerator = ({label, data, selected, handleChange, ...props}) => {
  let classNames = ["form-group"];
  if (props.required && (!selected || typeof selected!=="string")) classNames.push("has-danger");
  return (
    <div className={classNames.join(" ")}>
      <label className="control-label">{label}</label>
      <select onChange={handleChange} value={selected} className="form-control" {...props}>
        {selectOptions(data)}
      </select>
    </div>
  );
}


// has-error has-danger
const SelectComponent = ({label, data, selected, handleChange, ...props}) => {
  const modeDefined = props.mode !== undefined;
  if (modeDefined && props.mode === "inlineText") {
    return AsInlneText({data, selected, handleChangeMode: props.handleChangeMode});
  } else if (modeDefined && props.mode === "inlineEdit") {
    return AsInlneEdit({data, selected, handleChange, handleChangeMode: props.handleChangeMode});
  } else if (modeDefined && props.mode === "inlineCreate") {
    return AsInlneCreate({data, selected, handleChange});
  } else {
    return SelectGenerator({label, data, selected, handleChange, ...props});
  }
}

export default SelectComponent;
