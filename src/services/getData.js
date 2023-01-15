export const BASE_URL = 'https://financialmodelingprep.com/api/v3/';
export const API_KEY = 'b42d51408c4062b56d497817eedc4e73';

export const getSymbolList = async () => {
  const url = `${BASE_URL}financial-statement-symbol-lists?apikey=${API_KEY}`;
  const response = await fetch(url);
  return response.json();
};

export const getIncomeStatementsBySymbol = async (symbol) => {
  const url = `${BASE_URL}income-statement/${symbol}?apikey=${API_KEY}`;
  const response = await fetch(url);
  return response.json();
};
