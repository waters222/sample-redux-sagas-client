import { ErrorAjax } from '../../services';

export enum AccountActionType {
    LOGIN = '@@account/LOGIN',
    LOGIN_SUCCESSFUL = '@@account/LOGIN_SUCCESSFUL',
    LOGIN_FAILED = '@@account/LOGIN_FAILED',
    LOGOUT = '@@account/LOGOUT',
    LOGOUT_SUCCESSFUL = '@@account/LOGOUT_SUCCESSFUL',
    LOGOUT_FAILED = '@@account/LOGOUT_FAILED',
}

export interface AccountState {
    readonly name: string | undefined;
    readonly session: string | undefined;

    readonly isLoginRequesting: boolean;
    readonly errorLogin: ErrorAjax | undefined;

    readonly isLogout: boolean;
    readonly errorLogout: ErrorAjax | undefined;
}
