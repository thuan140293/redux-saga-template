import React from "react";
import { Row, Col } from "antd";
import { FormattedMessage } from "react-intl";
import "./styles.scss";

export const USDTTRON = "USDTTRON";
export const USDTJSB = "USDTJSB";
export const JSB = "JSB";
export const COMMIT = "COMMIT";

const unitDeposit = {
  [USDTTRON]: require("assets/images/deposit/USDT-02.png"),
  [USDTJSB]: require("assets/images/deposit/USDT-03.png"),
  [JSB]: require("assets/images/deposit/USDT-04.png"),
  [COMMIT]: require("assets/images/deposit/USDT-05.png"),
};

export const sendType = {
  [USDTTRON]: "walletTransaction.list.withdraw",
  [USDTJSB]: "dashboard.title.send",
  [JSB]: "dashboard.title.send",
};

export const positionUnit = {
  [USDTTRON]: 1,
  [USDTJSB]: 2,
  [JSB]: 3,
};

export const roundNumber = (rnum, rlength = 3) => {
  var newnumber =
    Math.round(rnum * Math.pow(10, rlength)) / Math.pow(10, rlength);
  return newnumber;
};
const DepositPage = ({
  twoOption = true,
  handleOpenDeposit = () => {},
  handleOpenOther = () => {},
  handleCommission = () => {},
  handleOpenSwap = () => {},
  total = 0,
  ...props
}) => {
  const { amount, unit = "COMMIT" } = props;
  const isJSB = unit === JSB;
  return (
    <div className="deposit-container">
      <Row gutter={30}>
        <img
          className="image-deposit"
          src={unitDeposit[unit]}
          alt="image deposit"
        />
        <Col
          xl={24}
          lg={24}
          md={24}
          xs={24}
          sm={24}
          className="action-block border-bottom"
        >
          <div className="currency">
            <span>
              {" "}
              {isJSB ? 0 : roundNumber(amount) || roundNumber(total)}
            </span>
          </div>
          {!isJSB && (
            <img
              className="image-switch"
              src={require("assets/images/deposit/switch.png")}
              alt="image switch"
              onClick={handleOpenSwap}
            />
          )}
        </Col>
        {!isJSB && twoOption && (
          <>
            <Col
              xl={12}
              lg={12}
              md={12}
              xs={12}
              sm={12}
              className="action-block border-right"
            >
              <div className="more-action active" onClick={handleOpenDeposit}>
                <img
                  className="icon-down"
                  src={require("assets/images/deposit/feather-arrow-down-circle.png")}
                  alt="icon down"
                />
                <span className="ml-10">
                  <FormattedMessage id="dashboard.wallet.deposit" />
                </span>
              </div>
            </Col>
            <Col
              xl={12}
              lg={12}
              md={12}
              xs={12}
              sm={12}
              className="action-block"
            >
              <div className="more-action" onClick={handleOpenOther}>
                <img
                  className="icon-up"
                  src={require("assets/images/deposit/feather-arrow-up-circle.png")}
                  alt="icon up"
                />
                <span className="ml-10">
                  <FormattedMessage id={sendType[unit]} />
                </span>
              </div>
            </Col>
          </>
        )}

        {!isJSB && !twoOption && (
          <Col xl={24} lg={24} md={24} xs={24} sm={24} className="action-block">
            <div className="more-action" onClick={handleCommission}>
              <img
                className="icon-up"
                src={require("assets/images/deposit/feather-arrow-down-circle.png")}
                alt="icon up"
              />
              <span className="ml-10 active">
                <FormattedMessage id="dashboard.earncommit" />
              </span>
            </div>
          </Col>
        )}

        {isJSB && (
          <Col xl={24} lg={24} md={24} xs={24} sm={24} className="action-block">
            <div className="more-action" onClick={handleCommission}>
              <span className="height-up">
                <FormattedMessage id="dashboard.commingsoon" />
              </span>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default DepositPage;
