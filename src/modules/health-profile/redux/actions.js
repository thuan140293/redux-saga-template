import * as types from "./constants";

export const getGeneralKeyList = (payload, key) => ({
  type: types.GET_GENERAL_KEY_LIST,
  payload,
  key
});

export const getGeneralKeyListSuccess = payload => ({
  type: types.GET_GENERAL_KEY_LIST_SUCCESS,
  payload
});

export const updateCustomerInsurance = payload => ({
  type: types.UPDATE_CUSTOMER_INSURANCE,
  payload
});

export const updateCustomerInsuranceSuccess = payload => ({
  type: types.UPDATE_CUSTOMER_INSURANCE_SUCCESS,
  payload
});

export const createCustomerInsurance = payload => ({
  type: types.CREATE_CUSTOMER_INSURANCE,
  payload
});

export const createCustomerInsuranceSuccess = payload => ({
  type: types.CREATE_CUSTOMER_INSURANCE_SUCCESS,
  payload
});

export const deleteCustomerInsurance = payload => ({
  type: types.DELETE_CUSTOMER_INSURANCE,
  payload
});

export const deleteCustomerInsuranceSuccess = payload => ({
  type: types.DELETE_CUSTOMER_INSURANCE_SUCCESS,
  payload
});

export const createCustomerHealth = payload => ({
  type: types.CREATE_CUSTOMER_HEALTH,
  payload
});

export const createCustomerHealthSuccess = payload => ({
  type: types.CREATE_CUSTOMER_HEALTH_SUCCESS,
  payload
});

export const updateCustomerHealth = payload => ({
  type: types.UPDATE_CUSTOMER_HEALTH,
  payload
});

export const updateCustomerHealthSuccess = payload => ({
  type: types.UPDATE_CUSTOMER_HEALTH_SUCCESS,
  payload
});

export const deleteCustomerHealth = payload => ({
  type: types.DELETE_CUSTOMER_HEALTH,
  payload
});

export const deleteCustomerHealthSuccess = payload => ({
  type: types.DELETE_CUSTOMER_HEALTH_SUCCESS,
  payload
});

export const createCustomerFamily = payload => ({
  type: types.CREATE_CUSTOMER_FAMILY,
  payload
});

export const createCustomerFamilySuccess = payload => ({
  type: types.CREATE_CUSTOMER_FAMILY_SUCCESS,
  payload
});

export const updateCustomerFamily = payload => ({
  type: types.UPDATE_CUSTOMER_FAMILY,
  payload
});

export const updateCustomerFamilySuccess = payload => ({
  type: types.UPDATE_CUSTOMER_FAMILY_SUCCESS,
  payload
});

export const deleteCustomerFamily = payload => ({
  type: types.DELETE_CUSTOMER_FAMILY,
  payload
});

export const deleteCustomerFamilySuccess = payload => ({
  type: types.DELETE_CUSTOMER_FAMILY_SUCCESS,
  payload
});
