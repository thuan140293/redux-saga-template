import React, { useState, useEffect } from "react";
import { Row, Col, Button, Modal, Statistic, Tooltip } from "antd";
import {
  SwapOutlined,
  DownloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  DepositModal,
  PaymentOnlineModal,
  PaymentBankModal,
  PaymentTransferModal,
  WithDrawModal,
  TransferModal,
} from "modules/dashboard/components";
import {
  walletTransList,
  getMasterService,
  walletTransWithdraw,
  walletTransTransfer,
  walletTransDepositOnline,
} from "modules/dashboard/redux/actions";
import { TYPE_PAYMENT } from "modules/dashboard/constants";
import { useSelector, useDispatch } from "react-redux";
import * as numeral from "numeral";
import { slice } from "lodash";
import "./styles.scss";
import { Link } from "react-router-dom";
import {formatDate} from 'helpers/CommonHelper';
import { FormattedMessage } from "react-intl";

const WalletPage = () => {
  const dispatch = useDispatch();
  const { walletData, walletTransHistory } = useSelector(
    (state) => state.dashboard
  );
  const transHistory = slice(walletTransHistory.data, 0, 3);

  const [showModalDeposit, setShowModalDeposit] = useState(false);
  const [dataModalPayment, setDataModelPayment] = useState({
    type: "",
    isShow: false,
  });
  const [showModalWithDraw, setShowModalWithDraw] = useState(false);
  const [showModalTransfer, setShowModalTransfer] = useState(false);
  useEffect(() => {
    dispatch(walletTransList({ page: 1, limit: 10, type: "ALL" }));
    dispatch(getMasterService("pay_method"));
  }, [dispatch]);

  const getWalletTransList = () => {
    dispatch(walletTransList({ page: 1, limit: 10, type: "ALL" }));
  };

  const onShowModalDeposit = () => {
    setShowModalDeposit(true);
  };

  const onCloseModalDeposit = () => {
    setShowModalDeposit(false);
  };

  const showModalPayment = (type) => {
    setDataModelPayment({
      type,
      isShow: true,
    });
  };

  const onCloseModalPayment = () => {
    setDataModelPayment({
      type: "",
      isShow: false,
    });
  };

  const onShowModalWithDraw = () => {
    setShowModalWithDraw(true);
  };

  const onCloseModalWithDraw = () => {
    setShowModalWithDraw(false);
  };

  const onWalletTransWithdraw = (payload) => {
    dispatch(
      walletTransWithdraw(payload, () => {
        getWalletTransList();
        onCloseModalWithDraw();
      })
    );
  };

  const onShowModalTransfer = () => {
    setShowModalTransfer(true);
  };

  const onCloseModalTransfer = () => {
    setShowModalTransfer(false);
  };

  const onTransTransfer = (payload) => {
    dispatch(
      walletTransTransfer(payload, () => {
        getWalletTransList();
        onCloseModalTransfer();
      })
    );
  };

  const onWalletTransDepositOnline = (payload) => {
    dispatch(
      walletTransDepositOnline(payload, (data) => {
        onCloseModalPayment();
        window.location.replace(data.alepayUrl);
      })
    );
  };
  return (
    <>
      <Row className="wallet-container">
        <Col md={24} lg={24} xl={13} className="col-left">
          <div className="title">
          <FormattedMessage id="dashboard.wallet.wallet"/> {` `}
            <Tooltip title={<FormattedMessage id="dashboard.wallet.switchICB"/>}>
              <Button
                type="primary"
                shape="circle"
                icon={<SwapOutlined />}
                onClick={onShowModalTransfer}
              />
            </Tooltip>
          </div>
          <div className="icb">
            <span className="value">
              <Statistic
                className="icb-value"
                title=""
                valueStyle={{ color: "#3e3e3e", fontSize: "50px" }}
                suffix="ICB"
                value={walletData.amount}
              />
            </span>
            {/* <span className="transfer" >
              <SwapOutlined /> Chuyển ICB
            </span> */}
          </div>

          <div className="action">
            <Button
              onClick={onShowModalDeposit}
              className="deposit"
              type="primary"
              shape="round"
              icon={<DownloadOutlined />}
            >
              <FormattedMessage id="dashboard.wallet.deposit"/>
            </Button>

            <Button
              onClick={onShowModalWithDraw}
              shape="round"
              icon={<UploadOutlined />}
            >
              <FormattedMessage id="dashboard.wallet.withdrawal"/>
            </Button>
          </div>
        </Col>
        <Col md={24} xl={11} className="col-right hidden-on-mobile">
          <div className="title"><FormattedMessage id="dashboard.wallet.latestTransaction"/></div>
          {transHistory.map((item) => (
            <div
              key={item.id}
              className={`transaction-history ${
                item.action === "IN" ? "transaction-in" : ""
              }`}
            >
              <div className="content">
                <div className="note">
                  {item.action === "IN"
                    ? item.type === "DEPOSIT"
                      ? <FormattedMessage id="dashboard.wallet.deposit"/>
                      : <FormattedMessage id="dashboard.wallet.take"/>
                    : item.type === "WITHDRAW"
                    ? <FormattedMessage id="dashboard.wallet.withdrawal"/>
                    : <FormattedMessage id="dashboard.wallet.movedOn"/>}{" "}
                  {item.amount} {item.currency}
                </div>
                <div className="date">
                  {item.status === "PENDING" ? <FormattedMessage id="dashboard.wallet.viewAll"/> : formatDate(item.created_at)}
                </div>
              </div>
              <div className={`price`}>
                {item.action === "IN" ? "+" : "-"}
                {numeral(item.amount).format("0,0")} ICB
              </div>
            </div>
          ))}
          <div className="view-all">
            <Link to="/transactions"><FormattedMessage id="dashboard.wallet.viewAll"/> {">"}</Link>
          </div>
        </Col>
      </Row>

      <Modal
        visible={showModalDeposit}
        onCancel={onCloseModalDeposit}
        footer={null}
        width={800}
      >
        <DepositModal showModalPayment={showModalPayment} />
      </Modal>

      <Modal
        visible={dataModalPayment.isShow}
        onCancel={onCloseModalPayment}
        footer={null}
        width={700}
      >
        {dataModalPayment.type === TYPE_PAYMENT.ONLINE && (
          <PaymentOnlineModal
            onWalletTransDepositOnline={onWalletTransDepositOnline}
            onCloseModal={onCloseModalPayment}
          />
        )}
        {dataModalPayment.type === TYPE_PAYMENT.BANK && (
          <PaymentBankModal onCloseModal={onCloseModalPayment} />
        )}
        {dataModalPayment.type === TYPE_PAYMENT.TRANSFER && (
          <PaymentTransferModal />
        )}
      </Modal>

      <Modal
        title={<FormattedMessage id="dashboard.wallet.withdrawal2"/>}
        visible={showModalWithDraw}
        onCancel={onCloseModalWithDraw}
        footer={null}
        width={700}
      >
        {showModalWithDraw && (
          <WithDrawModal
            onCloseModal={onCloseModalWithDraw}
            onWalletTransWithdraw={onWalletTransWithdraw}
          />
        )}
      </Modal>

      <Modal
        title={<FormattedMessage id="dashboard.wallet.transferToWallet"/>}
        visible={showModalTransfer}
        onCancel={onCloseModalTransfer}
        footer={null}
        width={400}
      >
        {showModalTransfer && (
          <TransferModal
            onTransTransfer={onTransTransfer}
            onCloseModal={onCloseModalTransfer}
          />
        )}
      </Modal>
    </>
  );
};

export default WalletPage;
