import React, { useState } from "react";
import { Row, Col, Button } from "antd";
import { useHistory } from "react-router-dom";
import { ROUTE } from "commons/constants";
import "./styles.scss";
import { FormattedMessage } from "react-intl";

const HealthProfile = () => {
  const history = useHistory();
  return (
    <Row className="health-profile-container">
      <Col span={24}>
        <div className="title mb-15"><FormattedMessage id="dashboard.healthProfile.title"/></div>
        <div className="content"><FormattedMessage id="dashboard.healthProfile.content"/></div>
        <div className="link"><FormattedMessage id="dashboard.healthProfile.link"/></div>

        <div className="action">
          <Button
            className="mr-15"
            type="primary"
            shape="round"
            onClick={() => history.push(ROUTE.MEDICAL_PROFILE)}
          >
            <FormattedMessage id="dashboard.healthProfile.medicalProfile"/>
          </Button>
          <Button
            shape="round"
            className="hidden-on-mobile"
            onClick={() => history.push(ROUTE.APPOINTMENT)}
          >
            <FormattedMessage id="dashboard.healthProfile.appointmentSchedule"/>
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default HealthProfile;
