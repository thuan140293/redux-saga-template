import produce from 'immer';
import * as types from './constants';
const initialState = {
  orderList: {},
  orderDetail: {},
};

export default function OrderReducer(state = initialState, action) {
  const {payload} = action;
  return produce(state, (draft) => {
    switch (action.type) {
      case types.GET_LIST_ORDER_SUCCESS:
        draft.orderList = payload;
        break;
      case types.GET_DETAIL_ORDER_SUCCESS:
        draft.orderDetail = payload;
        break;
      default:
        break;
    }
  });
}
