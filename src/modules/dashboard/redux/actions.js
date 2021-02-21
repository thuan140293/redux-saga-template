import * as types from "./constants";

export const getWallet = () => ({
  type: types.GET_WALLET,
});

export const getWalletSuccess = (payload) => ({
  type: types.GET_WALLET_SUCCESS,
  payload,
});

export const exchangeGetRate = (payload) => ({
  type: types.EXCHANGE_GET_RATE,
  payload,
});

export const exchangeGetRateSuccess = (payload) => ({
  type: types.EXCHANGE_GET_RATE_SUCCESS,
  payload,
});

export const exchangeCalRate = (payload) => ({
  type: types.EXCHANGE_CAL_RATE,
  payload,
});

export const exchangeCalRateSuccess = (payload) => ({
  type: types.EXCHANGE_CAL_RATE_SUCCESS,
  payload,
});

export const walletTransDepositOnline = (payload, callbackSuccess) => ({
  type: types.WALLET_TRAN_DEPOSIT_ONLINE,
  payload,
  callbackSuccess,
});

export const walletTransDepositCheck = (
  payload,
  callbackSuccess,
  callbackError
) => ({
  type: types.WALLET_TRAN_DEPOSIT_CHECK,
  payload,
  callbackSuccess,
  callbackError,
});

export const walletTransList = (payload) => ({
  type: types.WALLET_TRAN_LIST,
  payload,
});

export const walletTransListSuccess = (payload) => ({
  type: types.WALLET_TRAN_LIST_SUCCESS,
  payload,
});

export const walletTransWithdraw = (payload, callbackSuccess) => ({
  type: types.WALLET_TRAN_WITHDRAW,
  payload,
  callbackSuccess,
});

export const walletTransWithdrawSuccess = (payload) => ({
  type: types.WALLET_TRAN_WITHDRAW_SUCCESS,
  payload,
});

export const walletTransTransfer = (payload, callbackSuccess) => ({
  type: types.WALLET_TRAN_TRANSFER,
  payload,
  callbackSuccess,
});

export const walletTransTransferSuccess = (payload) => ({
  type: types.WALLET_TRAN_TRANSFER_SUCCESS,
  payload,
});

export const wallerGetByEmailOrAddress = (
  payload,
  callbackSuccess,
  callbackError
) => ({
  type: types.WALLET_GET_BY_EMAIL_OR_ADDRESS,
  payload,
  callbackSuccess,
  callbackError,
});

export const getMasterService = (payload) => ({
  type: types.MASTER_SERVICE,
  payload,
});

export const getMasterServiceSuccess = (payload) => ({
  type: types.MASTER_SERVICE_SUCCESS,
  payload,
});

export const getBankList = () => ({
  type: types.GET_BANK_LIST,
});

export const getBankListSuccess = (payload) => ({
  type: types.GET_BANK_LIST_SUCCESS,
  payload,
});

export const getDashboardInfo = () => ({
  type: types.GET_DASHBOARD,
});

export const getDashboardInfoSuccess = (payload) => ({
  type: types.GET_DASHBOARD_SUCCESS,
  payload,
});

export const inviteFriend = (payload, callbackSuccess) => ({
  type: types.INVITE_FRIEND,
  payload,
  callbackSuccess,
});
export const getListPostDashboard = (payload) => ({
  type: types.GET_LIST_POST_DASHBOARD,
  payload,
});

export const getListPostDashboardSuccess = (payload) => ({
  type: types.GET_LIST_POST_DASHBOARD_SUCCESS,
  payload,
});

export const getListPostCateDashboard = (payload) => ({
  type: types.GET_LIST_POST_CATE_DASHBOARD,
  payload,
});

export const getListPostCateDashboardSuccess = (payload) => ({
  type: types.GET_LIST_POST_CATE_DASHBOARD_SUCCESS,
  payload,
});

export const getListNotificationDashboard = (payload) => ({
  type: types.GET_LIST_NOTIFICATION_DASHBOARD,
  payload,
});

export const getListNotificationDashboardSuccess = (payload) => ({
  type: types.GET_LIST_NOTIFICATION_DASHBOARD_SUCCESS,
  payload,
});

export const getRate = (payload, field) => ({
  type: types.GET_RATE,
  payload,
  field,
});

export const getRateSuccess = (payload) => ({
  type: types.GET_RATE_SUCCESS,
  payload,
});

export const changeStatusRead = (payload) => ({
  type: types.READ_NOTIFICATION,
  payload,
});

export const changeStatusReadSuccess = (payload) => ({
  type: types.READ_NOTIFICATION_SUCCESS,
  payload,
});
export const getAdminBank = (payload) => ({
  type: types.GET_ADMIN_BANK,
  payload,
});

export const getAdminBankSuccess = (payload) => ({
  type: types.GET_ADMIN_BANK_SUCCESS,
  payload,
});

export const swapWithdraw = (payload, callbackSuccess) => ({
  type: types.SWAP_WITHDRAW,
  payload,
  callbackSuccess,
});

export const swapWithdrawSuccess = (payload) => ({
  type: types.SWAP_WITHDRAW_SUCCESS,
  payload,
});

export const onConfirmSubscribe = (payload, callbackSuccess) => ({
  type: types.CONFIRM_CURRENCY,
  payload,
  callbackSuccess,
});

export const walletWithdrawTransfer = (payload, callbackSuccess) => ({
  type: types.WALLET_WITHDRAW_TRANSFER,
  payload,
  callbackSuccess,
});

export const walletWithdrawTransferSuccess = (payload) => ({
  type: types.WALLET_WITHDRAW_SUCCESS,
  payload,
});
