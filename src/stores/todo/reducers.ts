import { TodoActionType, TodoState } from './types';
import { Reducer } from 'redux';
import update from 'immutability-helper';

const initialState: TodoState = {
    title: '',
    start: undefined,
    end: undefined,
    step: 0,
    isRequesting: false,
    error: undefined,
};

const reducer: Reducer<TodoState> = (state = initialState, action) => {
    switch (action.type) {
        case TodoActionType.SET_TITLE:
            return update(state, {
                title: { $set: action.title },
                step: { $set: 1 },
            });

        case TodoActionType.SET_DATE:
            return update(state, {
                start: { $set: action.start },
                end: { $set: action.end },
                step: { $set: 2 },
            });

        case TodoActionType.SUBMIT:
            return update(state, {
                isRequesting: { $set: true },
                error: { $set: undefined },
            });

        case TodoActionType.ADD_TODO_SUCC:
            return update(state, {
                isRequesting: { $set: false },
                step: { $set: 3 },
            });

        case TodoActionType.ADD_TODO_FAIL:
            return update(state, {
                isRequesting: { $set: false },
                error: { $set: action.error },
            });

        case TodoActionType.CANCEL:
            return initialState;
    }

    return state;
};

export { reducer as todoReducer, initialState as todoInitialState };
