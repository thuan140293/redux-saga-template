import produce from 'immer';
import { USER_INFO_KEY } from 'commons/constants';
import { cloneDeep, get, set } from 'lodash';
import {
  CREATE_CUSTOMER_FAMILY_SUCCESS,
  CREATE_CUSTOMER_HEALTH_SUCCESS,
  CREATE_CUSTOMER_INSURANCE_SUCCESS,
  DELETE_CUSTOMER_FAMILY_SUCCESS,
  DELETE_CUSTOMER_HEALTH_SUCCESS,
  DELETE_CUSTOMER_INSURANCE_SUCCESS,
  UPDATE_CUSTOMER_FAMILY_SUCCESS,
  UPDATE_CUSTOMER_HEALTH_SUCCESS,
  UPDATE_CUSTOMER_INSURANCE_SUCCESS,
} from 'modules/health-profile/redux/constants';
import * as types from './constants';
import { UPDATED_AVATAR } from './constants';

const initialState = {
  userInfo: JSON.parse(localStorage.getItem(USER_INFO_KEY)) || {},
};

const updateUserInfoToLocal = (userInfo) => {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
};

export default function AuthReducer(state = initialState, action) {
  const { payload } = action;
  return produce(state, (draft) => {
    switch (action.type) {
      case types.LOGIN_SUCCESS:
        draft.userInfo = payload;
        break;
      case CREATE_CUSTOMER_INSURANCE_SUCCESS: {
        const userInfo = cloneDeep(state.userInfo);
        userInfo.customerInsurances.push(payload);
        draft.userInfo = userInfo;
        updateUserInfoToLocal(userInfo);
        break;
      }

      case DELETE_CUSTOMER_INSURANCE_SUCCESS: {
        const userInfo = cloneDeep(state.userInfo);
        userInfo.customerInsurances = userInfo.customerInsurances.filter((item) => item.id !== payload);
        draft.userInfo = userInfo;
        updateUserInfoToLocal(userInfo);
        break;
      }

      case UPDATE_CUSTOMER_INSURANCE_SUCCESS: {
        const userInfo = cloneDeep(state.userInfo);
        userInfo.customerInsurances = userInfo.customerInsurances.map((item) => {
          if (item.id === payload.id) {
            return payload;
          }
          return item;
        });
        draft.userInfo = userInfo;
        updateUserInfoToLocal(userInfo);
        break;
      }

      case CREATE_CUSTOMER_HEALTH_SUCCESS: {
        const { data, field } = payload;
        const userInfo = cloneDeep(state.userInfo);
        if (get(userInfo, `customerHealths[${field}]`)) {
          if (field === 'blood') {
            userInfo.customerHealths[field] = [data];
          } else {
            userInfo.customerHealths[field].push(data);
          }
        } else {
          userInfo.customerHealths = {
            ...userInfo.customerHealths,
            [field]: [data]
          }
        }
        draft.userInfo = userInfo;
        updateUserInfoToLocal(userInfo);
        break;
      }

      case UPDATE_CUSTOMER_HEALTH_SUCCESS: {
        const { data, field } = payload;
        const userInfo = cloneDeep(state.userInfo);
        const pos = (get(userInfo, `customerHealths.${field}`) || []).findIndex((item) => item.id === data.id);
        set(userInfo, `customerHealths.${field}[${pos}]`, data);
        draft.userInfo = userInfo;
        updateUserInfoToLocal(userInfo);
        break;
      }

      case DELETE_CUSTOMER_HEALTH_SUCCESS: {
        const { id, field } = payload;
        const userInfo = cloneDeep(state.userInfo);
        const pos = (get(userInfo, `customerHealths.${field}`) || []).findIndex((item) => item.id === id);
        userInfo.customerHealths[field].splice(pos, 1);
        draft.userInfo = userInfo;
        updateUserInfoToLocal(userInfo);
        break;
      }

      case UPDATE_CUSTOMER_FAMILY_SUCCESS: {
        const userInfo = cloneDeep(state.userInfo);
        userInfo.customerFamilies = userInfo.customerFamilies.map((item) => {
          if (item.id === payload.id) {
            return payload;
          }
          return item;
        });
        draft.userInfo = userInfo;
        updateUserInfoToLocal(userInfo);
        break;
      }

      case CREATE_CUSTOMER_FAMILY_SUCCESS: {
        const userInfo = cloneDeep(state.userInfo);
        userInfo.customerFamilies.push(payload);
        draft.userInfo = userInfo;
        updateUserInfoToLocal(userInfo);
        break;
      }

      case DELETE_CUSTOMER_FAMILY_SUCCESS: {
        const userInfo = cloneDeep(state.userInfo);
        userInfo.customerFamilies = userInfo.customerFamilies.filter((item) => item.id !== payload);
        draft.userInfo = userInfo;
        updateUserInfoToLocal(userInfo);
        break;
      }

      case UPDATED_AVATAR: {
        draft.userInfo = payload;
        updateUserInfoToLocal(payload);
        break;
      }

      default:
        break;
    }
  });
}
