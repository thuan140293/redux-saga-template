import { all, takeLatest, call, put, takeEvery } from 'redux-saga/effects';
import { ROOT_API_URL } from 'commons/constants';
import fetchHelper from 'helpers/FetchHelper';
import { get } from 'lodash';
import * as qs from 'query-string';
import * as types from './constants';
import * as actions from './actions';
import { toast } from 'react-toastify';

function* getGeneralKeyList({ payload, key }) {
  const { data } = yield call(requestGeneralKeyList, payload);
  if (get(data, 'status_code') === 200) {
    yield put(actions.getGeneralKeyListSuccess({ data: data.data, key }));
    return;
  }
}

function* createCustomerInsurance({ payload }) {
  const { data } = yield call(requestCreateCustomerInsurance, payload);
  if (get(data, 'status_code') === 200) {
    yield put(actions.createCustomerInsuranceSuccess(data.data));
    return;
  }
}

function* updateCustomerInsurance({ payload }) {
  const { data } = yield call(requestUpdateCustomerInsurance, payload);
  if (get(data, 'status_code') === 200) {
    yield put(actions.updateCustomerInsuranceSuccess(data.data));
    return;
  }
}

function* deleteCustomerInsurance({ payload }) {
  const { data } = yield call(requestDeleteCustomerInsurance, payload);
  if (get(data, 'status_code') === 200) {
    toast.info('Xóa thành công');
    yield put(actions.deleteCustomerInsuranceSuccess(payload.id));
    return;
  }
  toast.error('Xóa thất bại');
}

function* createCustomerHealth(action) {
  const { payload, field } = action.payload;
  const { data } = yield call(requestCreateCustomerHealth, payload);
  if (get(data, 'status_code') === 200) {
    yield put(actions.createCustomerHealthSuccess({ data: data.data, field }));
    return;
  }
}

function* updateCustomerHealth(action) {
  const { payload, field } = action.payload;
  const { data } = yield call(requestUpdateCustomerHealth, payload);
  if (get(data, 'status_code') === 200) {
    yield put(actions.updateCustomerHealthSuccess({ data: data.data, field }));
    return;
  }
}

function* deleteCustomerHealth(action) {
  const { payload, field } = action.payload;
  const { data } = yield call(requestDeleteCustomerHealth, payload);
  if (get(data, 'status_code') === 200) {
    yield put(actions.deleteCustomerHealthSuccess({ id: payload.id, field }));
    return;
  }
}

function* createCustomerFamily({ payload }) {
  const { data } = yield call(requestCreateCustomerFamily, payload);
  if (get(data, 'status_code') === 200) {
    yield put(actions.createCustomerFamilySuccess(data.data));
    return;
  }
}

function* updateCustomerFamily({ payload }) {
  const { data } = yield call(requestUpdateCustomerFamily, payload);
  if (get(data, 'status_code') === 200) {
    yield put(actions.updateCustomerFamilySuccess(data.data));
    return;
  }
}

function* deleteCustomerFamily({ payload }) {
  const { data } = yield call(requestDeleteCustomerFamily, payload);
  if (get(data, 'status_code') === 200) {
    yield put(actions.deleteCustomerFamilySuccess(payload.id));
    return;
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(types.GET_GENERAL_KEY_LIST, getGeneralKeyList),
    takeLatest(types.CREATE_CUSTOMER_INSURANCE, createCustomerInsurance),
    takeLatest(types.UPDATE_CUSTOMER_INSURANCE, updateCustomerInsurance),
    takeLatest(types.DELETE_CUSTOMER_INSURANCE, deleteCustomerInsurance),
    takeLatest(types.CREATE_CUSTOMER_HEALTH, createCustomerHealth),
    takeLatest(types.UPDATE_CUSTOMER_HEALTH, updateCustomerHealth),
    takeLatest(types.DELETE_CUSTOMER_HEALTH, deleteCustomerHealth),
    takeLatest(types.CREATE_CUSTOMER_FAMILY, createCustomerFamily),
    takeLatest(types.UPDATE_CUSTOMER_FAMILY, updateCustomerFamily),
    takeLatest(types.DELETE_CUSTOMER_FAMILY, deleteCustomerFamily)
  ]);
}

function requestDeleteCustomerFamily(payload) {
  const queryStr = qs.stringify(payload);
  return fetchHelper
    .fetch(`${ROOT_API_URL}/customer-family/delete?${queryStr}`, {
      method: 'GET'
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestUpdateCustomerFamily(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/customer-family/update`, {
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

function requestCreateCustomerFamily(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/customer-family/create`, {
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

function requestDeleteCustomerHealth(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/customer-health/delete`, {
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

function requestUpdateCustomerHealth(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/customer-health/update`, {
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

function requestCreateCustomerHealth(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/customer-health/create`, {
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

function requestDeleteCustomerInsurance(payload) {
  const queryStr = qs.stringify(payload);
  return fetchHelper
    .fetch(`${ROOT_API_URL}/customer-insurance/delete?${queryStr}`, {
      method: 'GET'
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}


function requestCreateCustomerInsurance(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/customer-insurance/create`, {
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

function requestUpdateCustomerInsurance(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/customer-insurance/update`, {
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

function requestGeneralKeyList(payload) {
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
