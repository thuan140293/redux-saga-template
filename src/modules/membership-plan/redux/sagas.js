import { all, takeLatest, call, put } from 'redux-saga/effects';
import { ROOT_API_URL } from 'commons/constants';
import fetchHelper from 'helpers/FetchHelper';
import { get } from 'lodash';
import * as qs from 'query-string';
import * as types from './constants';
import * as actions from './actions';

function* getListMembershipPlan({ payload }) {
  const { data } = yield call(requestMembershipPlan, payload);
  if (get(data, 'status_code') === 200) {
    yield put(actions.getListMembershipPlanSuccess(data.data));
    return;
  }
}

function* geMyMembership() {
  const { data } = yield call(requestGetMemberShip);
  if (get(data, 'status_code') === 200) {
    yield put(actions.geMyMembershipSuccess(data.data));
    return;
  }
}

function* masterGetByType({ payload }) {
  const { data } = yield call(requestMasterGetByType, payload);
  if (get(data, 'status_code') === 200) {
    yield put(actions.masterGetByTypeSuccess(data.data));
    return;
  }
}

function* onCheckCoupon({ payload, callbackSuccess, callbackError }) {
  const { data } = yield call(requestCheckCoupon, payload);
  if (get(data, 'status_code') === 200) {
    callbackSuccess(data.data);
    return;
  }
  callbackError(data.data);
}

function* changeMembership({ payload, callbackSuccess, callbackError }) {
  const { data } = yield call(requestChangeMembership, payload);
  if (get(data, 'status_code') === 200) {
    callbackSuccess();
    // check payment via alepay
    if (get(data, 'data.alepayData')) {
      window.open(get(data, 'data.alepayData.checkoutUrl'), "_blank");
    }
    return;
  }
  callbackError();
}

export default function* rootSaga() {
  yield all([
    takeLatest(types.GET_LIST_MEMBERSHIP_PLAN, getListMembershipPlan),
    takeLatest(types.GET_MY_MEMBERSHIP, geMyMembership),
    takeLatest(types.MASTER_GET_BY_TYPE, masterGetByType),
    takeLatest(types.CHECK_COUPON, onCheckCoupon),
    takeLatest(types.CHANGE_MEMBERSHIP, changeMembership),
  ]);
}

function requestChangeMembership(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/membership/plan/change`, {
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

function requestCheckCoupon(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/check-coupon`, {
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

function requestMasterGetByType(payload) {
  const queryStr = qs.stringify(payload);
  return fetchHelper
    .fetch(`${ROOT_API_URL}/master/get-by-type?${queryStr}`, {
      method: 'GET',
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestGetMemberShip() {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/membership/plan/get-my-membership`, {
      method: 'GET',
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
