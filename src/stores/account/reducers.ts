import { AccountActionType, AccountState } from './types';
import { Reducer } from 'redux';
import { AccountActions } from './actions';
import update from 'immutability-helper';

const initialState: AccountState = {
    name: '',
    session: '',
    isLogin: false,
    errorLogin: undefined,
    isLogout: false,
    errorLogout: undefined,
};

const reducer: Reducer<AccountState> = (
    state = initialState,
    action: AccountActions
) => {
    switch (action.type) {
        case AccountActionType.LOGIN:
            return update(state, {
                isLogin: { $set: true },
                errorLogin: { $set: undefined },
            });

        case AccountActionType.LOGIN_SUCCESSFUL:
            const { name, session } = action.payload;
            return update(state, {
                isLogin: { $set: false },
                name: { $set: name },
                session: { $set: session },
            });

        case AccountActionType.LOGIN_FAILED:
            return update(state, {
                isLogin: { $set: false },
                errorLogin: { $set: action.payload.error },
            });

        case AccountActionType.LOGOUT:
            return update(state, {
                isLogout: { $set: true },
                errorLogout: { $set: undefined },
            });

        case AccountActionType.LOGOUT_SUCCESSFUL:
            return update(state, {
                isLogout: { $set: false },
                name: { $set: undefined },
                session: { $set: undefined },
            });

        case AccountActionType.LOGOUT_FAILED:
            return update(state, {
                isLogout: { $set: false },
                errorLogout: { $set: action.payload.error },
            });
        default:
            return state;
    }
};

export { reducer as accountReducer };
export { initialState as accountInitialState };
