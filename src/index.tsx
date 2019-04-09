import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
import './index.css';
// import registerServiceWorker from './registerServiceWorker';
import configureStore from './configure-store';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { getLangCookie, getSessionCookie } from './constants/cookie';
import { accountInitialState } from './stores/account/reducers';
import { LocaleProvider } from 'antd';
import { IntlProvider } from 'react-intl';
import { getLanguageSetting } from './utils/language-helpers';
import config from './configs/config';
import { todoInitialState } from './stores/todo/reducers';

// get history
const history = createBrowserHistory({ basename: config.basePath });

// lets check if we have language cookie stored, if not using browser default
const language = getLangCookie();
const languageSetting = getLanguageSetting(language);

// lets check if user logged in
const sessionCookie = getSessionCookie();
const sessionState =
    sessionCookie !== undefined
        ? {
              ...accountInitialState,
              name: sessionCookie.name,
              session: sessionCookie.session,
          }
        : accountInitialState;

const store = configureStore(history, {
    account: sessionState,
    language: { language: language },
    todo: todoInitialState,
    router: {
        location: { pathname: '/', search: '', hash: '', state: null },
        action: 'REPLACE',
    },
});

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider
            locale={languageSetting.languageWithoutRegionCode}
            messages={languageSetting.messages}
        >
            <LocaleProvider locale={languageSetting.locale}>
                <ConnectedRouter history={history}>
                    <App />
                </ConnectedRouter>
            </LocaleProvider>
        </IntlProvider>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
