import { all, takeLatest, call, put } from "redux-saga/effects";
import { ROOT_API_URL } from "commons/constants";
import fetchHelper from "helpers/FetchHelper";
import { get } from "lodash";
import * as types from "./constants";
import * as actions from "./actions";

function* getListWalletTranSaction({ payload }) {
  const { data } = yield call(requestWalletTransaction, payload);
  if (get(data, "status_code") === 200) {
    yield put(actions.getListWalletTransactionSuccess(data.data));
    return;
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(types.GET_LIST_WALLET_TRANSACTION, getListWalletTranSaction),
  ]);
}

function requestWalletTransaction(payload) {
    return fetchHelper
      .fetch(`${ROOT_API_URL}/wallet-trans/list?${payload}`, {
        method: "GET",
      })
      .then(([resp, status]) => {
        return {
          data: resp,
          status,
        };
      });
  }
