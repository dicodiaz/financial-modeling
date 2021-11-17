import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import covidReducer from './ducks/covid';

const reducer = combineReducers({
  covidReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
