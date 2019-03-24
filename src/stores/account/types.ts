import { ErrorAjax } from '../../services';

export enum AccountActionType {
    LOGIN = '@@account/LOGIN',
    LOGIN_SUCCESSFUL = '@@account/LOGIN_SUCCESSFUL',
    LOGIN_FAILED = '@@account/LOGIN_FAILED',
    LOGOUT = '@@account/LOGOUT',
    LOGOUT_SUCCESSFUL = '@@account/LOGOUT_SUCCESSFUL',
    LOGOUT_FAILED = '@@account/LOGOUT_FAILED',

    GET_INFO = '@@account/GET_INFO',
    GET_INFO_SUCCESSFUL = '@@account/GET_INFO_SUCCESSFUL',
    GET_INFO_FAILED = '@@account/GET_INFO_FAILED',

    UPDATE_INFO = '@@account/UPDATE_INFO',
    UPDATE_INFO_SUCCESSFUL = '@@account/UPDATE_INFO_SUCCESSFUL',
    UPDATE_INFO_FAILED = '@@account/UPDATE_INFO_FAILED',
}

export interface AccountState {
    readonly name: string | undefined;
    readonly session: string | undefined;

    readonly isLoginRequesting: boolean;
    readonly errorLogin: ErrorAjax | undefined;

    readonly isLogoutRequesting: boolean;
    readonly errorLogout: ErrorAjax | undefined;

    readonly isUpdateInfoRequesting: boolean;
    readonly errorUpdateInfo: ErrorAjax | undefined;

    readonly isGetInfoRequesting: boolean;
    readonly errorGetInfo: ErrorAjax | undefined;
    info: AccountInfo | undefined;
}

export interface AccountInfo {
    readonly email: string;
    readonly phone: string;
}
