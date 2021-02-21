import produce from "immer";
import * as types from './constants';
const initialState = {
  membershipPlanList:[],
  myMembershipData: {},
  paymentsService: []
};

export default function MembershipPlanReducer(state = initialState, action) {
  const { payload } = action;
  return produce(state, draft => {
    switch (action.type) {
      case types.GET_LIST_MEMBERSHIP_PLAN_SUCCESS:
        draft.membershipPlanList = payload;
        break;
      case types.GET_MY_MEMBERSHIP_SUCCESS:
        draft.myMembershipData = payload;
        break;
      case types.MASTER_GET_BY_TYPE_SUCCESS: 
        draft.paymentsService = payload;
        break;
      default:
        break;
    }
  })
}
