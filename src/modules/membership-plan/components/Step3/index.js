import React from 'react';
import { Card, Button } from 'antd';
import { Language, Family } from 'modules/health-profile/components';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
const Step3 = ({
  onGoNextStep,
  onGoBackStep
}) => {
  const { userInfo } = useSelector(state => state.auth);

  const checkStepInValid = () => {
    if (
      !(get(userInfo, 'customerHealths.language') || []).length ||
      !(get(userInfo, 'customerFamilies') || []).length
    ) {
      return true;
    }
    return false;
  }

  return (
    <div className='wrapper-step-3 mt-20'>
      <Card className='mb-20' title={<FormattedMessage id="dashboard.depositModal.language"/>}>
        <Language />
      </Card>

      <Card className='mb-20' title={<FormattedMessage id="dashboard.depositModal.family"/>}>
        <Family />
      </Card>

      <div className='mt-20 t-right'>
        <Button className='mr-10' onClick={onGoBackStep}>
        <FormattedMessage id="dashboard.depositModal.back"/>
        </Button>

        <Button
          onClick={onGoNextStep}
          type="primary"
          disabled={checkStepInValid()}
        >
          <FormattedMessage id="dashboard.depositModal.save"/>
        </Button>
      </div>
    </div>
  )
}

export default Step3;
