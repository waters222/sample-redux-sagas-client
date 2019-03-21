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

    readonly isLogin: boolean;
    readonly errorLogin: string | undefined;

    readonly isLogout: boolean;
    readonly errorLogout: string | undefined;
}
