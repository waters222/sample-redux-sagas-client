import { AccountActionType } from './types';
import { ActionUnion, createAction } from '../action-helper';

export const AccountActions = {
    login: (name: string, password: string) =>
        createAction(AccountActionType.LOGIN, {
            name: name,
            password: password,
        }),

    loginSuccessful: (name: string, session: string) =>
        createAction(AccountActionType.LOGIN_SUCCESSFUL, {
            name: name,
            session: session,
        }),

    loginFailed: (error: string) =>
        createAction(AccountActionType.LOGIN_FAILED, { error: error }),

    logout: () => createAction(AccountActionType.LOGOUT),

    logoutSuccessful: () => createAction(AccountActionType.LOGOUT_SUCCESSFUL),

    logoutFailed: (error: string) =>
        createAction(AccountActionType.LOGOUT_FAILED, { error: error }),
};

export type AccountActions = ActionUnion<typeof AccountActions>;
