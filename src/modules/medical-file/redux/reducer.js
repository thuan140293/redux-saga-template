import produce from "immer";
import * as types from './constants';

const initialState = {
  medicalFileList: []
};

export default function MedicalFileReducer(state = initialState, action) {
  const { payload } = action;
  return produce(state, draft => {
    switch (action.type) {
      case types.CUSTOMER_MEDICAL_FILE_CREATE_SUCCESS: 
        draft.medicalFileList = [payload,...state.medicalFileList];
        break;
      case types.CUSTOMER_MEDICAL_FILE_LIST_SUCCESS:
        draft.medicalFileList = payload;
        break;
      case types.CUSTOMER_MEDICAL_FILE_DELETE_SUCCESS:
        draft.medicalFileList = state.medicalFileList.filter(item => item.id !== payload);
        break;
      default:
        break;
    }
  })
}
