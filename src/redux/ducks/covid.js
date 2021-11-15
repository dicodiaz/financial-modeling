import Narrativa from '../../services/Narrativa';

const SET_DATA = 'covid-metrics/covid/setData';

const initialState = {
  data: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export const setData = (payload) => ({
  type: SET_DATA,
  payload,
});

export const getDataFromAPI = (date) => (dispatch) => {
  Narrativa.getSingleDayInfo(date).then((data) => dispatch(setData(data)));
};
