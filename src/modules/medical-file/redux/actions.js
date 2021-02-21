import * as types from "./constants";

export const customerMedicalFileList = (payload) => ({
  type: types.CUSTOMER_MEDICAL_FILE_LIST,
  payload,
});

export const customerMedicalFileListSuccess = (payload) => ({
  type: types.CUSTOMER_MEDICAL_FILE_LIST_SUCCESS,
  payload,
});

export const customerMedicalFileCreate = (payload) => ({
  type: types.CUSTOMER_MEDICAL_FILE_CREATE,
  payload,
});

export const customerMedicalFileCreateSuccess = (payload) => ({
  type: types.CUSTOMER_MEDICAL_FILE_CREATE_SUCCESS,
  payload,
});

export const customerMedicalFileDelete = (payload) => ({
  type: types.CUSTOMER_MEDICAL_FILE_DELETE,
  payload,
});

export const customerMedicalFileDeleteSuccess = (payload) => ({
  type: types.CUSTOMER_MEDICAL_FILE_DELETE_SUCCESS,
  payload,
});