import { StockType, STOCK_EXCHANGES, STOCK_TYPES } from '../redux/utils/types';

export const mockStock: StockType = {
  symbol: 'A',
  name: 'Agilent Technologies, Inc.',
  price: 117,
  exchange: 'New York Stock Exchange',
  exchangeShortName: STOCK_EXCHANGES.NYSE,
  type: STOCK_TYPES.Stock,
};

const mockStocks: StockType[] = [
  mockStock,
  {
    symbol: 'AA',
    name: 'Alcoa Corporation',
    price: 34.09,
    exchange: 'New York Stock Exchange',
    exchangeShortName: STOCK_EXCHANGES.NYSE,
    type: STOCK_TYPES.Stock,
  },
  {
    symbol: 'AAA',
    name: 'AXS First Priority CLO Bond ETF',
    price: 24.58,
    exchange: 'New York Stock Exchange Arca',
    exchangeShortName: STOCK_EXCHANGES.AMEX,
    type: STOCK_TYPES.ETF,
  },
  {
    symbol: 'AABPX',
    name: 'American Beacon Balanced Fund',
    price: 11.09,
    exchange: 'Nasdaq',
    exchangeShortName: STOCK_EXCHANGES.NASDAQ,
    type: STOCK_TYPES.Trust,
  },
  {
    symbol: 'AAC',
    name: 'Ares Acquisition Corporation',
    price: 10.57,
    exchange: 'New York Stock Exchange',
    exchangeShortName: STOCK_EXCHANGES.NYSE,
    type: STOCK_TYPES.Stock,
  },
  {
    symbol: 'AAC-UN',
    name: 'Ares Acquisition Corporation',
    price: 10.7101,
    exchange: 'New York Stock Exchange',
    exchangeShortName: STOCK_EXCHANGES.NYSE,
    type: STOCK_TYPES.Stock,
  },
  {
    symbol: 'AAC-WT',
    name: 'Ares Acquisition Corporation Re',
    price: 0.85,
    exchange: 'New York Stock Exchange',
    exchangeShortName: STOCK_EXCHANGES.NYSE,
    type: STOCK_TYPES.Stock,
  },
  {
    symbol: 'AACG',
    name: 'ATA Creativity Global',
    price: 1.38,
    exchange: 'NASDAQ Global Market',
    exchangeShortName: STOCK_EXCHANGES.NASDAQ,
    type: STOCK_TYPES.Stock,
  },
  {
    symbol: 'AACI',
    name: 'Armada Acquisition Corp. I',
    price: 10.41,
    exchange: 'NASDAQ Global Market',
    exchangeShortName: STOCK_EXCHANGES.NASDAQ,
    type: STOCK_TYPES.Stock,
  },
  {
    symbol: 'AACIU',
    name: 'Armada Acquisition Corp. I',
    price: 10.3,
    exchange: 'NASDAQ Global Market',
    exchangeShortName: STOCK_EXCHANGES.NASDAQ,
    type: STOCK_TYPES.Stock,
  },
];

export default mockStocks;
