import * as React from "react";
import { translate, Interpolate, Trans } from 'react-i18next';
import i18n from '../i18n';


export interface HelloProps {}

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
@translate([], { wait: true })
export class Hello extends React.Component<HelloProps, undefined> {

  constructor(props) {
    super(props);
  }


  render() {
    const { t } : any = this.props;
    return (
        <div className="content-w">
          <div className="content-panel-toggler">
            <i className="os-icon os-icon-grid-squares-22"></i><span>Sidebar</span>
          </div>
          <div className="content-i">
            <div className="content-box">
              <div className="row">
                <div className="col-sm-12">
                  <div className="element-wrapper">
                    <h6 className="element-header">
                      Dashboard
                    </h6>
                    <div className="element-box-tp">
                      <div className="controls-above-table">
                        <div className="row">
                          <div className="col-sm-6">

                          </div>
                          <div className="col-sm-6">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default Hello;
