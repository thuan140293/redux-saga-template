import React, { useState } from 'react';
import { Steps } from 'antd';
import StepProfile from '../StepProfile';
import Step2 from '../Step2';
import Step3 from '../Step3';
import { useDispatch, useSelector } from 'react-redux';
import { setCartData } from "modules/cart/redux/actions";
import { ROUTE } from 'commons/constants';
import { toast } from 'react-toastify';
import './styles.scss';
import { injectIntl } from 'react-intl';
const { Step } = Steps;

const RegisterMembership = ({
  membership,
  history,
  intl
}) => {
  const dispatch = useDispatch();
  const { cartData } = useSelector((state) => state.cart);
  const [currentStep, setCurrentStep] = useState(0);

  const handleGoNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const onFinishStep = () => {
    const payload = [{ ...membership, type: "membership" }];
    dispatch(
      setCartData({
        cartData: payload,
        cartStep: 1,
      })
    );
    history.push(ROUTE.CART);
    toast.info(
      cartData.length
        ? intl.formatMessage({ id: 'membershipPlan.registerMembership.title1' })
        : intl.formatMessage({ id: 'membershipPlan.registerMembership.title2' })
    );
  }

  const handleGoBackStep = () => {
    setCurrentStep(currentStep - 1);
  }

  return (
    <div className='register-membership-page'>
      <Steps current={currentStep}>
        <Step title={intl.formatMessage({ id: 'membershipPlan.registerMembership.step1' })} />
        <Step title={intl.formatMessage({ id: 'membershipPlan.registerMembership.step2' })} />
        <Step title={intl.formatMessage({ id: 'membershipPlan.registerMembership.step3' })} />
      </Steps>

      {currentStep === 0 && (
        <StepProfile
          onGoNextStep={handleGoNextStep}
        />
      )}
      {currentStep === 1 && (
        <Step2
          onGoNextStep={handleGoNextStep}
          onGoBackStep={handleGoBackStep}
        />
      )}
      {currentStep === 2 && (
        <Step3
          onGoNextStep={onFinishStep}
          onGoBackStep={handleGoBackStep}
        />
      )}
    </div>
  )
}

export default injectIntl(RegisterMembership);
