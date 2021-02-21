import * as types from "./constants";

export const getListWalletTransaction = (payload) => ({
  type: types.GET_LIST_WALLET_TRANSACTION,
  payload,
});
export const getListWalletTransactionSuccess = (payload) => ({
  type: types.GET_LIST_WALLET_TRANSACTION_SUCCESS,
  payload,
});
