import { all, takeLatest, call, put, takeEvery } from 'redux-saga/effects';
import { ROOT_API_URL } from 'commons/constants';
import fetchHelper from 'helpers/FetchHelper';
import { get } from 'lodash';
import * as qs from 'query-string';
import * as types from './constants';
import * as actions from './actions';
import { toast } from 'react-toastify';

function* customerMedicalFileCreate({ payload }) {
  const { data } = yield call(requestCustomerMedicalFileCreate, payload);
  if (get(data, 'status_code') === 200) {
    toast.info('Tải tệp lên thành công');
    yield put(actions.customerMedicalFileCreateSuccess(data.data));
    return;
  }
}

function* customerMedicalFileList({ payload }) {
  const { data } = yield call(requestCustomerMedicalFileList, payload);
  if (get(data, 'status_code') === 200) {
    yield put(actions.customerMedicalFileListSuccess(data.data));
    return;
  }
}

function* customerMedicalFileDelete({ payload }) {
  const { data } = yield call(requestCustomerMedicalFileDelete, payload);
  if (get(data, 'status_code') === 200) {
    yield put(actions.customerMedicalFileDeleteSuccess(payload.id));
    return;
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(types.CUSTOMER_MEDICAL_FILE_LIST, customerMedicalFileList),
    takeEvery(types.CUSTOMER_MEDICAL_FILE_CREATE, customerMedicalFileCreate),
    takeLatest(types.CUSTOMER_MEDICAL_FILE_DELETE, customerMedicalFileDelete)
  ]);
}

function requestCustomerMedicalFileDelete(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/customer-medical-file/delete`, {
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

function requestCustomerMedicalFileList(payload) {
  const queryStr = qs.stringify(payload);
  return fetchHelper
    .fetch(`${ROOT_API_URL}/customer-medical-file/list?${queryStr}`, {
      method: 'GET'
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestCustomerMedicalFileCreate(payload) {
  return fetchHelper
    .uploadFile(`${ROOT_API_URL}/customer-medical-file/create`, {
      method: 'POST',
      body: payload
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}
