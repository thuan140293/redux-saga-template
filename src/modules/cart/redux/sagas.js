import { all, takeLatest, call, put } from 'redux-saga/effects';
import { ROOT_API_URL } from 'commons/constants';
import fetchHelper from 'helpers/FetchHelper';
import { get } from 'lodash';
import * as types from './constants';
import * as actions from './actions';

function* getListMembershipPlan({ payload }) {
  const { data } = yield call(requestMembershipPlan, payload);
  if (get(data, 'status_code') === 200) {
    yield put(actions.getListMembershipPlanSuccess(data.data));
    return;
  }
}

function* paymentOrder({ payload, callbackSuccess }) {
  const { data } = yield call(requestPaymentOrder, payload);
  if (get(data, 'status_code') === 200) {
    yield put(actions.paymentOrderSuccess());
    callbackSuccess();
    return;
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(types.GET_LIST_MEMBERSHIP_PLAN, getListMembershipPlan),
    takeLatest(types.PAYMENT_ORDER, paymentOrder),
  ]);
}

function requestPaymentOrder(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/payment-order`, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestMembershipPlan(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/membership/plan/list`, {
      method: 'GET',
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}
