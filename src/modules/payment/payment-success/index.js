import React, { useEffect } from 'react';
import * as qs from 'query-string';
import { useDispatch } from 'react-redux';
import { walletTransDepositCheck } from 'modules/dashboard/redux/actions';
import { ROUTE } from 'commons/constants';
import { toast } from 'react-toastify';
import { injectIntl } from 'react-intl';

const PaymentSuccessPage = ({
  location,
  history,
  intl
}) => {
  const dispatch = useDispatch();
 
  useEffect(() => {
    const queryParams = qs.parse(location.search);

    dispatch(
      walletTransDepositCheck(queryParams,
        success => {
          toast.info(intl.formatMessage({ id: 'payment.paymentSuccess.success' }));
          history.push(ROUTE.HOME);

        },
        error => {
          toast.error(intl.formatMessage({ id: 'payment.paymentSuccess.fail' }));
          history.push(ROUTE.HOME);
        }
      )
    );
  }, [dispatch, history, location.search]);
  return <></>;
}

export default injectIntl(PaymentSuccessPage);
