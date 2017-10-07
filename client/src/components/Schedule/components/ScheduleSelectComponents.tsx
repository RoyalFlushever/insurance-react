import * as React from "react";

import SelectGenerator from './SelectComponent';

import { arrays } from "../../../listsData/scheduleListsData";

export default SelectGenerator;

const selectMetaData = [
  {
    label: 'Catégorie',
    key: 'category',
    data: arrays.categories,
    required: true,
  },
  {
    label: 'Type',
    key: 'dateType',
    data: arrays.types,
    required: true,
  },
  {
    label: 'Scene',
    key: 'scene',
    data: arrays.scenes,
  },
  {
    label: 'Base indemnisation',
    key: 'damageBasis',
    data: arrays.damageBasises,
  },
  {
    label: 'Pays',
    key: 'country',
    data: arrays.countries,
  },
];


const selects = selectMetaData.reduce( (a, e) => {
  a[e.key] = ({ selected, handleChange, ...props }) => {
    return SelectGenerator({
      label: e.label,
      data: e.data,
      selected: selected,
      handleChange: handleChange(e.key),
      ...props
    });
  }
  return a;
},{});


export const SelectCategory = selects['category'];
export const SelectType = selects['dateType'];
export const SelectScene = selects['scene'];
export const SelectDamageBasis = selects['damageBasis'];
export const SelectCountry = selects['country'];
