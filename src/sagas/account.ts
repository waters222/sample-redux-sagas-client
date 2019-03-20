import {all, takeLatest} from 'redux-saga/effects';
import { AccountActionType } from '../stores/account/types';
import { AccountActions } from '../stores/account/actions';

function* login(action: AccountActions) {
    if (action.type === AccountActionType.LOGIN) {
        const { name, password } = action.payload;
        console.log(`login saga called, name: ${name}, password:${password}`);
    }

    return true;
}

function* logout() {
    console.log(`logout called`);
    return true;
}

function* changeName(action: AccountActions) {
    if (action.type === AccountActionType.CHANGE_NAME) {
        console.log(`change name sagas: ${action.payload}`);
    }
    return true;
}

// function* loginFlow() {
//     try {
//         while (true) {
//             const action = yield take(AccountActionType.LOGIN);
//             if (action.type === AccountActionType.LOGIN) {
//                 const { name, password } = action.payload;
//                 console.log(
//                     `loginFlow login name: ${name}, password:${password}`
//                 );
//                 yield take(AccountActionType.LOGOUT);
//                 console.log('loginFlow logout');
//                 throw new Error('haha');
//             }
//         }
//     } finally {
//         console.log('login flow cancelled');
//     }
// }
export default function* accountSaga() {
    yield all([
        takeLatest(AccountActionType.LOGIN, login),
        takeLatest(AccountActionType.LOGOUT, logout),
        takeLatest(AccountActionType.CHANGE_NAME, changeName),
    ]);
}