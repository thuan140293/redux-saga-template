import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { customerMedicalScheduleList } from 'modules/medical-profile/redux/actions';
import Appointment from 'modules/medical-profile/pages/Appointment';
import { ROUTE } from 'commons/constants';
import { FormattedMessage } from 'react-intl';

const searchParams = {
  page: 1,
  limit: 100
}

export const AppointmentPage = ({
  history
}) => {
  const dispatch = useDispatch();
  const {
    medicalProfileScheduleToday,
    medicalProfileScheduleNext,
    medicalProfileScheduleExpired,
    medicalProfileScheduleCancel
  } = useSelector(state => state.medicalProfile);

  useEffect(() => {
    dispatch(customerMedicalScheduleList({ ...searchParams, type: 'today' }));
    dispatch(customerMedicalScheduleList({ ...searchParams, type: 'next' }));
    dispatch(customerMedicalScheduleList({ ...searchParams, type: 'expired' }));
    dispatch(customerMedicalScheduleList({ ...searchParams, type: 'cancel' }));
  }, [dispatch]);

  const onGoToMedicalProfile = item => {
    history.push({
      pathname: ROUTE.MEDICAL_PROFILE,
      search: `?detail=${item.customer_medical_profile_id}`,
    });
  };

  return (
    <>
      <h2><FormattedMessage id="membershipPlan.appointment"/></h2>
      <Appointment
        medicalProfileScheduleToday={medicalProfileScheduleToday}
        medicalProfileScheduleNext={medicalProfileScheduleNext}
        medicalProfileScheduleExpired={medicalProfileScheduleExpired}
        medicalProfileScheduleCancel={medicalProfileScheduleCancel}
        onGoToMedicalProfile={onGoToMedicalProfile}
      />
    </>

  )
}

