import {GET_MEDICAL, GET_MEDICAL_SUCCESS, LOAD_MORE_MEDICAL_PROFILE_SUCCESS, RESET_MEDICAL} from './constants';
import {get} from 'lodash';

const initialState = {
  medicalData: undefined,
  customerCode: undefined,
  currentMedicalProfilePage: 1,
};
export default (state = initialState, action) => {
  const {payload} = action;
  switch (action.type) {
    case GET_MEDICAL: {
      return {
        ...state,
        customerCode: payload.customerCode,
      };
    }
    case GET_MEDICAL_SUCCESS: {
      return {
        ...state,
        medicalData: payload,
      };
    }
    case LOAD_MORE_MEDICAL_PROFILE_SUCCESS: {
      const profileData = get(payload, 'data.medicalProfiles');
      return {
        ...state,
        currentMedicalProfilePage: state.currentMedicalProfilePage + 1,
        medicalData: {
          ...state.medicalData,
          data: {
            ...state.medicalData.data,
            medicalProfiles: {
              data: [...state.medicalData.data.medicalProfiles.data, ...profileData.data],
              pagination: profileData.pagination,
            },
          },
        },
      };
    }
    case RESET_MEDICAL: {
      return {
        ...state,
        customerCode: undefined,
        medicalData: undefined,
      };
    }
    default:
      return {...state};
  }
};
