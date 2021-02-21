import {GET_CITY_SUCCESS, GET_COUNTRY_SUCCESS} from './constants';

const initialState = {
  countries: sessionStorage.getItem('COUNTRIES') ? JSON.parse(sessionStorage.getItem('COUNTRIES')) : [],
  cities: [],
};
export default (state = initialState, action) => {
  const {payload} = action;
  switch (action.type) {
    case GET_CITY_SUCCESS:
      return {
        ...state,
        cities: payload,
      };
    case GET_COUNTRY_SUCCESS: {
      return {
        ...state,
        countries: payload,
      };
    }
    default:
      return {...state};
  }
};
