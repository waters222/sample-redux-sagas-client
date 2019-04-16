import { TodoActionType } from './types';
import { ActionUnion, createAction } from '../action-helper';
import moment from 'moment';

export const TodoActions = {
    start: (title: string) =>
        createAction(TodoActionType.START, {
            title: title,
        }),

    selectDate: (start: moment.Moment, end: moment.Moment) =>
        createAction(TodoActionType.SET_DATE, {
            start: start,
            end: end,
        }),
    setTitle: (title: string) =>
        createAction(TodoActionType.SET_TITLE, {
            title: title,
        }),
    setDate: (start: moment.Moment, end: moment.Moment) =>
        createAction(TodoActionType.SET_DATE, {
            start: start,
            end: end,
        }),
    submit: () => createAction(TodoActionType.SUBMIT),
    addTodoSucc: () => createAction(TodoActionType.ADD_TODO_SUCC),
    addTodoFail: () => createAction(TodoActionType.ADD_TODO_FAIL),

    cancel: () => createAction(TodoActionType.CANCEL),
};

export type TodoActions = ActionUnion<typeof TodoActions>;
