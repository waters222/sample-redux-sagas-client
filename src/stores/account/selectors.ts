import { createSelector, Selector } from 'reselect';
import { AccountState } from './types';

export const getSession = (state: AccountState) => state.session;

export const getName = (state: AccountState) => state.name;

export const isLogin: Selector<AccountState, boolean> = createSelector(
    getSession,
    getName,
    (session, name) => session !== undefined && name !== undefined
);

export const isLoginRequesting = (state: AccountState) =>
    state.isLoginRequesting;
export const getLoginError = (state: AccountState) => state.errorLogin;
