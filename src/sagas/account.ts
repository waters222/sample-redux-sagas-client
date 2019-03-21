import { all, call, put, takeEvery } from 'redux-saga/effects';
import { AccountActionType } from '../stores/account/types';
import { AccountActions } from '../stores/account/actions';
import { fakeLogin, fakeLogout } from '../services';

function* login(action: AccountActions) {
    if (action.type === AccountActionType.LOGIN) {
        const { name, password } = action.payload;
        try {
            const session = yield call(fakeLogin, name, password);
            yield put(AccountActions.loginSuccessful(name, session));
        } catch (err) {
            yield put(AccountActions.loginFailed(err.message));
        }
    }
}

function* logout(action: AccountActions) {
    if (action.type === AccountActionType.LOGOUT) {
        try {
            yield call(fakeLogout);
            yield put(AccountActions.logoutSuccessful());
        } catch (err) {
            yield put(AccountActions.logoutFailed(err.message));
        }
    }
    return true;
}

export default function* accountSaga() {
    yield all([
        takeEvery(AccountActionType.LOGIN, login),
        takeEvery(AccountActionType.LOGOUT, logout),
    ]);
}
