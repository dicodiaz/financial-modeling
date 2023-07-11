import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import balanceSheetStatementsReducer from './slices/balance-sheet-statements-slice';
import cashFlowStatementsReducer from './slices/cash-flow-statements-slice';
import incomeStatementsReducer from './slices/income-statements-slice';
import stocksSliceReducer from './slices/stocks-slice';

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  stocksSliceReducer,
  incomeStatementsReducer,
  balanceSheetStatementsReducer,
  cashFlowStatementsReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    preloadedState,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      const middlewares = import.meta.env.DEV ? [logger] : [];
      return getDefaultMiddleware().concat(...middlewares);
    },
    devTools: import.meta.env.DEV,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
