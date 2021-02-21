import {all, call, put, takeLatest} from 'redux-saga/effects';
// import {showLoader, showMessError} from '../actions/GeneralAction';
// import {ERROR} from '../../constants/messages';
import * as Medical from './actions';
import {get} from 'lodash';
import fetchHelper from '../../../helpers/FetchHelper';
import {ROOT_API_URL} from '../../../commons/constants';
import {GET_MEDICAL, LOAD_MORE_MEDICAL_PROFILE} from './constants';
import {toast} from "react-toastify";

const medicalProfileLimit = 10;
const medicalProfileFirstPage = 1;

function* getMedical({payload}) {
  try {
    const body = {
      code: payload.customerCode,
      verify: payload.verifyCode,
      page: medicalProfileFirstPage,
      limit: medicalProfileLimit,
    };
    const response = yield call(getMedicalApi, body);
    if (response && response.data && response.status === 200) {
      const responseData = get(response, 'data', {});
      yield put(Medical.getMedicalSuccess(responseData));
      if(payload.verifyCode){
        toast(responseData.message);
      }
    }
  } catch (error) {
    // yield put(showMessError(ERROR));
  }
}

function* loadMoreMedicalProfile({payload}) {
  try {
    const body = {
      code: payload.customerCode,
      verify: payload.verifyCode,
      page: payload.page + 1,
      limit: medicalProfileLimit,
    };
    const response = yield call(getMedicalApi, body);
    if (response && response.data && response.status === 200) {
      const responseData = get(response, 'data', {});
      yield put(Medical.loadMoreMedicalProfileSuccess(responseData));
    }
  } catch (error) {
    // yield put(showMessError(ERROR));
  }
}

export default function* root() {
  yield all([
    takeLatest(GET_MEDICAL, getMedical),
    takeLatest(LOAD_MORE_MEDICAL_PROFILE, loadMoreMedicalProfile),
  ]);
}

function getMedicalApi(payload) {
  return fetchHelper
      .fetch(`${ROOT_API_URL}/scan-profile?code=${payload.code}&verify=${payload.verify}&page=${payload.page}&limit=${payload.limit}`, {
        method: 'GET',
      })
      .then(([resp, status]) => {
        return {
          data: resp,
          status,
        };
      });
}
