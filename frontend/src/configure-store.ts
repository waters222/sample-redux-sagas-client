import { Store, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
// `react-router-redux` is deprecated, so we use `connected-react-router`.
// This provides a Redux middleware which connects to our `react-router` instance.
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
// Import the state interface and our combined reducers/sagas.
import { ApplicationState, createRootReducer } from './stores';
import { History } from 'history';
import rootSaga from './sagas';

function configureStore(
    history: History,
    initialState: ApplicationState
): Store<ApplicationState> {
    // create the composing function for our middleware
    // create the redux-saga middleware
    const sagaMiddleware = createSagaMiddleware();

    // We'll create our store with the combined reducers/sagas, and the initial Redux state that
    // we'll be passing from our entry point.
    const enhancer =
        process.env.NODE_ENV === 'development'
            ? composeWithDevTools(
                  applyMiddleware(routerMiddleware(history), sagaMiddleware)
              )
            : applyMiddleware(routerMiddleware(history), sagaMiddleware);

    const store = createStore(
        createRootReducer(history),
        initialState,
        enhancer
    );

    // Don't forget to run the root saga, and return the store object.
    sagaMiddleware.run(rootSaga);
    return store;
}

export default configureStore;