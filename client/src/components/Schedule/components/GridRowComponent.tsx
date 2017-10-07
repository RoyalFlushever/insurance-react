import * as React from "react";

import {
  SelectCountry,
  SelectDamageBasis,
  SelectScene
} from "./ScheduleSelectComponents";

import DateComponent from "./DateComponent";
import NumberComponent from "./NumberComponent";
import TextComponent from "./TextComponent";
import MoneyComponent from "./MoneyComponent";


const DelBtn = ({handleClick}) => (
  <span className="fa fa-remove" onClick={handleClick}></span>
);

// has-error has-danger
const GridRowComponent = (
  {
    rowId,
    data,
    modes,
    handleChangeRowItem,
    handleChangeRowItemMode,
    handleDeleteRow,
    isExtra,
    ...props
  }
) => {
  // const opts = {};
  // if (isUnique) opts['readOnly'] = "readOnly";
  const opts = {};
  if (props.minDate) opts['minDate'] = props.minDate;
  if (props.maxDate) opts['maxDate'] = props.maxDate;

  return (
    <tr className={isExtra?"alert alert-danger":""}>
      <td>
        {isExtra?(<DelBtn handleClick={handleDeleteRow}/>):(rowId>=0?rowId+1:"")}
      </td>
      <td>
        <DateComponent
          label="Date"
          value={data.date}
          mode={modes.date}
          fieldKey={`date${rowId}`}
          handleChange={handleChangeRowItem('date')}
          handleChangeMode={handleChangeRowItemMode('date')}
          {...opts}
        />
      </td>
      <td className="col-xs-2">
        <SelectCountry
          selected={data.country}
          mode={modes.country}
          handleChange={handleChangeRowItem('country')}
          handleChangeMode={handleChangeRowItemMode('country')}
        />
      </td>
      <td>
        <TextComponent
          value={data.zipCode}
          mode={modes.zipCode}
          handleChange={handleChangeRowItem('zipCode')}
          handleChangeMode={handleChangeRowItemMode('zipCode')}
          label="ZIP Code"
        />
      </td>
      <td>
        <TextComponent
          value={data.place}
          mode={modes.place}
          handleChange={handleChangeRowItem('place')}
          handleChangeMode={handleChangeRowItemMode('place')}
          label="Place"
        />
      </td>
      <td className="col-xs-2">
        <SelectScene
          selected={data.scene}
          mode={modes.scene}
          handleChange={handleChangeRowItem('scene')}
          handleChangeMode={handleChangeRowItemMode('scene')}
        />
      </td>
      <td className="col-xs-2">
        <SelectDamageBasis
          selected={data.damageBasis}
          mode={modes.damageBasis}
          handleChange={handleChangeRowItem('damageBasis')}
          handleChangeMode={handleChangeRowItemMode('damageBasis')}
        />
      </td>
      <td>
        <MoneyComponent
          value={data.amount}
          mode={modes.amount}
          handleChange={handleChangeRowItem('amount')}
          handleChangeMode={handleChangeRowItemMode('amount')}
          label="Amount"
        />
      </td>
    </tr>
  );
}

export default GridRowComponent;

// export const NumberGenerator = ({label, value, handleChange, isUnique, ...props}) => (
//   <NumberComponent label={label} value={value} handleChange={handleChange} isUnique={isUnique} {...props}/>
// );
