import { getSymbolList } from '../../services/getData';

const SET_SYMBOL_LIST = 'financial-modeling/financialModeling/setSymbolList';

const initialState = {
  symbolList: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SYMBOL_LIST:
      return { ...state, symbolList: action.payload };
    default:
      return state;
  }
};

const setSymbolList = (payload) => ({
  type: SET_SYMBOL_LIST,
  payload,
});

export const getSymbolListFromAPI = () => async (dispatch) => {
  const symbolList = await getSymbolList();
  symbolList.sort();
  dispatch(setSymbolList(symbolList));
};
