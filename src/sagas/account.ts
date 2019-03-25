import { all, call, put, takeEvery } from 'redux-saga/effects';
import { AccountActionType } from '../stores/account/types';
import { AccountActions } from '../stores/account/actions';
import {
    fakeGetInfo,
    fakeLogin,
    fakeLogout,
    fakeUpdateInfo,
} from '../services';

function* login(action: AccountActions) {
    if (action.type === AccountActionType.LOGIN) {
        const { name, password } = action.payload;
        try {
            const session = yield call(fakeLogin, name, password);
            yield put(AccountActions.loginSuccessful(name, session));
        } catch (err) {
            yield put(AccountActions.loginFailed(err));
        }
    }
}

function* logout(action: AccountActions) {
    if (action.type === AccountActionType.LOGOUT) {
        try {
            yield call(fakeLogout);
            yield put(AccountActions.logoutSuccessful());
        } catch (err) {
            yield put(AccountActions.logoutFailed(err));
        }
    }
}

function* getInfo(action: AccountActions) {
    if (action.type === AccountActionType.GET_INFO) {
        try {
            const { email, phone } = yield call(fakeGetInfo);
            yield put(AccountActions.getAccountInfoSuccessful(email, phone));
        } catch (err) {
            yield put(AccountActions.getInfoFailed(err));
        }
    }
}

function* updateInfo(action: AccountActions) {
    if (action.type === AccountActionType.UPDATE_INFO) {
        try {
            const { email, phone } = action.payload;
            yield call(fakeUpdateInfo, email, phone);
            yield put(AccountActions.updateInfoSuccessful(email, phone));
        } catch (err) {
            yield put(AccountActions.updateInfoFailed(err));
        }
    }
}

export default function* accountSaga() {
    yield all([
        takeEvery(AccountActionType.LOGIN, login),
        takeEvery(AccountActionType.LOGOUT, logout),
        takeEvery(AccountActionType.GET_INFO, getInfo),
        takeEvery(AccountActionType.UPDATE_INFO, updateInfo),
    ]);
}
