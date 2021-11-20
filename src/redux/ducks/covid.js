import Narrativa from '../../services/Narrativa';

const SET_DATA = 'covid-metrics/covid/setData';
const SET_IS_FIRST_RENDER = 'covid-metrics/covid/setIsFirstRender';
const SET_TODAYS_DATE = 'covid-metrics/covid/setTodaysDate';

const initialState = {
  data: null,
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
    case SET_DATA:
      return { ...state, data: action.payload };
    case SET_IS_FIRST_RENDER:
      return { ...state, isFirstRender: action.payload };
    case SET_TODAYS_DATE:
      return { ...state, todaysDate: action.payload };
    default:
      return state;
  }
};

export const setData = (payload) => ({
  type: SET_DATA,
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

export const getDataFromAPI = (date) => (dispatch) => {
  Narrativa.getSingleDayInfo(date).then((data) => {
    dispatch(setTodaysDate(date));
    dispatch(setIsFirstRender(false));
    dispatch(setData(data));
  });
};
