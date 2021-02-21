import produce from "immer";
import * as types from './constants';
import { CART_DATA_KEY, CURRENT_STEP_CART_KEY } from "commons/constants";
const initialState = {
  membershipPlanList: [],
  cartData: JSON.parse(localStorage.getItem(CART_DATA_KEY)) || [],
  cartStep: JSON.parse(localStorage.getItem(CURRENT_STEP_CART_KEY)) || 1,
};

export default function CartReducer(state = initialState, action) {
  const { payload } = action;
  return produce(state, draft => {
    switch (action.type) {
      case types.GET_LIST_MEMBERSHIP_PLAN_SUCCESS:
        draft.membershipPlanList = payload;
        break;
      case types.SET_CART_DATA:
        const { cartData, cartStep } = payload;
        draft.cartData = cartData;
        draft.cartStep = cartStep;
        localStorage.setItem(CART_DATA_KEY, JSON.stringify(cartData));
        localStorage.setItem(CURRENT_STEP_CART_KEY, cartStep);
        break;
      case types.SET_CART_STEP:
        draft.cartStep = payload;
        localStorage.setItem(CURRENT_STEP_CART_KEY, payload);
        break;
      case types.PAYMENT_ORDER_SUCCESS:
        draft.cartStep = 3;
        draft.cartData = [];
        localStorage.removeItem(CART_DATA_KEY);
        localStorage.setItem(CURRENT_STEP_CART_KEY, 3);
        break;
      default:
        break;
    }
  })
}
