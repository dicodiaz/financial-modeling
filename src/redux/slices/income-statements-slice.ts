import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { API_KEY, BASE_URL } from '../utils/constants';
import { IncomeStatementsState } from '../utils/types';

export const getIncomeStatementsBySymbol = createAsyncThunk<
  IncomeStatementsState['incomeStatements'],
  string,
  { rejectValue: string }
>('income-statements/getIncomeStatementsBySymbol', async (symbol: string, { rejectWithValue }) => {
  const localStorageIncomeStatements = localStorage.getItem(`income_statements_${symbol}`);
  if (localStorageIncomeStatements) {
    return JSON.parse(localStorageIncomeStatements);
  }

  const { status, data, response } = await axios
    .get(`${BASE_URL}/income-statement/${symbol}?apikey=${API_KEY}`)
    .catch((error) => error);
  if (status === 200) {
    localStorage.setItem(`income_statements_${symbol}`, JSON.stringify(data));
    return data;
  }
  return rejectWithValue(response?.data?.['Error Message']);
});

const initialState: IncomeStatementsState = {};

const incomeStatementsSlice = createSlice({
  name: 'income-statements',
  initialState,
  reducers: {
    setIncomeStatements: (
      state,
      { payload }: PayloadAction<IncomeStatementsState['incomeStatements']>,
    ) => {
      state.incomeStatements = payload;
    },
    setIncomeStatementsError: (
      state,
      { payload }: PayloadAction<IncomeStatementsState['error']>,
    ) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIncomeStatementsBySymbol.fulfilled, (state, { payload }) => {
        state.incomeStatements = payload;
        state.error = undefined;
      })
      .addCase(getIncomeStatementsBySymbol.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export const { setIncomeStatements, setIncomeStatementsError } = incomeStatementsSlice.actions;

export const selectIncomeStatements = (state: RootState) =>
  state.incomeStatementsReducer.incomeStatements;
export const selectIncomeStatementsError = (state: RootState) =>
  state.incomeStatementsReducer.error;

export default incomeStatementsSlice.reducer;
