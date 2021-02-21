import * as types from "./constants";

export const getListMembershipPlan = (payload) => ({
  type: types.GET_LIST_MEMBERSHIP_PLAN,
  payload,
});

export const getListMembershipPlanSuccess = (payload) => ({
  type: types.GET_LIST_MEMBERSHIP_PLAN_SUCCESS,
  payload,
});

export const setCartData = payload => ({
  type: types.SET_CART_DATA,
  payload
});

export const setCartStep = payload => ({
  type: types.SET_CART_STEP,
  payload
});

export const paymentOrder = (payload, callbackSuccess) => ({
  type: types.PAYMENT_ORDER,
  payload,
  callbackSuccess
});

export const paymentOrderSuccess = payload => ({
  type: types.PAYMENT_ORDER_SUCCESS,
  payload
});