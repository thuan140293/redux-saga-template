import React from 'react';
import { Card, Button } from 'antd';
import { Insurance, Blood, MedicalHistory, Allergies } from 'modules/health-profile/components';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';

const Step2 = ({
  onGoNextStep,
  onGoBackStep
}) => {
  const { userInfo } = useSelector(state => state.auth);
  const checkStepInValid = () => {
    if (
      !(get(userInfo, 'customerHealths.blood') || []).length ||
      !(get(userInfo, 'customerHealths.medical_history') || []).length ||
      !(get(userInfo, 'customerHealths.allergies') || []).length
    ) {
      return true;
    }
    return false;
  }
  return (
    <div className='wrapper-step-2 mt-20'>
       <Card className='mb-20' title={<FormattedMessage id="membershipPlan.step2.bloodGroup"/>}>
        <Blood />
      </Card>

      <Card className='mb-20' title={<FormattedMessage id="membershipPlan.step2.insurance"/>}>
        <Insurance />
      </Card>

      <Card className='mb-20' title={<FormattedMessage id="membershipPlan.step2.allergies"/>}>
        <Allergies />
      </Card>

      <Card className='mb-20' title={<FormattedMessage id="membershipPlan.step2.medicalHistory"/>}>
        <MedicalHistory />
      </Card>

      <div className='t-right'>
        <Button className='mr-10' onClick={onGoBackStep}>
        {<FormattedMessage id="membershipPlan.step2.back"/>}
        </Button>

        <Button
          onClick={onGoNextStep}
          type="primary"
          disabled={checkStepInValid()}
        >
         {<FormattedMessage id="membershipPlan.step2.save"/>}
        </Button>
      </div>
    </div>
  )
};

export default Step2;
