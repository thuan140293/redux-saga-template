import produce from "immer";
import * as types from './constants';
import { capitalize, cloneDeep } from "lodash";
const initialState = {
  medicalProfileData: {
    data: []
  },
  listHospital: {
    data: []
  },
  medicalProfileDetail: {},
  medicalProfileScheduleToday: {
    data: []
  },
  medicalProfileScheduleNext: {
    data: []
  },
  medicalProfileScheduleExpired: {
    data: []
  },
  medicalProfileScheduleCancel: {
    data: []
  }
};

export default function MedicalProfileReducer(state = initialState, action) {
  const { payload } = action;
  return produce(state, draft => {
    switch (action.type) {
      case types.GET_LIST_MEDICAL_PROFILE_SUCCESS:
        draft.medicalProfileData = payload;
        break;
      case types.GET_LIST_HOSPITAL_SUCCESS:
        draft.listHospital = payload;
        break;
      case types.GET_DETAIL_MEDICAL_PROFILE_SUCCESS:
        draft.medicalProfileDetail = payload;
        break;
      case types.CUSTOMER_MEDICAL_SCHEDULE_LIST_SUCCESS:
        const { data, type } = payload;
        draft[`medicalProfileSchedule${capitalize(type)}`] = data;
        break;
      case types.CUSTOMER_MEDICAL_SCHEDULE_DELETE_SUCCESS:
        const { id, typeSchedule } = payload;
        const listOld = cloneDeep(state[`medicalProfileSchedule${capitalize(typeSchedule)}`]);
        listOld.data = listOld.data.filter(item => item.id !== id);
        listOld.total = listOld.total - 1;

        draft[`medicalProfileSchedule${capitalize(typeSchedule)}`] = listOld;
        break;
      default:
        break;
    }
  })
}
