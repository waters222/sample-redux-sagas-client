import { AccountActionType, AccountState } from './types';
import { Reducer } from 'redux';
import { AccountActions } from './actions';

const initialState: AccountState = {
    name: '',
    session: '',
};

const reducer: Reducer<AccountState> = (
    state = initialState,
    action: AccountActions
) => {
    switch (action.type) {
        case AccountActionType.LOGIN:
            console.log('account login reducer called');
            break;
        case AccountActionType.CHANGE_NAME:
            console.log(`change name to: ${action.payload}`);
            break;
        case AccountActionType.CHANGE_PASSWORD:
            break;
        case AccountActionType.LOGOUT:
            break;
        default:
            break;
    }
    return state;
};

export { reducer as accountReducer };
export { initialState as accountInitialState };