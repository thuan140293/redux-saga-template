import React, { useEffect } from "react";
import { Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";
import { getAdminBank } from "modules/dashboard/redux/actions";
import { FormattedMessage, injectIntl } from "react-intl";

const PaymentBankModal = ({intl}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminBank());
  }, []);

  const { adminBank } = useSelector((state) => state.dashboard);

  return (
    <div className="online-modal-container">
      <div className="title"><FormattedMessage id="dashboard.paymentBankModal.title"/></div>
      <div className="sub-title"><FormattedMessage id="dashboard.paymentBankModal.subTitle"/></div>

      <div className="content">
        <Row gutter={5}>
          <Col xl={8} lg={8} md={12} xs={24} sm={24}>
          <FormattedMessage id="dashboard.paymentBankModal.accountHolder"/>
          </Col>
          <Col xl={16} lg={16} md={12} xs={24} sm={24} className="text-bold">
            {get(adminBank, "account_name")}
          </Col>
        </Row>
        <Row gutter={5}>
          <Col xl={8} lg={8} md={12} xs={24} sm={24}>
          <FormattedMessage id="dashboard.paymentBankModal.bankAccount"/>
          </Col>
          <Col xl={16} lg={16} md={12} xs={24} sm={24} className="text-bold">
            {get(adminBank, "account_number")}
          </Col>
        </Row>
        <Row gutter={5}>
          <Col xl={8} lg={8} md={12} xs={24} sm={24}>
          <FormattedMessage id="dashboard.paymentBankModal.bankName"/>
          </Col>
          <Col xl={16} lg={16} md={12} xs={24} sm={24} className="text-bold">
            {get(adminBank, "account_address")}
          </Col>
        </Row>
        {/* <Row gutter={5}>
          <Col xl={8} lg={8} md={12} xs={24} sm={24}>
            Chi nhánh ngân hàng:
          </Col>
          <Col xl={16} lg={16} md={12} xs={24} sm={24} className="text-bold">
            PGD Bạch Đằng
          </Col>
        </Row> */}
      </div>
    </div>
  );
};

export default injectIntl(PaymentBankModal);
