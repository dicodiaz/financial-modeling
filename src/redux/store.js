import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import counterReducer from './ducks/counter';

const reducer = combineReducers({
  counterReducer,
});

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;
