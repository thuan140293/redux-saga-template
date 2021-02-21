import {GET_CITY, GET_CITY_SUCCESS, GET_COUNTRY, GET_COUNTRY_SUCCESS} from './constants';

export const getDataCountries = () => {
  return {
    type: GET_COUNTRY,
  };
};
export const getDataCountriesSuccess = (data) => {
  return {
    type: GET_COUNTRY_SUCCESS,
    payload: data,
  };
};
export const getDataCities = (cityName) => {
  return {
    type: GET_CITY,
    cityName,
  };
};
export const getDataCitiesSuccess = (data) => {
  return {
    type: GET_CITY_SUCCESS,
    payload: data,
  };
};

