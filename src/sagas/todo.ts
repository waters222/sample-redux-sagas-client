import { all, call, put, take } from 'redux-saga/effects';
import { TodoActionType } from '../stores/todo/types';
import { TodoActions } from '../stores/todo/action';

function* todo() {
    while (true) {
        let action = yield take(TodoActionType.START);
        const { title } = action.payload;
        console.log(`saga title: ${title}`);
        yield put(TodoActions.setTitle(title));
        action = yield take([
            TodoActionType.SELECT_DATE,
            TodoActionType.CANCEL,
        ]);
        console.log(`action: ${action}`);
        if (action.type === TodoActionType.CANCEL) {
            continue;
        }
        const { start, end } = action;
        yield call(TodoActions.setDate, start, end);

        console.log(title);
    }
}

export default function* todoSaga() {
    yield all([todo()]);
}
