import { AccountActionType } from './types';
import { ActionUnion, createAction } from '../action-helper';

export const AccountActions = {
    login: (name: string, password: string) =>
        createAction(AccountActionType.LOGIN, {
            name: name,
            password: password,
        }),
    logout: () => createAction(AccountActionType.LOGOUT),

    changeName: (name: string) =>
        createAction(AccountActionType.CHANGE_NAME, name),

    changePassword: (password: string) =>
        createAction(AccountActionType.CHANGE_PASSWORD, password),
};

export type AccountActions = ActionUnion<typeof AccountActions>;