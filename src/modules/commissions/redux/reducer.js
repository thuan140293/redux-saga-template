import produce from "immer";
import * as types from './constants';
const initialState = {
  commissionsList: []
};

export default function WalletTransactionReducer(state = initialState, action) {
  const { payload } = action;
  return produce(state, draft => {
    switch (action.type) {
      case types.GET_LIST_COMMISSIONS_SUCCESS:
        draft.commissionsList = payload;
        break;
      default:
        break;
    }
  })
}
