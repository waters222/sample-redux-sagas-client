
import { combineReducers } from 'redux';
import { lanReducer } from './language/reducers';
import { connectRouter, RouterState } from 'connected-react-router';
// If you use react-router, don't forget to pass in your history type.
import { History } from 'history';
import { LanguageState } from './language/types';
import { accountReducer } from './account/reducers';
import { AccountState } from './account/types';

export interface ApplicationState {
    account: AccountState;
    language: LanguageState;
    router: RouterState;
}

export const createRootReducer = (history: History) =>
    combineReducers<ApplicationState>({
        account: accountReducer,
        language: lanReducer,
        router: connectRouter(history),
    });