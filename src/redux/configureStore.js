import { applyMiddleware, createStore } from 'redux';
import loggerMiddleware from './middleware/logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [loggerMiddleware, sagaMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(
    rootReducer,
    initialState,
    composedEnhancers
  );
  sagaMiddleware.run(rootSaga);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }
  return store;
}
