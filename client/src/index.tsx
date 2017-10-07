import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { I18nextProvider, translate } from 'react-i18next';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';

import createStore from './store';
import createRoutes from './routes';

const store = createStore()
const routes = createRoutes(store)
const MOUNT_NODE = document.getElementById('react-app')



import i18n from './i18n';
import {Layout} from "./components/layout/Layout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import 'font-awesome/css/font-awesome.min.css';

ReactDOM.render(
    <div>
        <I18nextProvider i18n={ i18n }>
            <Provider store={store}>
                <div>
                    <Router history={browserHistory}>
                        {routes}
                    </Router>
                </div>
            </Provider>
        </I18nextProvider>
        <ToastContainer />
    </div>,
    document.getElementById('react-app')

// initialized i18next instance
);