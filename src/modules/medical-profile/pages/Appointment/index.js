import React from 'react'
import { ScheduleSection } from 'modules/medical-profile/components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const Appointment = ({
  handleUpdateSchedule,
  handleDeleteSchedule,
  updateSchedule,
  medicalProfileScheduleToday,
  medicalProfileScheduleNext,
  medicalProfileScheduleExpired,
  medicalProfileScheduleCancel,
  onGoToMedicalProfile
}) => {
  return (
    <>
      <div className='mt-20'>
        <ScheduleSection
          data={medicalProfileScheduleToday}
          header={<FormattedMessage id="medical-profile.appointment.scheduleToday"/>}
          isShowContent={true}
          onUpdate={handleUpdateSchedule}
          onDelete={handleDeleteSchedule ? id => handleDeleteSchedule(id, 'today') : null}
          onGoToMedicalProfile={onGoToMedicalProfile ? item => onGoToMedicalProfile(item) : null}
          updateScheduleStatus={updateSchedule}
        />
      </div>

      <div className='mt-20'>
        <ScheduleSection
          typeSchedule='next'
          data={medicalProfileScheduleNext}
          header={<FormattedMessage id="medical-profile.appointment.comingSoon"/>}
          onUpdate={handleUpdateSchedule}
          onDelete={handleDeleteSchedule ? id => handleDeleteSchedule(id, 'next') : null}
          onGoToMedicalProfile={onGoToMedicalProfile ? item => onGoToMedicalProfile(item) : null}
        />
      </div>

      <div className='mt-20'>
        <ScheduleSection
          data={medicalProfileScheduleExpired}
          header={<FormattedMessage id="medical-profile.appointment.appointmentOver"/>}
          updateScheduleStatus={updateSchedule}
          onGoToMedicalProfile={onGoToMedicalProfile ? item => onGoToMedicalProfile(item) : null}
        />
      </div>

      <div className='mt-20'>
        <ScheduleSection
          data={medicalProfileScheduleCancel}
          header={<FormattedMessage id="medical-profile.appointment.appointmentCanceled"/>}
          onGoToMedicalProfile={onGoToMedicalProfile ? item => onGoToMedicalProfile(item) : null}
        />
      </div>
    </>

  )
}

Appointment.defaultProps = {
  handleUpdateSchedule: null,
  handleDeleteSchedule: null,
  updateSchedule: null,
  onGoToMedicalProfile: null
};

Appointment.propTypes = {
  handleUpdateSchedule: PropTypes.func,
  handleDeleteSchedule: PropTypes.func,
  updateSchedule: PropTypes.func,
  onGoToMedicalProfile: PropTypes.func
};
export default Appointment;