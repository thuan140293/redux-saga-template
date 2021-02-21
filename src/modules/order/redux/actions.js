import * as types from './constants';

export const getListOrder = (payload) => ({
  type: types.GET_LIST_ORDER,
  payload,
});
export const getListOrderSuccess = (payload) => ({
  type: types.GET_LIST_ORDER_SUCCESS,
  payload,
});

export const getDetailOrder = (payload) => ({
  type: types.GET_DETAIL_ORDER,
  payload,
});
export const getDetailOrderSuccess = (payload) => ({
  type: types.GET_DETAIL_ORDER_SUCCESS,
  payload,
});
