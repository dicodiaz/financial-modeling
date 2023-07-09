import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { API_KEY, BASE_URL } from '../utils/constants';
import { StockState, StockType, STOCK_EXCHANGES } from '../utils/types';

export const getStocks = createAsyncThunk<StockState['stocks'], void, { rejectValue: string }>(
  'stocks/getStocks',
  async (_, { rejectWithValue }) => {
    const localStorageStocks = localStorage.getItem('stocks');
    if (localStorageStocks) {
      return JSON.parse(localStorageStocks);
    }

    const { status, data, response } = await axios
      .get(`${BASE_URL}/stock/list?apikey=${API_KEY}`)
      .catch((error) => error);
    if (status === 200) {
      const filteredData = data.filter((stock: StockType) => {
        return (
          Object.values(STOCK_EXCHANGES).includes(stock.exchangeShortName) &&
          Object.values(stock).every(Boolean)
        );
      });
      localStorage.setItem('stocks', JSON.stringify(filteredData));
      return filteredData;
    }
    return rejectWithValue(response?.data?.['Error Message']);
  },
);

const initialState: StockState = {};

const stocksSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    setStocks: (state, { payload }: PayloadAction<StockState['stocks']>) => {
      state.stocks = payload;
    },
    setStocksError: (state, { payload }: PayloadAction<StockState['error']>) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStocks.fulfilled, (state, { payload }) => {
        state.stocks = payload;
      })
      .addCase(getStocks.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export const { setStocks, setStocksError } = stocksSlice.actions;

export const selectStocks = (state: RootState) => state.stocksSliceReducer.stocks;
export const selectStocksError = (state: RootState) => state.stocksSliceReducer.error;

export default stocksSlice.reducer;
