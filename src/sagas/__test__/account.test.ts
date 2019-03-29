import { expectSaga } from 'redux-saga-test-plan';
import { AccountActions } from '../../stores/account/actions';
import * as matchers from 'redux-saga-test-plan/matchers';
import {
    ErrorAjax,
    ErrorAjaxType,
    fakeLogin,
    fakeLogout,
} from '../../services';
import accountSaga from '../account';
import { throwError } from 'redux-saga-test-plan/providers';
import {
    accountReducer,
    accountInitialState,
} from '../../stores/account/reducers';

const name = 'fake_name';
const password = 'fake_password';
const session = 'fake_session';

test('test login saga successful', async () => {
    return expectSaga(accountSaga)
        .provide([[matchers.call.fn(fakeLogin), session]])
        .put(AccountActions.loginSuccessful(name, session))
        .dispatch(AccountActions.login(name, password))
        .run();
});

test('test login saga failed', async () => {
    const failedError = new ErrorAjax(ErrorAjaxType.INVALID_PASSWORD);
    return expectSaga(accountSaga)
        .provide([[matchers.call.fn(fakeLogin), throwError(failedError)]])
        .put(AccountActions.loginFailed(failedError))
        .dispatch(AccountActions.login(name, password))
        .run();
});

test('test login saga successful with reducer', async () => {
    return expectSaga(accountSaga)
        .provide([[matchers.call.fn(fakeLogin), session]])
        .withReducer(accountReducer)
        .hasFinalState({
            ...accountInitialState,
            name: name,
            session: session,
            isLoginRequesting: false,
        })
        .dispatch(AccountActions.login(name, password))
        .run();
});

test('test login saga failed with reducer', async () => {
    const failedError = new ErrorAjax(ErrorAjaxType.INVALID_PASSWORD);
    return expectSaga(accountSaga)
        .provide([[matchers.call.fn(fakeLogin), throwError(failedError)]])
        .withReducer(accountReducer)
        .hasFinalState({
            ...accountInitialState,
            errorLogin: failedError,
        })
        .dispatch(AccountActions.login(name, password))
        .run();
});

test('test logout saga successful', async () => {
    return expectSaga(accountSaga)
        .provide([[matchers.call.fn(fakeLogout), undefined]])
        .put(AccountActions.logoutSuccessful())
        .dispatch(AccountActions.logout())
        .run();
});
