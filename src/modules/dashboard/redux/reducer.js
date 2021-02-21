import produce from "immer";
import * as types from "./constants";
import { cloneDeep, get } from "lodash";
const initialState = {
  walletData: {},
  exchangeData: {},
  walletTransHistory: {
    data: [],
  },
  masterService: [],
  bankAccountList: [],
  dashboardInfo: {},
  postData: {},
  notificationList: {},
  rateIcbToVnd: {
    rate: 1
  },
  rateIcbToUsd: {
    rate: 1
  },
  adminBank: {}
};

export default function DashboardReducer(state = initialState, action) {
  const { payload } = action;
  return produce(state, (draft) => {
    switch (action.type) {
      case types.GET_WALLET_SUCCESS:
        draft.walletData = payload;
        break;
      case types.EXCHANGE_CAL_RATE_SUCCESS:
        draft.exchangeData = payload;
        break;
      case types.WALLET_TRAN_LIST_SUCCESS:
        draft.walletTransHistory = payload;
        break;
      case types.MASTER_SERVICE_SUCCESS:
        draft.masterService = payload;
        break;
      case types.GET_BANK_LIST_SUCCESS:
        draft.bankAccountList = payload;
        break;
      case types.GET_DASHBOARD_SUCCESS:
        draft.dashboardInfo = payload;
        break;
      case types.WALLET_TRAN_TRANSFER_SUCCESS:
      case types.WALLET_TRAN_WITHDRAW_SUCCESS:
        const walletData = cloneDeep(state.walletData);
        walletData.amount = walletData.amount - payload;
        draft.walletData = walletData;
        break;
      case types.GET_LIST_POST_DASHBOARD_SUCCESS:
      case types.GET_LIST_POST_CATE_DASHBOARD_SUCCESS:
        draft.postData = payload;
        break;
      case types.GET_LIST_NOTIFICATION_DASHBOARD_SUCCESS:
        draft.notificationList = payload;
        break;
      case types.READ_NOTIFICATION_SUCCESS:
        let newState = cloneDeep(state.notificationList);
        let index = get(newState, "data").findIndex((item) => item.id === payload.id);
        if (index !== -1) {
          newState.data[index].isRead = 1;
        }
        draft.notificationList = newState;
        break;
      case types.GET_RATE_SUCCESS: {
        const { data, field} = payload;
        draft[field] = data;
        break;
      }
      case types.GET_ADMIN_BANK_SUCCESS: {
        draft.adminBank = payload;
        break;
      }
      
      default:
        break;
    }
  });
}
