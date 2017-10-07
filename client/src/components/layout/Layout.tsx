import * as React from "react";
import { Sidebar } from './Sidebar'

export interface LayoutProps { }

export class Layout extends React.Component<LayoutProps, undefined> {
  render() {
    return (
        <div className="all-wrapper menu-side with-side-panel">
            <div className="layout-w">
                <Sidebar />
                {this.props.children}
            </div>
            <div className="display-type"></div>
        </div>
    );
  }
}

export default Layout;
