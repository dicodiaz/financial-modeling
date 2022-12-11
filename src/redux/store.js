import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import financialModelingReducer from './ducks/financialModeling';

const reducer = combineReducers({
  financialModelingReducer,
});

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;
