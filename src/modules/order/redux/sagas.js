import {all, takeLatest, call, put} from 'redux-saga/effects';
import {ROOT_API_URL} from 'commons/constants';
import fetchHelper from 'helpers/FetchHelper';
import {get} from 'lodash';
import * as types from './constants';
import * as actions from './actions';

function* getListOrder({payload}) {
  const {data} = yield call(requestOderList, payload);
  if (get(data, 'status_code') === 200) {
    yield put(actions.getListOrderSuccess(data.data));
    return;
  }
}

function* getDetaiOrder({payload}) {
  const {data} = yield call(requestOderDetail, payload);
  if (get(data, 'status_code') === 200) {
    yield put(actions.getDetailOrderSuccess(data.data));
    return;
  }
}


export default function* rootSaga() {
  yield all([
    takeLatest(types.GET_LIST_ORDER, getListOrder),
    takeLatest(types.GET_DETAIL_ORDER, getDetaiOrder),
  ]);
}

function requestOderList(payload) {
  return fetchHelper
      .fetch(`${ROOT_API_URL}/order/list?${payload}`, {
        method: 'GET',
      })
      .then(([resp, status]) => {
        return {
          data: resp,
          status,
        };
      });
}

function requestOderDetail(payload) {
  return fetchHelper
      .fetch(`${ROOT_API_URL}/order-detail?order_id=${payload}`, {
        method: 'GET',
      })
      .then(([resp, status]) => {
        return {
          data: resp,
          status,
        };
      });
}
