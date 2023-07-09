import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import balanceSheetStatementsReducer from './slices/balance-sheet-statements-slice';
import cashFlowStatementsReducer from './slices/cash-flow-statements-slice';
import incomeStatementsReducer from './slices/income-statements-slice';
import stocksSliceReducer from './slices/stocks-slice';

const reducer = {
  stocksSliceReducer,
  incomeStatementsReducer,
  balanceSheetStatementsReducer,
  cashFlowStatementsReducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = import.meta.env.DEV ? [logger] : [];
    return getDefaultMiddleware().concat(...middlewares);
  },
  devTools: import.meta.env.DEV,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
