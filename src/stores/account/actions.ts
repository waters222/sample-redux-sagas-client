import { AccountActionType } from './types';
import { ActionUnion, createAction } from '../action-helper';
import { ErrorAjax } from '../../services';

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

    loginFailed: (error: ErrorAjax) =>
        createAction(AccountActionType.LOGIN_FAILED, error),

    logout: () => createAction(AccountActionType.LOGOUT),

    logoutSuccessful: () => createAction(AccountActionType.LOGOUT_SUCCESSFUL),

    logoutFailed: (error: ErrorAjax) =>
        createAction(AccountActionType.LOGOUT_FAILED, error),
};

export type AccountActions = ActionUnion<typeof AccountActions>;
