import * as React from "react";

// has-error has-danger
const NumberComponent = ({label, value, handleChange, isUnique, ...props}) => {
  const opts = {};
  if (isUnique) opts['readOnly'] = "readOnly";
  return (
    <div className="form-group ">
      <label>{label}</label>
      <input
        type="number"
        className="form-control"
        min="1"
        max={isUnique ? 1 : 9999}
        value={isUnique ? 1 : value}
        onChange={handleChange}
        {...opts}
      />
    </div>
  );
}

export default NumberComponent;

export const NumberGenerator = ({label, value, handleChange, isUnique, ...props}) => (
  <NumberComponent label={label} value={value} handleChange={handleChange} isUnique={isUnique} {...props}/>
);
