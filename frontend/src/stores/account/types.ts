export enum AccountActionType {
    LOGIN = '@@account/LOGIN',
    LOGOUT = '@@account/LOGOUT',
    CHANGE_NAME = '@@account/CHANGE_NAME',
    CHANGE_PASSWORD = '@@account/CHANGE_PASSWORD',
}

export interface AccountState {
    readonly name: string;
    readonly session: string;
}