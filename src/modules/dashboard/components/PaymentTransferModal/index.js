import React, { useState, useEffect } from "react";
import { Row, Col, Input } from "antd";
import { useSelector } from "react-redux";
import QRCode from "qrcode.react";
import "./styles.scss";
import { FormattedMessage, injectIntl } from "react-intl";
import { InfoCircleOutlined } from "@ant-design/icons";

const PaymentTransferModal = ({ intl, codeValue = "test" }) => {
  const { walletData } = useSelector((state) => state.dashboard);
  const [copySuccess, setCopySuccess] = useState(false);

  const onCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopySuccess(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setCopySuccess(false);
    }, 3000);
  }, [copySuccess]);
  return (
    <div className="transfer-modal-container">
      <div className="title">
        <FormattedMessage id="dashboard.wallet.deposit" />
      </div>
      <Row gutter={10} className="content">
        <Col span={24} className="t-center">
          <QRCode fgColor="#404040" size="160" value={codeValue} />
        </Col>
        <Col span={24} className="t-center">
          <div className="address-input" onClick={() => onCopyCode(codeValue)}>
            <div className="unit">
              <div className="wrapper-input">
                <Input
                  readOnly
                  suffix={
                    <img
                      className="icon-copy"
                      src={require("assets/images/deposit/copy.png")}
                      alt="icon copy"
                      width={21}
                      height={21}
                    />
                  }
                  defaultValue={codeValue}
                />
                {copySuccess && (
                  <div className="success-content">
                    <FormattedMessage id="dashboard.deposit.sucesss" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default injectIntl(PaymentTransferModal);
