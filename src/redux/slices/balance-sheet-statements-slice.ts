import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { API_KEY, BASE_URL } from '../utils/constants';
import { BalanceSheetStatementsState } from '../utils/types';

export const getBalanceSheetStatementsBySymbol = createAsyncThunk<
  BalanceSheetStatementsState['balanceSheetStatements'],
  string,
  { rejectValue: string }
>(
  'balance-sheet-statements/getBalanceSheetStatementsBySymbol',
  async (symbol: string, { rejectWithValue }) => {
    const localStorageBalanceSheetStatements = localStorage.getItem(
      `balance_sheet_statements_${symbol}`,
    );
    if (localStorageBalanceSheetStatements) {
      return JSON.parse(localStorageBalanceSheetStatements);
    }

    const { status, data, response } = await axios
      .get(`${BASE_URL}/balance-sheet-statement/${symbol}?apikey=${API_KEY}`)
      .catch((error) => error);
    if (status === 200) {
      localStorage.setItem(`balance_sheet_statements_${symbol}`, JSON.stringify(data));
      return data;
    }
    return rejectWithValue(response?.data?.['Error Message']);
  },
);

const initialState: BalanceSheetStatementsState = {};

const balanceSheetStatementsSlice = createSlice({
  name: 'balance-sheet-statements',
  initialState,
  reducers: {
    setBalanceSheetStatements: (
      state,
      { payload }: PayloadAction<BalanceSheetStatementsState['balanceSheetStatements']>,
    ) => {
      state.balanceSheetStatements = payload;
    },
    setBalanceSheetStatementsError: (
      state,
      { payload }: PayloadAction<BalanceSheetStatementsState['error']>,
    ) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBalanceSheetStatementsBySymbol.fulfilled, (state, { payload }) => {
        state.balanceSheetStatements = payload;
        state.error = undefined;
      })
      .addCase(getBalanceSheetStatementsBySymbol.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export const { setBalanceSheetStatements, setBalanceSheetStatementsError } =
  balanceSheetStatementsSlice.actions;

export const selectBalanceSheetStatements = (state: RootState) =>
  state.balanceSheetStatementsReducer.balanceSheetStatements;
export const selectBalanceSheetStatementsError = (state: RootState) =>
  state.balanceSheetStatementsReducer.error;

export default balanceSheetStatementsSlice.reducer;
