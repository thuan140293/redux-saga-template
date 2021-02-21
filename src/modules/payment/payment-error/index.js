import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { InfoCircleOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";

const PaymentErrorPage = () => {
  useEffect(() => {
    toast.error("Payment error");
  }, []);
  return (
    <>
      <div className='mt-50'>
        <h3><InfoCircleOutlined /> <FormattedMessage id="payment.paymentErr.title"/></h3>
      </div>
    </>
  );
};

export default PaymentErrorPage;
