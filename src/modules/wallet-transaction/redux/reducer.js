import produce from "immer";
import * as types from './constants';
const initialState = {
  walletTransactionList: {}
};

export default function WalletTransactionReducer(state = initialState, action) {
  const { payload } = action;
  return produce(state, draft => {
    switch (action.type) {
      case types.GET_LIST_WALLET_TRANSACTION_SUCCESS:
        draft.walletTransactionList = payload;
        break;
      default:
        break;
    }
  })
}
