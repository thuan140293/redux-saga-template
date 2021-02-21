import { all, takeLatest, call, put, takeEvery } from "redux-saga/effects";
import { ROOT_API_URL } from "commons/constants";
import fetchHelper from "helpers/FetchHelper";
import { get } from "lodash";
import * as qs from "query-string";
import * as types from "./constants";
import * as actions from "./actions";

function* getWallet() {
  const { data } = yield call(requestGetWallet);
  if (get(data, "status_code") === 200) {
    yield put(actions.getWalletSuccess(data.data));
    return;
  }
}

function* exchangeGetRate({ payload }) {
  const { data } = yield call(requestExchangeGetRate, payload);
  if (get(data, "status_code") === 200) {
    yield put(actions.exchangeGetRateSuccess(data.data));
    return;
  }
}
function* getAdminBank({ payload }) {
  const { data } = yield call(requestAdminBank, payload);
  if (get(data, "status_code") === 200) {
    yield put(actions.getAdminBankSuccess(data.data));
    return;
  }
}

function* exchangeCalRate({ payload }) {
  const { data } = yield call(requestExchangeCalRate, payload);
  if (get(data, "status_code") === 200) {
    yield put(actions.exchangeCalRateSuccess(data.data));
    return;
  }
}

function* walletTransDepositOnline({ payload, callbackSuccess }) {
  const { data } = yield call(requestWalletTransDepositOnline, payload);
  if (get(data, "status_code") === 200) {
    callbackSuccess(data.data);
    return;
  }
}

function* walletTransList({ payload }) {
  const { data } = yield call(requestWalletTransList, payload);
  if (get(data, "status_code") === 200) {
    yield put(actions.walletTransListSuccess(data.data));
    return;
  }
}

function* getMasterService({ payload }) {
  const { data } = yield call(requestGetMasterService, payload);
  if (get(data, "status_code") === 200) {
    yield put(actions.getMasterServiceSuccess(data.data));
    return;
  }
}

function* getBankList() {
  const { data } = yield call(requestGetBankList);
  if (get(data, "status_code") === 200) {
    yield put(actions.getBankListSuccess(data.data));
    return;
  }
}

function* getDashboardInfo() {
  const { data } = yield call(requestGetDashboardInfo);
  if (get(data, "status_code") === 200) {
    yield put(actions.getDashboardInfoSuccess(data.data));
    return;
  }
}

function* walletTranTransfer({ payload, callbackSuccess }) {
  const { data } = yield call(requestWalletTransTrade, payload);
  if (get(data, "status_code") === 200) {
    yield put(actions.walletTransWithdrawSuccess(payload.amount));
    callbackSuccess();
    return;
  }
}

function* walletGetEmailOrAddress({ payload, callbackSuccess, callbackError }) {
  const { data } = yield call(requestWalletGetEmailOrAddress, payload);
  if (get(data, "status_code") === 200) {
    callbackSuccess(data.data);
    return;
  }
  callbackError();
}

function* walletTransTransfer({ payload, callbackSuccess }) {
  const { data } = yield call(requestWalletTransTransfer, payload);
  if (get(data, "status_code") === 200) {
    yield put(actions.walletTransTransferSuccess(payload.amount));
    callbackSuccess();
    return;
  }
}

function* walletTranDepositCheck({ payload, callbackSuccess, callbackError }) {
  const { data } = yield call(requestWalletTranDepositCheck, payload);
  if (get(data, "status_code") === 200) {
    callbackSuccess();
    return;
  }
  callbackError();
}

function* inviteFriend({ payload, callbackSuccess }) {
  const { data } = yield call(requestInviteFriend, payload);
  if (get(data, "status_code") === 200) {
    callbackSuccess();
  }
}

function* getListPost({ payload }) {
  const { data } = yield call(requestListPost, payload);
  if (get(data, "status_code") === 200) {
    yield put(actions.getListPostDashboardSuccess(get(data, "data")));
    return;
  }
}

function* getListPostCate({ payload }) {
  const { data } = yield call(requestListPostCate, payload);
  if (get(data, "status_code") === 200) {
    yield put(actions.getListPostDashboardSuccess(get(data, "data")));
    return;
  }
}

function* getListNotification({ payload }) {
  const { data } = yield call(requestListNotification, payload);
  if (get(data, "status_code") === 200) {
    yield put(actions.getListNotificationDashboardSuccess(get(data, "data")));
    return;
  }
}

function* getRate({ payload, field }) {
  const { data } = yield call(requestGetRate, payload);
  if (get(data, "status_code") === 200) {
    yield put(actions.getRateSuccess({ data: data.data, field }));
    return;
  }
}

function* readNotification({ payload }) {
  const { data } = yield call(requestReadNotification, payload);
  if (get(data, "status_code") === 200) {
    yield put(actions.changeStatusReadSuccess(get(data, "data")));
    return;
  }
}

function* swapWithDrawData({ payload, callbackSuccess }) {
  const { data } = yield call(requestSwap, payload);
  if (get(data, "status_code") === 200) {
    yield put(actions.swapWithdrawSuccess(data.data));
    callbackSuccess();
    return;
  }
}

function* onConfirmSubscribe({ payload, callbackSuccess }) {
  const { data } = yield call(confirmSubscribe, payload);
  if (get(data, "status_code") === 200) {
    callbackSuccess();
    return;
  }
}

function* onWithdrawWallet({ payload, callbackSuccess }) {
  const { data } = yield call(requestWalletWithdraw, payload);
  if (get(data, "status_code") === 200) {
    callbackSuccess();
    return;
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(types.GET_WALLET, getWallet),
    takeLatest(types.EXCHANGE_GET_RATE, exchangeGetRate),
    takeLatest(types.EXCHANGE_CAL_RATE, exchangeCalRate),
    takeLatest(types.WALLET_TRAN_DEPOSIT_ONLINE, walletTransDepositOnline),
    takeLatest(types.WALLET_TRAN_LIST, walletTransList),
    takeLatest(types.MASTER_SERVICE, getMasterService),
    takeLatest(types.GET_BANK_LIST, getBankList),
    takeLatest(types.GET_DASHBOARD, getDashboardInfo),
    takeLatest(types.WALLET_TRAN_WITHDRAW, walletTranTransfer),
    takeLatest(types.WALLET_GET_BY_EMAIL_OR_ADDRESS, walletGetEmailOrAddress),
    takeLatest(types.WALLET_TRAN_TRANSFER, walletTransTransfer),
    takeLatest(types.WALLET_TRAN_DEPOSIT_CHECK, walletTranDepositCheck),
    takeLatest(types.INVITE_FRIEND, inviteFriend),
    takeLatest(types.GET_LIST_POST_DASHBOARD, getListPost),
    takeLatest(types.GET_LIST_POST_CATE_DASHBOARD, getListPostCate),
    takeLatest(types.GET_LIST_NOTIFICATION_DASHBOARD, getListNotification),
    takeEvery(types.GET_RATE, getRate),
    takeLatest(types.GET_ADMIN_BANK, getAdminBank),
    takeLatest(types.READ_NOTIFICATION, readNotification),
    takeLatest(types.SWAP_WITHDRAW, swapWithDrawData),
    takeLatest(types.CONFIRM_CURRENCY, onConfirmSubscribe),
    takeLatest(types.WALLET_WITHDRAW_TRANSFER, onWithdrawWallet),
  ]);
}

// Request Api
function requestGetRate(payload) {
  const queryStr = qs.stringify(payload);
  return fetchHelper
    .fetch(`${ROOT_API_URL}/exchange/get-rate?${queryStr}`, {
      method: "GET",
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestInviteFriend(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/invite-friend`, {
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

function requestWalletTranDepositCheck(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/wallet-trans/deposit/check?data=${payload.data}`, {
      method: "GET",
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}
function requestWalletTransTransfer(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/wallet-trans/transfer`, {
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

function requestWalletGetEmailOrAddress(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/wallet/getByEmailOrAddress?txtSearch=${payload}`, {
      method: "GET",
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestWalletTransTrade(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/wallet-trans/trade`, {
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
function requestGetDashboardInfo() {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/dashboard/info`, {
      method: "GET",
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestGetBankList() {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/bank/list`, {
      method: "GET",
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestGetMasterService(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/master/get-by-type?type=${payload}`, {
      method: "GET",
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestWalletTransList(payload) {
  const queryStr = qs.stringify(payload);
  return fetchHelper
    .fetch(`${ROOT_API_URL}/wallet-trans/list?${queryStr}`, {
      method: "GET",
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestWalletTransDepositOnline(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/wallet-trans/deposit/online`, {
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

function requestExchangeCalRate(payload) {
  const queryStr = qs.stringify(payload);
  return fetchHelper
    .fetch(`${ROOT_API_URL}/exchange/cal-rate?${queryStr}`, {
      method: "GET",
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestExchangeGetRate() {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/exchange/get-rate`, {
      method: "GET",
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}
function requestAdminBank() {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/master/get-admin-bank`, {
      method: "GET",
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestGetWallet() {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/wallet/get`, {
      method: "GET",
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestListPost() {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/post/list`, {
      method: "GET",
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestListPostCate() {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/post-cate/list`, {
      method: "GET",
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestListNotification(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/customer-notification/list?${payload}`, {
      method: "GET",
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}
function requestReadNotification(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/customer-notification/update-status`, {
      method: "post",
      body: JSON.stringify(payload),
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestSwap(payload) {
  console.log(payload);
  return fetchHelper
    .fetch(`${ROOT_API_URL}/wallet-trans/swap`, {
      method: "post",
      body: JSON.stringify(payload),
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function confirmSubscribe(payload) {
  console.log(payload);
  return fetchHelper
    .fetch(`${ROOT_API_URL}/buy/pocket-active`, {
      method: "post",
      body: JSON.stringify(payload),
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestWalletWithdraw(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/wallet/withdraw`, {
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
