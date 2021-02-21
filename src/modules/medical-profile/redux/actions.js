import * as types from './constants';


// Customer medical schedule
export const customerMedicalScheduleDelete = (payload, callbackSuccess) => ({
  type: types.CUSTOMER_MEDICAL_SCHEDULE_DELETE,
  payload,
  callbackSuccess
});

export const customerMedicalScheduleDeleteSuccess = payload => ({
  type: types.CUSTOMER_MEDICAL_SCHEDULE_DELETE_SUCCESS,
  payload
});

export const customerMedicalScheduleCreate = (payload, callbackSuccess) => ({
  type: types.CUSTOMER_MEDICAL_SCHEDULE_CREATE,
  payload,
  callbackSuccess
});

export const customerMedicalScheduleUpdate = (payload, callbackSuccess) => ({
  type: types.CUSTOMER_MEDICAL_SCHEDULE_UPDATE,
  payload,
  callbackSuccess
});

export const customerMedicalScheduleList = payload => ({
  type: types.CUSTOMER_MEDICAL_SCHEDULE_LIST,
  payload
});

export const customerMedicalScheduleListSuccess = payload => ({
  type: types.CUSTOMER_MEDICAL_SCHEDULE_LIST_SUCCESS,
  payload
});
// End customer medical schedule

// Medical Profile
export const getDetailMedicalProfile = payload => ({
  type: types.GET_DETAIL_MEDICAL_PROFILE,
  payload
});

export const getDetailMedicalProfileSuccess = payload => ({
  type: types.GET_DETAIL_MEDICAL_PROFILE_SUCCESS,
  payload
});

export const getListMedicalProfile = payload => ({
  type: types.GET_LIST_MEDICAL_PROFILE,
  payload
});

export const getListMedicalProfileSuccess = (payload) => ({
  type: types.GET_LIST_MEDICAL_PROFILE_SUCCESS,
  payload
});

export const deleteMedicalProfile = (payload, callbackSuccess) => ({
  type: types.DELETE_MEDICAL_PROFILE,
  payload,
  callbackSuccess
});

export const createMedicalProfile = (payload, callbackSuccess) => ({
  type: types.CREATE_MEDICAL_PROFILE,
  payload,
  callbackSuccess
});

export const updateMedicalProfile = (payload, callbackSuccess) => ({
  type: types.UPDATE_MEDICAL_PROFILE,
  payload,
  callbackSuccess
});
// End Medical Profile

export const getListHospital = payload => ({
  type: types.GET_LIST_HOSPITAL,
  payload
});

export const getListHospitalSuccess = payload => ({
  type: types.GET_LIST_HOSPITAL_SUCCESS,
  payload
});


export const createHospital = (payload, callbackSuccess) => ({
  type: types.HOSPITAL_CREATE,
  payload,
  callbackSuccess
});
