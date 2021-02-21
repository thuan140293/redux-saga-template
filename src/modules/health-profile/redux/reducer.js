import produce from "immer";
import * as types from './constants';
const initialState = {
  listInsurance: [],
  listBlood: [],
  listMedicalHistory: [],
  listLanguage: [],
  listFamily: [],
  listAllergy: []
};

export default function CartReducer(state = initialState, action) {
  const { payload } = action;
  return produce(state, draft => {
    switch (action.type) {
      case types.GET_GENERAL_KEY_LIST_SUCCESS:
        const { data, key } = payload;
        draft[key] = data;
        break;
      default:
        break;
    }
  })
}
