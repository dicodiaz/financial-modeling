import { StockType } from '../redux/utils/types';

export enum SORT_TYPES {
  'Symbol: A to Z' = 'a-z',
  'Symbol: Z to A' = 'z-a',
  'Price: Lowest to highest' = 'l-h',
  'Price: Highest to lowest' = 'h-l',
}

const sortStocks = (stocks: StockType[], type: string) => {
  const stocksClone: StockType[] = structuredClone(stocks);
  switch (type) {
    case SORT_TYPES['Symbol: A to Z']:
      return stocksClone.sort((stockA: StockType, stockB: StockType) => {
        if (stockA.symbol < stockB.symbol) {
          return -1;
        }
        if (stockA.symbol > stockB.symbol) {
          return 1;
        }
        return 0;
      });
    case SORT_TYPES['Symbol: Z to A']:
      return stocksClone.sort((stockA: StockType, stockB: StockType) => {
        if (stockA.symbol < stockB.symbol) {
          return 1;
        }
        if (stockA.symbol > stockB.symbol) {
          return -1;
        }
        return 0;
      });
    case SORT_TYPES['Price: Lowest to highest']:
      return stocksClone.sort((stockA: StockType, stockB: StockType) => {
        if (stockA.price < stockB.price) {
          return -1;
        }
        if (stockA.price > stockB.price) {
          return 1;
        }
        return 0;
      });
    case SORT_TYPES['Price: Highest to lowest']:
      return stocksClone.sort((stockA: StockType, stockB: StockType) => {
        if (stockA.price < stockB.price) {
          return 1;
        }
        if (stockA.price > stockB.price) {
          return -1;
        }
        return 0;
      });
    default:
      return stocksClone;
  }
};

export default sortStocks;
