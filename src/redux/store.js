import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import covidReducer from './ducks/covid';

const reducer = combineReducers({
  covidReducer,
});

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;
