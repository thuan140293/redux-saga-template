import {
  GET_MEDICAL,
  GET_MEDICAL_SUCCESS,
  LOAD_MORE_MEDICAL_PROFILE,
  LOAD_MORE_MEDICAL_PROFILE_SUCCESS,
  RESET_MEDICAL,
} from './constants';

export const resetMedical = () => {
  return {
    type: RESET_MEDICAL,
  };
};

export const getMedical = (data) => {
  return {
    type: GET_MEDICAL,
    payload: data,
  };
};
export const getMedicalSuccess = (data) => {
  return {
    type: GET_MEDICAL_SUCCESS,
    payload: data,
  };
};
export const loadMoreMedicalProfile = (data) => {
  return {
    type: LOAD_MORE_MEDICAL_PROFILE,
    payload: data,
  };
};
export const loadMoreMedicalProfileSuccess = (data) => {
  return {
    type: LOAD_MORE_MEDICAL_PROFILE_SUCCESS,
    payload: data,
  };
};


