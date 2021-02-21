import { all, takeLatest, call, put, takeEvery } from "redux-saga/effects";
import { ROOT_API_URL } from 'commons/constants';
import fetchHelper from 'helpers/FetchHelper';
import { get } from 'lodash';
import * as qs from 'query-string';
import * as types from './constants';
import * as actions from './actions';

// Medical Profile
function* getListMedicalProfile({ payload }) {
  const { data } = yield call(requestGetListMedicalProfile, payload);
  if (get(data, "status_code") === 200) {
    yield put(actions.getListMedicalProfileSuccess(data.data));
    return;
  }
}

function* deleteMedicalProfile({ payload, callbackSuccess }) {
  const { data } = yield call(requestDeleteMedicalProfile, payload);
  if (get(data, "status_code") === 200) {
    callbackSuccess();
    return;
  }
}

function* createMedicalProfile({ payload, callbackSuccess }) {
  const { data } = yield call(requestCreateMedicalProfile, payload);
  if (get(data, "status_code") === 200) {
    callbackSuccess();
    return;
  }
}

function* updateMedicalProfile({ payload, callbackSuccess }) {
  const { data } = yield call(requestUpdateMedicalProfile, payload);
  if (get(data, "status_code") === 200) {
    callbackSuccess();
    return;
  }
}

function* getDetailMedicalProfile({ payload }) {
  const { data } = yield call(requestDetailMedicalProfile, payload);
  if (get(data, "status_code") === 200) {
    yield put(actions.getDetailMedicalProfileSuccess(data.data));
    return;
  }
}
// End medical profile

// Medical profile schedule
function* customerMedicalScheduleList({ payload }) {
  const { data } = yield call(requestCustomerMedicalScheduleList, payload);
  if (get(data, "status_code") === 200) {
    yield put(actions.customerMedicalScheduleListSuccess({ data: data.data, type: payload.type }));
    return;
  }
}

function* customerMedicalScheduleCreate({ payload, callbackSuccess }) {
  const { data } = yield call(requestCustomerMedicalScheduleCreate, payload);
  if (get(data, "status_code") === 200) {
    callbackSuccess();
    return;
  }
}

function* customerMedicalScheduleUpdate({ payload, callbackSuccess }) {
  const { data } = yield call(requestCustomerMedicalScheduleUpdate, payload);
  if (get(data, "status_code") === 200) {
    callbackSuccess();
    return;
  }
}

function* customerMedicalScheduleDelete({ payload, callbackSuccess }) {
  const { data } = yield call(requestCustomerMedicalScheduleDelete, { id: payload.id });
  if (get(data, "status_code") === 200) {
    callbackSuccess();
    yield put(actions.customerMedicalScheduleDeleteSuccess(payload));
    return;
  }
}
// End medical profile schedule list

function* getListHospital({ payload }) {
  const { data } = yield call(requestGetListHospital, payload);
  if (get(data, "status_code") === 200) {
    yield put(actions.getListHospitalSuccess(data.data));
    return;
  }
}

function* createHospital({ payload, callbackSuccess }) {
  const { data } = yield call(requestCreateHospital, payload);
  if (get(data, "status_code") === 200) {
    callbackSuccess(data.data);
    return;
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(types.GET_LIST_MEDICAL_PROFILE, getListMedicalProfile),
    takeLatest(types.DELETE_MEDICAL_PROFILE, deleteMedicalProfile),
    takeLatest(types.GET_LIST_HOSPITAL, getListHospital),
    takeLatest(types.CREATE_MEDICAL_PROFILE, createMedicalProfile),
    takeLatest(types.UPDATE_MEDICAL_PROFILE, updateMedicalProfile),
    takeLatest(types.GET_DETAIL_MEDICAL_PROFILE, getDetailMedicalProfile),
    takeEvery(types.CUSTOMER_MEDICAL_SCHEDULE_LIST, customerMedicalScheduleList),
    takeLatest(types.CUSTOMER_MEDICAL_SCHEDULE_CREATE, customerMedicalScheduleCreate),
    takeLatest(types.CUSTOMER_MEDICAL_SCHEDULE_UPDATE, customerMedicalScheduleUpdate),
    takeLatest(types.CUSTOMER_MEDICAL_SCHEDULE_DELETE, customerMedicalScheduleDelete),
    takeLatest(types.HOSPITAL_CREATE, createHospital),
  ]);
}

// Request Api
function requestCreateHospital(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/hospital/create`, {
      method: "POST",
      body: JSON.stringify(payload)
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestCustomerMedicalScheduleDelete(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/customer-medical-schedule/delete`, {
      method: "POST",
      body: JSON.stringify(payload)
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestCustomerMedicalScheduleUpdate(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/customer-medical-schedule/update`, {
      method: "PUT",
      body: JSON.stringify(payload)
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestCustomerMedicalScheduleCreate(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/customer-medical-schedule/create`, {
      method: "POST",
      body: JSON.stringify(payload)
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestCustomerMedicalScheduleList(payload) {
  const queryStr = qs.stringify(payload);
  return fetchHelper
    .fetch(`${ROOT_API_URL}/customer-medical-schedule/list?${queryStr}`, {
      method: "GET"
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestGetListHospital(payload) {
  const queryStr = qs.stringify(payload);
  return fetchHelper
    .fetch(`${ROOT_API_URL}/hospital/list?${queryStr}`, {
      method: "GET"
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}
// Medical Profile
function requestDetailMedicalProfile(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/customer-medical-profile/detail?id=${payload}`, {
      method: "GET"
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestUpdateMedicalProfile(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/customer-medical-profile/update`, {
      method: "PUT",
      body: JSON.stringify(payload)
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestCreateMedicalProfile(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/customer-medical-profile/create`, {
      method: "POST",
      body: JSON.stringify(payload)
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestDeleteMedicalProfile(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/customer-medical-profile/delete`, {
      method: "POST",
      body: JSON.stringify(payload)
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestGetListMedicalProfile(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/customer-medical-profile/list`, {
      method: "POST",
      body: JSON.stringify(payload)
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}
// End medical profile
