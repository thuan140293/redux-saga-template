import {all, takeLatest, call, put} from 'redux-saga/effects';
import {ROOT_API_URL} from 'commons/constants';
import fetchHelper from 'helpers/FetchHelper';
import {get} from 'lodash';
import * as types from './constants';
import * as actions from './actions';

function* getListWalletTranSaction({payload}) {
  const {data} = yield call(requestWalletTransaction, payload);
  if (get(data, 'status_code') === 200) {
    yield put(actions.getListCommissionsSuccess(data.data));
    return;
  }
}

function* walletTranTransfer({ payload, callbackSuccess }) {
  const { data } = yield call(requestWalletTransTrade, payload);
  if (get(data, "status_code") === 200) {
    callbackSuccess();
    return;
  }
}


export default function* rootSaga() {
  yield all([
    takeLatest(types.GET_LIST_COMMISSIONS, getListWalletTranSaction),
    takeLatest(types.WALLET_TRAN_WITHDRAW, walletTranTransfer),
  ]);
}

function requestWalletTransTrade(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/wallet-trans/earn`, {
      method: "POST",
      body: JSON.stringify(payload),
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestWalletTransaction(payload) {
  return fetchHelper
      .fetch(`${ROOT_API_URL}/wallet-trans/revenue/list?${payload}`, {
        method: 'GET',
      })
      .then(([resp, status]) => {
        return {
          data: resp,
          status,
        };
      });
}
