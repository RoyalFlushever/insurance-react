import * as React from "react";
import axios from 'axios';
import _merge from "lodash/merge";
import FileSaver from 'file-saver';
import update from 'immutability-helper';
import * as XLSX from 'xlsx';

import {translate, Interpolate, Trans} from 'react-i18next';
import i18n from '../../i18n';

import { SelectCategory, SelectType } from "./components/ScheduleSelectComponents";

import DateComponent from "./components/DateComponent";
import GridRowComponent from "./components/GridRowComponent";
import MoneyComponent from "./components/MoneyComponent";
import NumberComponent from "./components/NumberComponent";
import PaginationComponent from "./components/PaginationComponent";
import TextComponent from "./components/TextComponent";

import { scenes, damageBasises, countries } from "../../listsData/scheduleListsData";

const RowsPerPage = 5;
const msecStart = 25568.75;
const msecDay = 86400000;
const xlsDt2msex = (daysSince19000101) => Math.floor((daysSince19000101 - msecStart)*msecDay);

const importHeaders = {
  'DATE': 'date',
  'PAYS': 'country',
  'CP': 'zipCode',
  'LIEUX': 'place',
  'SCENE': 'scene',
  'BASE INDEMNISATION': 'damageBasis',
  'MONTANT': 'amount',
}

const importHeadersOrdered = [
  'DATE', 'PAYS', 'CP', 'LIEUX', 'SCENE', 'BASE INDEMNISATION', 'MONTANT'
]

const exportHeaders = Object.keys(importHeaders).reduce(
  (a, key) => { a[importHeaders[key]] = key; return a; }, {}
)

const getListItemKeyByValue = (list, v) =>
  Object.keys(list).filter(
    (key) => list[key] === v
  )[0]

const lists2keys = {
  scene: scenes,
  damageBasis: damageBasises,
  country: countries,
}

const prepareDate = (dt=undefined) => (dt?new Date(dt):new Date()).toISOString();

const formatDate = (dt) => dt.substr(8,2)+'.'+dt.substr(5,2)+'.'+dt.substr(0,4);

function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}


@translate(['schedule'], {wait: true})
export default class ScheduleContainer extends React.Component<any, any> {

  emptyRowsData = {
    date: { value: "", formattedValue: ""},
    country: '',
    zipCode: '',
    place: '',
    scene: '',
    damageBasis: '',
    amount: ''
  }

  emptyRowModes = {
    date: "inlineText",
    country: "inlineText",
    zipCode: "inlineText",
    place: "inlineText",
    scene: "inlineText",
    damageBasis: "inlineText",
    amount: "inlineText",
  }

  data2pass = [
    "category", "eventDate", "eventEndDate",
    "artist", "dateType", "numberInsured",
    "budget", "dates",
  ];

  axios = axios.create({
    baseURL: '/api/manifestation_dates'
  });

  constructor(props) {
    super(props);

    this.state = {
      // today: (new Date()).toISOString().slice(0,10),
      today: prepareDate(),
      // scene: "",
      // damageBasis: "",
      // country: 'FR',
      // date: {},
      category: "",
      eventDate: {},
      eventEndDate: {},
      artist: "",
      dateType: "",
      numberInsured: "",
      budget: "",
      importBtnTitle: props.t('schedule:importDates') + " (xls, ods)",
      dates: [],
      modes: [],
      activePage: 1,
    };
  } // constructor


  // Load stored data when passed from parent component
  scheduleDataLoaded = 0
  componentWillReceiveProps(nextProps) {
    if (this.scheduleDataLoaded<1 && nextProps.data.value.dates.length>0) {
      this.setState( state => {
        let newState = _merge(state, nextProps.data.value);
        newState.modes = newState.dates.map( item => {
          return Object.keys(item).reduce((a, e) => {
            a[e] = "inlineText";
            return a;
          }, {})
        })
        newState.budget = this.sumBudget(newState.dates);
        return newState;
      });
      this.scheduleDataLoaded++;
    }
  }

  handleSelectPage = (selectedPage) => (e) => {
    // console.log(selectedPage, e.target);
    e.stopPropagation();
    e.preventDefault();
    this.setState({activePage: selectedPage});
  }

  handleFileInputChange = (e) => {
    // console.log('Selected file:', e.target.files[0]);
    if (e.target.files && e.target.files[0].name) {
      this.setState({importBtnTitle: e.target.files[0].name});

      const reader = new FileReader();
      reader.onload = ((theFile) => {
        return (e) => {
          // console.log(e.target.result);
          const wb = XLSX.read(e.target.result, {type: 'binary'});
          // console.log(wb);
          if (wb && wb.Sheets) {
            const json = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
            // console.log(json);
            if (json) {
              const dates = json.map( (row, i) => {
                const rowData = Object.keys(importHeaders).reduce( (a, key) => {
                  const eKey = importHeaders[key];
                  if (row[key]) {
                    let v = row[key];
                    if (eKey==='date') {
                      const msec = xlsDt2msex(wb.Sheets[wb.SheetNames[0]][`A${i+2}`].v);
                      const dt = prepareDate(msec);
                      v = {value: dt, formattedValue: formatDate(dt)};
                    } else if (eKey==='amount') {
                      v = wb.Sheets[wb.SheetNames[0]][`G${i+2}`].v;
                    } else if (lists2keys[eKey]) {
                      v = getListItemKeyByValue(lists2keys[eKey], v);
                    }
                    a[eKey] = v;
                  } else {
                    console.error(`${key} property not found in imported data on row ${i} of ${e.target.files[0].name}`);
                  }
                  // console.log(i, key, eKey, row[key], a[eKey]);
                  return a;
                }, {...this.emptyRowsData})
                // console.log(`Row ${i}: `,rowData);
                this.addGridRow(1, rowData);
                this.calculateBudget(-1, 0);
              });
            }
          }
        };
      })(e.target.files[0]);

      reader.readAsBinaryString(e.target.files[0]);
    }
  }

  handleImportBtnClick = (e) => {
    if (e.target.tagName === "BUTTON") {
      e.preventDefault();
    }
  }

  handleExportBtnClick = (e) => {
    const type = e.target.value;
    const json = this.state.dates.map( row => {
      const rowData = Object.keys(importHeaders).reduce( (a, key) => {
        const eKey = importHeaders[key];
        let v = row[eKey];
        if (eKey === "date") {
          v = v.formattedValue; //formatDate(v.value);
        } else if (lists2keys[eKey]) {
          v = lists2keys[eKey][v];
        }
        a[key] = v;
        return a;
      }, {});
      return rowData;
    })
    // console.log(json);
    const sheet = XLSX.utils.json_to_sheet(json, {
      header: importHeadersOrdered
    });
    const wb = {SheetNames: [], Sheets: {}};
    wb.SheetNames.push(this.state.artist);
    wb.Sheets[this.state.artist] = sheet;
    const wbOut = XLSX.write(wb, {bookType:'ods', bookSST:true, type: 'binary', compression: true});
    // console.log(json, sheet, wbOut);
    FileSaver.saveAs(new Blob([s2ab(wbOut)],{type:"application/octet-stream"}), `${this.state.artist}.${type}`);
  }

  invalidMessage = (key) => {
    return false;
  }

  checkValidity = () => {
    let s = this.state;
    if (!s.category) return this.invalidMessage('category');
    if (!s.artist.length) return this.invalidMessage('artist');
    if (!s.dateType) return this.invalidMessage('dateType');
    if (!s.eventDate['value'] || s.eventDate['value'].length<24) return this.invalidMessage('eventDate');
    if (!s.eventEndDate['value'] || s.eventEndDate['value'].length<24) return this.invalidMessage('eventEndDate');
    if (s.numberInsured>0 && s.dates.length!==+s.numberInsured) {
      return this.invalidMessage('numberInsured');
    }
    let d = s.dates;
    for (let i=0; i<s.dates.length; i++) {
      const dateInvalid =
        d[i].date['value'].length<24 ||
        (
          d[i].date['value']<s.eventDate['value'] ||
          d[i].date['value']>s.eventEndDate['value']
        );
      // console.log(
      //   'checkValidity: ',
      //   typeof d[i].date['value'],
      //   d[i].date['value'],
      //   s.eventDate['value'],
      //   s.eventEndDate['value'],
      //   dateInvalid
      // );
      if (dateInvalid) return this.invalidMessage(`date[${i}]`);
    }
    return true;
  }

  // Prepare data for passing to the parent component
  getData2pass = () => {
    const ret = this.data2pass.reduce((a, key) => {
      a[key] = this.state[key];
      return a;
    }, {});
    return ret;
  }

  passData2Parent = () => {
    this.props.handleUpdate(this.getData2pass(), this.checkValidity());
  }


  // Pass data to the parent component each 5 sec. if any queued
  data2passQueueCnt = 0
  updateInterval = null
  passData = () => {
    if (this.data2passQueueCnt<1 && !this.updateInterval) {
      this.updateInterval = setTimeout(() => {
        this.passData2Parent();
        this.updateInterval = null;
        this.data2passQueueCnt = 0;
      }, 300);
    }
    this.data2passQueueCnt++;
  }

  // Pass queued data to the parent component before unmounting
  componentWillUnmount() {
    if (this.updateInterval || this.data2passQueueCnt>0 ) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
      this.data2passQueueCnt = 0;
      this.passData2Parent();
    }
  }

  componentDidMount() {
    this.passData2Parent();
  }


  addGridRow = (n=1, rowData=this.emptyRowsData) => {
    for(let i=0; i<n; i++) {
      this.setState( (state) => update(state, {modes: {$push: [this.emptyRowModes]}}), this.passData);
      this.setState( (state) => update(state, {dates: {$push: [rowData]}}), this.passData);
    }
  }


  updateValue = (key, value) => {
    const data = {};
    data[key] = value;
    if (key === "eventDate") {
      if (this.state.eventEndDate && this.state.eventEndDate.value<value.value) {
        data["eventEndDate"] = value;
      }
    } else if (key === "dateType") {
      this.updateValue("numberInsured", 1);
    } else if (key === "numberInsured") {
      if (value===1 && this.state.dateType==='du' && !this.state.dates) {
        this.addGridRow();
      } else {
        if (value>this.state.numberInsured) {
          if (this.state.dates.length<value) {
            this.addGridRow(value-this.state.numberInsured);
          }
        }
      }
    }
    this.setState(data, this.passData);
  }

  handleChange = (key) => {
    return (e) => this.updateValue(
      key,
      typeof e.target !== "undefined"
        && typeof e.target.value !== "undefined" ? e.target.value : e
    )
  }


  sumBudget = (dates) => dates.reduce((a, e) => a+(+e.amount), 0);

  calculateBudget = (rowId, value = 0) => {
    this.setState(state => {
      let total = this.sumBudget(state.dates);
      // if (rowId>=0) {
      //   total = total - this.state.dates[rowId].amount + (+value);
      // }
      return {budget: total>0?total:""}
    }, this.passData);
  }


  updateRowItemValue = (rowId, key, value) => {
    if (
      this.state.dates &&
      this.state.dates.length>rowId &&
      this.state.dates[rowId] &&
      this.state.dates[rowId][key] !== undefined
    ) {
      this.setState(state =>
        update(
          state,
          {dates: {[rowId]: {[key]: {$set: value}}}}
        ),
        this.passData
      );

      if (key === "amount") {
        this.calculateBudget(rowId, value);
      }

    } else {
      console.error(`Unable to change value for inexistent this.state.dates[${rowId}][${key}]`);
    }
  }


  handleChangeRowItem = (rowId) => (key) => () => (e) => {
    this.updateRowItemValue(
      rowId,
      key,
      e && e['target'] && typeof e['target']['value'] !== "undefined" ? e['target']['value'] : e
    );
  }


  handleChangeRowItemMode = (rowId) => (key) => () => {
    if (
      this.state.modes &&
      this.state.modes.length>rowId &&
      this.state.modes[rowId] &&
      this.state.modes[rowId][key]
    ) {
      const currMode = this.state.modes[rowId][key];
      const nextMode = (currMode === "inlineText") ? "inlineEdit" : "inlineText";
      this.setState((state) =>
        update(
          state,
          {modes: {[rowId]: {[key]: {$set: nextMode}}}}
        ),
        this.passData
      );
    } else {
      console.error(`Unable to change mode for inexistent this.state.modes[${rowId}][${key}]`);
    }
  }

  handleDeleteRow = (rowId) => () => {
    const dateId = this.state.dates[rowId]['id'];

    if (dateId) {
      this.axios.delete('/' + dateId).then(() => {})
    }

    this.setState(state =>
      update(
        state,
        {dates: {$splice: [[rowId, 1]]}}
      ),
      this.passData
    );

    this.setState(state =>
      update(
        state,
        {modes: {$splice: [[rowId, 1]]}}
      ),
      this.passData
    );

    this.calculateBudget(-1, 0);
  }


  render() {

    const { t } = this.props;

    const pageStart = (RowsPerPage)*(this.state.activePage-1);
    const pageEnd = pageStart+RowsPerPage;

    return (
      <div className="container">

        <div className="row">
          <div className="col-sm-4">
            <SelectCategory
              selected={this.state.category}
              handleChange={this.handleChange}
              required={true}
            />
          </div>

          <div className="col-sm-4">
            <DateComponent
              label={t("schedule:eventDate")}
              fieldKey='eventDate'
              handleChange={this.handleChange('eventDate')}
              value={this.state.eventDate.value}
              minDate1={this.state.today}
              required={true}
            />
          </div>

          <div className="col-sm-4">
            <DateComponent
              label={t("schedule:eventEndDate")}
              fieldKey='eventEndDate'
              handleChange={this.handleChange('eventEndDate')}
              value={this.state.eventEndDate.value}
              minDate={this.state.eventDate.value}
              required={true}
            />
          </div>

        </div>

        <div className="row">
          <div className="col-sm-4">
            <TextComponent
              value={this.state.artist}
              handleChange={this.handleChange('artist')}
              label={t("schedule:artist")}
              required={true}
            />
          </div>

          <div className="col-sm-4">
            <SelectType
              selected={this.state.dateType}
              handleChange={this.handleChange}
              required={true}
            />
          </div>

          <div className="col-sm-4">
            <NumberComponent
              value={this.state.numberInsured}
              handleChange={this.handleChange('numberInsured')}
              label={t("schedule:numberInsured")}
              isUnique={this.state.dateType==='du'}
            />
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-sm-5">
            <label>&nbsp;</label>
            <div className="row">
              <div
                className="btn btn-block"
                onClick={this.handleImportBtnClick}
                style={{backgroundColor: "rgb(221, 221, 221)", cursor: "pointer"}}
              >
                <label style={{
                  marginBottom: "0",
                  cursor: "pointer",
                  width: "117%",
                  height: "188%",
                  top: "-10px",
                  position: "relative",
                  left: "-20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  {this.state.importBtnTitle}
                  <input
                    type="file"
                    accept=".xls,.xlsx,.ods"
                    title={t('schedule:importDates') + " (xls, ods)"}
                    style={{ display: "none" }}
                    onChange={this.handleFileInputChange}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="col-sm-1"></div>
          <div className="col-sm-6 text-center">
            <label>{t('schedule:downloadDates')}</label>
            <div className="row">
              <div className="col-sm-6">
                <input
                  type="button"
                  className="btn btn-block"
                  value="xls"
                  onClick={this.handleExportBtnClick}
                />
              </div>
              <div className="col-sm-6">
                <input
                  type="button"
                  className="btn btn-block"
                  value="ods"
                  onClick={this.handleExportBtnClick}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-1"></div>
        </div>

        <br />

        <div className="row">
          <small className="text-muted pull-right">*{t('schedule:clickToEdit')}</small>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th style={{width: "3%"}}>#</th>
                <th style={{width: "8%"}}>{t('schedule:date')}</th>
                <th style={{width: "20%"}}>{t('schedule:country')}</th>
                <th style={{width: "3%"}}>{t('schedule:zipCode')}</th>
                <th style={{width: "16%"}}>{t('schedule:place')}</th>
                <th style={{width: "20%"}}>{t('schedule:scene')}</th>
                <th style={{width: "20%"}}>{t('schedule:damageBasis')}</th>
                <th style={{width: "10%"}}>{t('schedule:amount')}</th>
              </tr>
            </thead>
            <tbody>
              {this.state.dates
                .slice(pageStart, pageEnd)
                .map( (data, id) => {
                  const rowId = pageStart+id;
                  return (
                    <GridRowComponent
                      key={rowId}
                      rowId={rowId}
                      data={this.state.dates[rowId]}
                      modes={this.state.modes[rowId]}
                      handleChangeRowItem={this.handleChangeRowItem(rowId)}
                      handleChangeRowItemMode={this.handleChangeRowItemMode(rowId)}
                      handleDeleteRow = {this.handleDeleteRow(rowId)}
                      isExtra={rowId+1>(this.state.dateType==='du'?1:this.state.numberInsured)}
                      minDate={this.state.eventDate.value}
                      maxDate={this.state.eventEndDate.value}
                    />
                  )
                }
              )}

            </tbody>
          </table>

          <PaginationComponent
            itemsCnt={this.state.dates.length}
            rows={RowsPerPage}
            activePage={this.state.activePage}
            onSelect={this.handleSelectPage}
          />

        </div>

        <br />

        <div className="row">
          <div className="col-sm-4">
            <MoneyComponent
              value={this.state.budget}
              handleChange={this.handleChange('budget')}
              label={t("schedule:budget")}
              readOnly
            />
          </div>
        </div>

      </div>
    )
  }
}
