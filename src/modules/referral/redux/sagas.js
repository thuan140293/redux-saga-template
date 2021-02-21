import {all, call, put, takeLatest} from 'redux-saga/effects';
import {ROOT_API_URL} from '../../../commons/constants';
import {GET_REFERRAL, GET_YOUR_NETWORK} from './constants';
import {getReferralSuccess, getYourNetworkSuccess} from './actions';
import fetchHelper from '../../../helpers/FetchHelper';

function* getReferral() {
  try {
    const response = yield call(getReferralFromAPI);
    if (response.data.status_code === 200) {
      yield put(getReferralSuccess(response.data.data));
    }
  } catch (error) {
    // yield put(showMessError(ERROR));
  }
}

function* getYourNetwork(data) {
  try {
    const response = yield call(getYourNetworkFromAPI, data);
    if (response.data.status_code === 200) {
      yield put(getYourNetworkSuccess(response.data));
    }
  } catch (error) {
    // yield put(showMessError(ERROR));
  }
}

export default function* root() {
  yield all([
    yield takeLatest(GET_REFERRAL, getReferral),
    yield takeLatest(GET_YOUR_NETWORK, getYourNetwork),
  ]);
}

const getReferralFromAPI = () => {
  return fetchHelper
      .fetch(`${ROOT_API_URL}/ref-info-user`, {
        method: 'GET',
      })
      .then(([resp, status]) => {
        return {
          data: resp,
          status,
        };
      });
};

const getYourNetworkFromAPI = (data) => {
  let customerId = data.payload;
  return fetchHelper
      .fetch(`${ROOT_API_URL}/binary-tree/list?customer_id=${customerId}`, {
        method: 'GET',
      })
      .then(([resp, status]) => {
        return {
          data: resp,
          status,
        };
      });
};

