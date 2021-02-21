import * as types from './constants';

export const getListTestGen = (payload) => ({
  type: types.GET_LIST_TEST_GEN,
  payload,
});

export const getListTestGenSuccess = (payload) => ({
  type: types.GET_LIST_TEST_GEN_SUCCESS,
  payload,
});

export const getGeneralKeyList = (payload, key) => ({
  type: types.GET_GENERAL_KEY_LIST,
  payload,
  key
});

export const getGeneralKeyListSuccess = payload => ({
  type: types.GET_GENERAL_KEY_LIST_SUCCESS,
  payload
});

export const getListCountry = () => ({
  type: types.GET_LIST_COUNTRY
});

export const getListCountrySuccess = payload => ({
  type: types.GET_LIST_COUNTRY_SUCCESS,
  payload
});

export const getListCity = payload => ({
  type: types.GET_LIST_CITY,
  payload
});

export const getListCitySuccess = payload => ({
  type: types.GET_LIST_CITY_SUCCESS,
  payload
});
