import * as types from './constants';

export const getListCommissions = (payload) => ({
  type: types.GET_LIST_COMMISSIONS,
  payload,
});
export const getListCommissionsSuccess = (payload) => ({
  type: types.GET_LIST_COMMISSIONS_SUCCESS,
  payload,
});

export const walletTransWithdraw = (payload, callbackSuccess) => ({
  type: types.WALLET_TRAN_WITHDRAW,
  payload,
  callbackSuccess
});

