import produce from 'immer';
import * as types from './constants';
const initialState = {
  testGenList: [],
  listRelation: [],
  listCountry: [],
  listCity: []
};

export default function TestGenReducer(state = initialState, action) {
  const { payload } = action;
  return produce(state, (draft) => {
    switch (action.type) {
      case types.GET_LIST_TEST_GEN_SUCCESS:
        draft.testGenList = payload;
        break;
      case types.GET_GENERAL_KEY_LIST_SUCCESS:
        const { data, key } = payload;
        draft[key] = data;
        break;
      case types.GET_LIST_COUNTRY_SUCCESS:
        draft.listCountry = payload;
        break;
      case types.GET_LIST_CITY_SUCCESS:
        draft.listCity = payload;
        break;
      default:
        break;
    }
  });
}
