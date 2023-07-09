import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { API_KEY, BASE_URL } from '../utils/constants';
import { CashFlowStatementsState } from '../utils/types';

export const getCashFlowStatementsBySymbol = createAsyncThunk<
  CashFlowStatementsState['cashFlowStatements'],
  string,
  { rejectValue: string }
>(
  'cash-flow-statements/getCashFlowStatementsBySymbol',
  async (symbol: string, { rejectWithValue }) => {
    const localStorageCashFlowStatements = localStorage.getItem(`cash_flow_statements_${symbol}`);
    if (localStorageCashFlowStatements) {
      return JSON.parse(localStorageCashFlowStatements);
    }

    const { status, data, response } = await axios
      .get(`${BASE_URL}/cash-flow-statement/${symbol}?apikey=${API_KEY}`)
      .catch((error) => error);
    if (status === 200) {
      localStorage.setItem(`cash_flow_statements_${symbol}`, JSON.stringify(data));
      return data;
    }
    return rejectWithValue(response?.data?.['Error Message']);
  },
);

const initialState: CashFlowStatementsState = {};

const cashFlowStatementsSlice = createSlice({
  name: 'cash-flow-statements',
  initialState,
  reducers: {
    setCashFlowStatements: (
      state,
      { payload }: PayloadAction<CashFlowStatementsState['cashFlowStatements']>,
    ) => {
      state.cashFlowStatements = payload;
    },
    setCashFlowStatementsError: (
      state,
      { payload }: PayloadAction<CashFlowStatementsState['error']>,
    ) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCashFlowStatementsBySymbol.fulfilled, (state, { payload }) => {
        state.cashFlowStatements = payload;
        state.error = undefined;
      })
      .addCase(getCashFlowStatementsBySymbol.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export const { setCashFlowStatements, setCashFlowStatementsError } =
  cashFlowStatementsSlice.actions;

export const selectCashFlowStatements = (state: RootState) =>
  state.cashFlowStatementsReducer.cashFlowStatements;
export const selectCashFlowStatementsError = (state: RootState) =>
  state.cashFlowStatementsReducer.error;

export default cashFlowStatementsSlice.reducer;
