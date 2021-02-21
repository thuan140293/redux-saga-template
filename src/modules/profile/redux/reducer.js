import {
  CREATE_BANK_MANAGER_SUCCESS,
  DELETE_BANK_MANAGER_SUCCESS,
  GET_LIST_BANK_MANAGER_SUCCESS,
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_VERIFY_CODE_SUCCESS,
  OPEN_BANK_DIALOG,
  OPEN_UPDATE_PASSWORD_DIALOG,
  OPEN_UPDATE_PROFILE_DIALOG,
  UPDATE_BANK_MANAGER_SUCCESS,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_STATE_USER,
  OPEN_UPDATE_EMAIL_DIALOG,
  UPDATE_EMAIL_SUCCESS
} from './constants';
import {map} from 'lodash';
import {USER_INFO_KEY} from '../../../commons/constants';

const initialState = {
  profileData: {},
  customerCode: undefined,
  verifyCode: undefined,
  openEditProfileDialog: false,
  isOpenUpdatePasswordDialog: false,
  isOpenEmailDialog: false,
  // geography
  countries: sessionStorage.getItem('COUNTRIES') ? JSON.parse(sessionStorage.getItem('COUNTRIES')) : [],
  cities: [],
  // bank
  banks: [],
  isOpenBankDialog: false,
};

const updateUserInfoToLocal = (userInfo) => {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
};

export default (state = initialState, action) => {
  const {payload} = action;
  switch (action.type) {
    case GET_PROFILE: {
      return {
        ...state,
        customerCode: payload,
      };
    }
    case GET_PROFILE_SUCCESS:
    {
      return {
        ...state,
        profileData: payload,
      };
    }
    case UPDATE_STATE_USER:
    {
      updateUserInfoToLocal(payload);
      return {
        ...state,
        profileData: payload,
      };
    }
    case GET_VERIFY_CODE_SUCCESS: {
      return {
        ...state,
        verifyCode: payload,
      };
    }

    case UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
        openEditProfileDialog: false,
        profileData: payload,
      };
    }

    case OPEN_UPDATE_PROFILE_DIALOG: {
      return {
        ...state,
        openEditProfileDialog: payload,
      };
    }

    case OPEN_UPDATE_PASSWORD_DIALOG: {
      return {
        ...state,
        isOpenUpdatePasswordDialog: payload,
      };
    }

    case UPDATE_PASSWORD_SUCCESS: {
      return {
        ...state,
        isOpenUpdatePasswordDialog: false,
      };
    }

    //Update Email
    case OPEN_UPDATE_EMAIL_DIALOG: {
      return {
        ...state,
        isOpenEmailDialog: payload,
      };
    }

    case UPDATE_EMAIL_SUCCESS: {
      return {
        ...state,
        isOpenEmailDialog: false,
      };
    }

    // Bank
    case OPEN_BANK_DIALOG:
      return {
        ...state,
        isOpenBankDialog: payload,
      };

    case GET_LIST_BANK_MANAGER_SUCCESS:
      return {
        ...state,
        banks: payload,
      };
    case CREATE_BANK_MANAGER_SUCCESS: {
      return {
        ...state,
        banks: [...state.banks, payload],
        isOpenBankDialog: false,
      };
    }
    case UPDATE_BANK_MANAGER_SUCCESS: {
      const banks = map(state.banks, (item) =>{
        if (item.id === payload.id) {
          return payload;
        }
        return item;
      });
      return {
        ...state,
        banks,
        isOpenBankDialog: false,
      };
    }
    case DELETE_BANK_MANAGER_SUCCESS: {
      const banks = state.banks.filter((item) => item.id !== payload);
      return {
        ...state,
        banks,
      };
    }
    default:
      return {...state};
  }
};
