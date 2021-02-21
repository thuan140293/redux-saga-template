import {GET_REFERRAL_SUCCESS, GET_YOUR_NETWORK_SUCCESS} from './constants';
import {map} from 'lodash';

const initialState = {
  listRef: [],
  binaryTreeData: []
};
export default (state = initialState, action) => {
  const {payload} = action;
  switch (action.type) {
    case GET_REFERRAL_SUCCESS: {
      const listRef = map(payload, (ref, index)=>({
        id: ref.id,
        key: ref.username,
        parent: parseInt(ref.sponsor_id),
        label: ref.username,
        level: ref.level,
        full_name: ref.full_name,
        sponsor_id: ref.sponsor_id,
      }));

      return {
        ...state,
        listRef,
      };
    }
    case GET_YOUR_NETWORK_SUCCESS: {
      return {
        ...state,
        binaryTreeData: payload,
      };
    }
    default:
      return {...state};
  }
};
