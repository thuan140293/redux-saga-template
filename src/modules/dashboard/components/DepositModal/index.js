import React, { useState, useEffect } from "react";
import { Row, Col, Input } from "antd";
import QRCode from "qrcode.react";
import "./styles.scss";
import { FormattedMessage, injectIntl } from "react-intl";

const PaymentTransferModal = ({ intl, address, unit }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const onCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopySuccess(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  }, [address]);
  if (!address) return <></>;

  return (
    <div className="transfer-modal-container">
      {/* <div className="title">
        <FormattedMessage id="dashboard.wallet.deposit" />
        <span> </span>
        <FormattedMessage id={`dashboard.lastestTransactions.${unit}`} />
      </div> */}
      <Row gutter={10} className="content">
        <Col span={24} className="t-center mb-30">
          <div className="address-input" onClick={() => onCopyCode(address)}>
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
                  defaultValue={address}
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
        <Col span={24} className="t-center mb-40">
          <QRCode fgColor="#404040" size="200" value={address} />
        </Col>
      </Row>
    </div>
  );
};

export default injectIntl(PaymentTransferModal);
