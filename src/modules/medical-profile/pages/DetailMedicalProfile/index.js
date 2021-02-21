import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { cloneDeep, pickBy } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetailMedicalProfile,
  customerMedicalScheduleList,
  customerMedicalScheduleCreate,
  customerMedicalScheduleUpdate,
  customerMedicalScheduleDelete,
} from "modules/medical-profile/redux/actions";
import {
  ScheduleForm,
  MedicalProfileItem,
  ScheduleSection,
} from "modules/medical-profile/components";
import { SEARCH_CUSTOMER_MEDICAL_SCHEDULE } from "modules/medical-profile/redux/constants";
import Appointment from "../Appointment";
import { FormattedMessage } from "react-intl";

import * as moment from "moment";
const DetailMedicalProfile = ({ idDetail, history }) => {
  const dispatch = useDispatch();
  const {
    medicalProfileDetail,
    medicalProfileScheduleToday,
    medicalProfileScheduleNext,
    medicalProfileScheduleExpired,
    medicalProfileScheduleCancel,
  } = useSelector((state) => state.medicalProfile);

  const [searchParams, setSearchParams] = useState(
    cloneDeep(SEARCH_CUSTOMER_MEDICAL_SCHEDULE)
  );
  const [showModalSchedule, setShowModalSchedule] = useState(false);
  const [scheduleSelected, setScheduleSelected] = useState(null);

  useEffect(() => {
    dispatch(getDetailMedicalProfile(idDetail));
  }, [idDetail, dispatch]);

  useEffect(() => {
    initDataSchedule();
  }, [idDetail, dispatch]);

  const initDataSchedule = () => {
    dispatch(
      customerMedicalScheduleList(
        pickBy(
          {
            ...searchParams,
            customer_medical_profile_id: idDetail,
            type: "today",
          },
          (param) => param
        )
      )
    );
    dispatch(
      customerMedicalScheduleList(
        pickBy(
          {
            ...searchParams,
            customer_medical_profile_id: idDetail,
            type: "next",
          },
          (param) => param
        )
      )
    );
    dispatch(
      customerMedicalScheduleList(
        pickBy(
          {
            ...searchParams,
            customer_medical_profile_id: idDetail,
            type: "expired",
          },
          (param) => param
        )
      )
    );
    dispatch(
      customerMedicalScheduleList(
        pickBy(
          {
            ...searchParams,
            customer_medical_profile_id: idDetail,
            type: "cancel",
          },
          (param) => param
        )
      )
    );
  };

  const closeModalSchedule = () => {
    setShowModalSchedule(false);
    setScheduleSelected(null);
  };

  const addSchedule = (payload) => {
    dispatch(
      customerMedicalScheduleCreate(
        {
          ...payload,
          customer_medical_profile_id: idDetail,
          schedule_at: moment(payload.schedule_at),
        },
        () => {
          dispatch(getDetailMedicalProfile(idDetail));
          initDataSchedule();
          closeModalSchedule();
        }
      )
    );
  };

  const updateSchedule = (payload) => {
    dispatch(
      customerMedicalScheduleUpdate(
        {
          ...payload,
          customer_medical_profile_id: idDetail,
          schedule_at: moment(payload.schedule_at),
        },
        () => {
          initDataSchedule();
          closeModalSchedule();
        }
      )
    );
  };

  const handleUpdateSchedule = (detail) => {
    setScheduleSelected(detail);
    setShowModalSchedule(true);
  };

  const handleDeleteSchedule = (id, type) => {
    dispatch(
      customerMedicalScheduleDelete({ id, typeSchedule: type }, () => {
        dispatch(getDetailMedicalProfile(idDetail));
        closeModalSchedule();
      })
    );
  };

  const onGoMedicalFile = () => {
    history.push(`/medical-profile/file/${idDetail}`);
  };

  return (
    <div className="medical-profile-detail-page">
      <div className="action mb-20">
        <Button
          onClick={() => setShowModalSchedule(true)}
          size="middle"
          type="primary"
          className="mr-10"
        >
          <FormattedMessage id="dashboard.paymentTransferModal.addNewProfile" />
        </Button>

        <Button size="middle" onClick={onGoMedicalFile}>
          <FormattedMessage id="dashboard.paymentTransferModal.updateNewProfile" />
        </Button>
      </div>

      <MedicalProfileItem data={medicalProfileDetail} />

      <Appointment
        medicalProfileScheduleToday={medicalProfileScheduleToday}
        medicalProfileScheduleNext={medicalProfileScheduleNext}
        medicalProfileScheduleExpired={medicalProfileScheduleExpired}
        medicalProfileScheduleCancel={medicalProfileScheduleCancel}
        handleUpdateSchedule={handleUpdateSchedule}
        handleDeleteSchedule={handleDeleteSchedule}
        updateSchedule={updateSchedule}
      />

      <Modal
        visible={showModalSchedule}
        onCancel={closeModalSchedule}
        title={
          scheduleSelected ? (
            <FormattedMessage id="dashboard.paymentTransferModal.addSchedule" />
          ) : (
            <FormattedMessage id="dashboard.paymentTransferModal.updateSchedule" />
          )
        }
        footer={null}
      >
        {showModalSchedule && (
          <ScheduleForm
            onCloseModal={closeModalSchedule}
            addSchedule={addSchedule}
            updateSchedule={updateSchedule}
            detail={scheduleSelected}
          />
        )}
      </Modal>
    </div>
  );
};

export default DetailMedicalProfile;
