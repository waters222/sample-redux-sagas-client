import { all, call, take } from 'redux-saga/effects';
import { TodoActionType } from '../stores/todo/types';
import { TodoActions } from '../stores/todo/action';

function* todo() {
    while (true) {
        const { title } = yield take(TodoActionType.START);
        yield call(TodoActions.setTitle, title);

        const action = yield take([
            TodoActionType.SELECT_DATE,
            TodoActionType.CANCEL,
        ]);
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
