import { getIncomeStatementsBySymbol, getSymbolList } from '../../services/getData';

const SET_SYMBOL_LIST = 'financial-modeling/financialModeling/setSymbolList';
const SET_INCOME_STATEMENTS = 'financial-modeling/financialModeling/setIncomeStatements';
const SET_IS_FIRST_RENDER = 'financial-modeling/financialModeling/setIsFirstRender';
const SET_TODAYS_DATE = 'financial-modeling/financialModeling/setTodaysDate';

const initialState = {
  symbolList: null,
  incomeStatements: null,
  isFirstRender: true,
  todaysDate: null,
  covidDataTotalMock: {
    today_confirmed: 0,
    today_deaths: 0,
    today_recovered: 0,
    today_new_confirmed: 0,
    today_new_deaths: 0,
    today_new_recovered: 0,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SYMBOL_LIST:
      return { ...state, symbolList: action.payload };
    case SET_INCOME_STATEMENTS:
      return { ...state, incomeStatements: action.payload };
    case SET_IS_FIRST_RENDER:
      return { ...state, isFirstRender: action.payload };
    case SET_TODAYS_DATE:
      return { ...state, todaysDate: action.payload };
    default:
      return state;
  }
};

const setSymbolList = (payload) => ({
  type: SET_SYMBOL_LIST,
  payload,
});

const setIncomeStatements = (payload) => ({
  type: SET_INCOME_STATEMENTS,
  payload,
});

export const setIsFirstRender = (payload) => ({
  type: SET_IS_FIRST_RENDER,
  payload,
});

export const setTodaysDate = (payload) => ({
  type: SET_TODAYS_DATE,
  payload,
});

export const getSymbolListFromAPI = () => async (dispatch) => {
  const symbolList = await getSymbolList();
  symbolList.sort();
  dispatch(setSymbolList(symbolList));
};

export const getIncomeStatementsBySymbolFromAPI = (symbol) => async (dispatch) => {
  const incomeStatements = await getIncomeStatementsBySymbol(symbol);
  dispatch(setIncomeStatements(incomeStatements));
};
