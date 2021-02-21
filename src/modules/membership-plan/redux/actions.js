import * as types from "./constants";

export const getListMembershipPlan = (payload) => ({
  type: types.GET_LIST_MEMBERSHIP_PLAN,
  payload,
});
export const getListMembershipPlanSuccess = (payload) => ({
  type: types.GET_LIST_MEMBERSHIP_PLAN_SUCCESS,
  payload,
});

export const geMyMembership = payload => ({
  type: types.GET_MY_MEMBERSHIP,
  payload
});

export const geMyMembershipSuccess = payload => ({
  type: types.GET_MY_MEMBERSHIP_SUCCESS,
  payload
});

export const masterGetByType = payload => ({
  type: types.MASTER_GET_BY_TYPE,
  payload
});

export const masterGetByTypeSuccess = payload => ({
  type: types.MASTER_GET_BY_TYPE_SUCCESS,
  payload
});

export const checkCoupon = (payload, callbackSuccess, callbackError) => ({
  type: types.CHECK_COUPON,
  payload,
  callbackSuccess,
  callbackError
});

export const changeMembership = (payload, callbackSuccess, callbackError) => ({
  type: types.CHANGE_MEMBERSHIP,
  payload,
  callbackSuccess,
  callbackError
});

