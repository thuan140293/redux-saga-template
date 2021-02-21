import { all, takeLatest, call, put } from 'redux-saga/effects';
import { ROOT_API_URL } from 'commons/constants';
import fetchHelper from 'helpers/FetchHelper';
import { get } from 'lodash';
import * as types from './constants';
import * as actions from './actions';
import * as qs from 'query-string';

function* getListTestGen({ payload }) {
  const { data } = yield call(requestListTestGen);
  if (get(data, 'status_code') === 200) {
    yield put(actions.getListTestGenSuccess(data.data));
    return;
  }
}

function* getGeneralKeyList({ payload, key }) {
  const { data } = yield call(requestGetGeneralKeyList, payload);
  if (get(data, 'status_code') === 200) {
    yield put(actions.getGeneralKeyListSuccess({
      data: data.data,
      key
    }));
    return;
  }
}

function* getListCountry() {
  const { data } = yield call(requestGetListCountry);
  if (get(data, 'status_code') === 200) {
    yield put(actions.getListCountrySuccess(data.data));
    return;
  }
}

function* getListCity({ payload }) {
  const { data } = yield call(requestGetListCity, payload);
  if (get(data, 'status_code') === 200) {
    yield put(actions.getListCitySuccess(data.data));
    return;
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(types.GET_LIST_TEST_GEN, getListTestGen),
    takeLatest(types.GET_GENERAL_KEY_LIST, getGeneralKeyList),
    takeLatest(types.GET_LIST_COUNTRY, getListCountry),
    takeLatest(types.GET_LIST_CITY, getListCity),
  ]);
}

function requestGetListCity(payload) {
  const queryStr = qs.stringify(payload)
  return fetchHelper
    .fetch(`${ROOT_API_URL}/cities?${queryStr}`, {
      method: 'GET',
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestGetListCountry() {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/countries`, {
      method: 'GET',
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestGetGeneralKeyList(payload) {
  const queryStr = qs.stringify(payload);
  return fetchHelper
    .fetch(`${ROOT_API_URL}/general-key/list?${queryStr}`, {
      method: 'GET',
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestListTestGen(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/list-package`, {
      method: 'GET',
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}
