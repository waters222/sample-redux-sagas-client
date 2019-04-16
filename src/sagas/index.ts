import { call, spawn } from 'redux-saga/effects';
import accountSaga from './account';
import todoSaga from './todo';

export default function* rootSaga() {
    const sagas = [accountSaga, todoSaga];
    for (const saga of sagas) {
        yield spawn(function*() {
            while (true) {
                try {
                    yield call(saga);
                    break;
                } catch (err) {
                    console.log(`saga error: ${err.message}`);
                }
            }
        });
    }
}
