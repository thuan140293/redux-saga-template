import {all, call, put, takeEvery, takeLatest} from 'redux-saga/effects';
// import {hideLoader, showMessError} from '../actions/GeneralAction';
// import {ERROR} from '../../constants/messages';
import fetchHelper from '../../../helpers/FetchHelper';
import {ROOT_API_URL} from '../../../commons/constants';
import {GET_CITY, GET_COUNTRY} from './constants';
import {getDataCitiesSuccess, getDataCountriesSuccess} from './actions';

function* getListCoutries() {
  try {
    const request = yield call(getListCountriesFromApi);
    // checkUnAuthorize(request.data.status_code);
    sessionStorage.setItem('COUNTRIES', JSON.stringify(request.data.data));
    yield put(getDataCountriesSuccess(request.data.data));
    // yield put(hideLoader());
  } catch (error) {
    // yield put(showMessError(ERROR));
  }
}
function* getListCities({cityName}) {
  try {
    const request = yield call(getListCitiesFromApi, cityName);
    // checkUnAuthorize(request.data.status_code);
    yield put(getDataCitiesSuccess(request.data.data));
  } catch (error) {
    // yield put(showMessError(error));
  }
}

export function* watchGetListCountries() {
  yield takeLatest(GET_COUNTRY, getListCoutries);
}
export function* watchGetListCities() {
  yield takeEvery(GET_CITY, getListCities);
}

export default function* root() {
  yield all([
    watchGetListCountries(),
    watchGetListCities(),
  ]);
}

const getListCountriesFromApi = async () => {
  return fetchHelper
      .fetch(`${ROOT_API_URL}/countries`, {
        method: 'GET',
      })
      .then(([resp, status]) => {
        return {
          data: resp,
          status,
        };
      });
};
const getListCitiesFromApi = async (cityName) => {
  return fetchHelper
      .fetch(`${ROOT_API_URL}/cities?city_name=${cityName}`, {
        method: 'GET',
      })
      .then(([resp, status]) => {
        return {
          data: resp,
          status,
        };
      });
};
