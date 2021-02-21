import React from "react";
import { Row, Col } from "antd";
import { FormattedMessage } from "react-intl";
import "./styles.scss";

const SubscribePage = ({
  handleOnClickSubscribe = () => {},
  ...props
}) => {

  return (
    <div className="subscribe-container">
      <Row className="user-ref-container" gutter={30}>
        <Col className="user-ref-actions" xl={18} lg={16} md={16} sm={15} xs={24}>
          <img
            className="logo"
            src={require("assets/images/JSB_logo.png")}
            alt="logo"
          />
          <div className="tools" onClick={handleOnClickSubscribe}>
            <a href="#" className="btn">
              <span>
                <FormattedMessage id="dashboard.referals.subscribe" />{" "}
              </span>{" "}
              <span>100 USD JSB</span>
            </a>
          </div>
        </Col>
        <Col className="float-right" xl={6} lg={8} md={8} sm={9} xs={24}>
          <div className="unblock t-right">
            <FormattedMessage id="dashboard.referals.unblock" />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SubscribePage;
