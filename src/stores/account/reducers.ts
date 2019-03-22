import { AccountActionType, AccountState } from './types';
import { Reducer } from 'redux';
import { AccountActions } from './actions';
import update from 'immutability-helper';
import { clearSessionCookie, storeSessionCookie } from '../../constants/cookie';

const initialState: AccountState = {
    name: undefined,
    session: undefined,
    isLoginRequesting: false,
    errorLogin: undefined,
    isLogoutRequesting: false,
    errorLogout: undefined,
};

const reducer: Reducer<AccountState> = (
    state = initialState,
    action: AccountActions
) => {
    switch (action.type) {
        case AccountActionType.LOGIN:
            return update(state, {
                isLoginRequesting: { $set: true },
                errorLogin: { $set: undefined },
            });

        case AccountActionType.LOGIN_SUCCESSFUL:
            const { name, session } = action.payload;
            if (storeSessionCookie(name, session)) {
                return update(state, {
                    isLoginRequesting: { $set: false },
                    name: { $set: name },
                    session: { $set: session },
                });
            }
            break;

        case AccountActionType.LOGIN_FAILED:
            return update(state, {
                isLoginRequesting: { $set: false },
                errorLogin: { $set: action.payload },
            });

        case AccountActionType.LOGOUT:
            if (clearSessionCookie()) {
                return update(state, {
                    isLogoutRequesting: { $set: true },
                    errorLogout: { $set: undefined },
                });
            }
            break;

        case AccountActionType.LOGOUT_SUCCESSFUL:
            return update(state, {
                isLogoutRequesting: { $set: false },
                name: { $set: undefined },
                session: { $set: undefined },
            });

        case AccountActionType.LOGOUT_FAILED:
            return update(state, {
                isLogoutRequesting: { $set: false },
                errorLogout: { $set: action.payload },
            });
    }
    return state;
};

export { reducer as accountReducer };
export { initialState as accountInitialState };
