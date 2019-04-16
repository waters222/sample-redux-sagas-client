import { ErrorAjax } from '../../services';
import moment from 'moment';

export enum TodoActionType {
    START = '@@todo/START',
    SELECT_DATE = '@@todo/SELECT_DATE',

    SET_TITLE = '@@todo/SET_TITLE',
    SET_DATE = '@@TODE/SET_DATE',

    SUBMIT = '@@todo/submit',
    ADD_TODO_SUCC = '@@todo/ADD_TODO_SUCC',
    ADD_TODO_FAIL = '@@todo/ADD_TODO_FAILED',

    CANCEL = '@@todo/CANCEL',
}

export interface TodoState {
    readonly title: string;
    readonly start: moment.Moment | undefined;
    readonly end: moment.Moment | undefined;
    readonly step: number;
    readonly isRequesting: boolean;
    readonly error: ErrorAjax | undefined;
}
