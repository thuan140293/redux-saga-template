import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Modal, Form, Button } from "antd";
import DepositPage, { positionUnit } from "../Deposit";
import SubscribePage from "../Subscribe";
import "./styles.scss";
import {
  DepositModal,
  WithDrawModal,
  CommissionModal,
  SwapModal,
  SubscribeModal,
} from "modules/dashboard/components";

import Transactions from "modules/dashboard/components/Transactions";
import Commissions from "modules/dashboard/components/Commissions";
import {
  walletTransTransfer,
  walletTransList,
  swapWithdraw,
  onConfirmSubscribe,
  walletWithdrawTransfer,
} from "modules/dashboard/redux/actions";
import {
  walletTransWithdraw,
  getListCommissions,
} from "modules/commissions/redux/actions";
import { orderBy, isEmpty, pickBy } from "lodash";
import { getProfile } from "modules/profile/redux/actions";
import { OPTION_COMMISSIONS_TYPES } from "commons/constants";
import * as qs from "query-string";
import { FormattedMessage, injectIntl } from "react-intl";
import { USDTTRON } from "modules/dashboard/pages/Deposit";

const DashboardPage = ({ intl }) => {
  const CURRENCY = "USDTJSB";
  const dispatch = useDispatch();
  const [showPopUpDeposit, setShowPopUpDesposit] = useState(false);
  const [showPopUpWithdraw, setShowPopUpWithdraw] = useState(false);
  const [showPopUpCommission, setShowPopUpCommission] = useState(false);
  const [showPopUpSwap, setShowPopUpSwap] = useState(false);
  const [showPopUpSubscribe, setShowPopUpSubscribe] = useState(false);
  const [dataDeposit, setDataDeposit] = useState(null);
  const [dataWithdraw, setDataWithdraw] = useState(null);
  const [dataSwap, setDataSwap] = useState(null);

  const { profileData } = useSelector((state) => state.profile);
  const { userInfo } = useSelector((state) => state.auth);
  const { wallet, commissions_earned, pocket_active } = (isEmpty(profileData)
    ? userInfo
    : profileData) || {
    wallet: [],
    commissions_earned: 0,
    pocket_active: 0,
  };
  const [listWallet, setListWallet] = useState([]);

  useEffect(() => {
    if (wallet && wallet.length === undefined) {
      setListWallet([wallet]);
    }
    if (wallet && wallet.length) {
      let orderWallet = orderBy(
        wallet.map((o, key) => {
          let item = { ...o };
          item.position = positionUnit[item.unit];
          return item;
        }),
        ["position", "asc"]
      );
      setListWallet(orderWallet);
    }
  }, [wallet]);

  const handleOpenCode = (item) => {
    setDataDeposit(item || {});
    setShowPopUpDesposit(true);
  };

  const handleOpenWithDraw = (item) => {
    setDataWithdraw(item);
    setShowPopUpWithdraw(true);
  };

  const handleOpenCommission = () => {
    setShowPopUpCommission(true);
  };

  const getWalletTransList = () => {
    dispatch(walletTransList({ page: 1, limit: 10, type: "ALL" }));
  };

  const onTransTransfer = (payload) => {
    dispatch(
      walletTransTransfer(payload, () => {
        dispatch(getProfile());
        onCloseModal();
      })
    );
  };

  const onWithDrawTransfer = (payload) => {
    dispatch(
      walletWithdrawTransfer(payload, () => {
        dispatch(getProfile());
        onCloseModal();
      })
    );
  };

  const onCommissionSubmit = (payload) => {
    dispatch(
      walletTransWithdraw(payload, () => {
        dispatch(getProfile());
        const queryString = qs.stringify(
          pickBy({
            page: 1,
            limit: 10,
            type: OPTION_COMMISSIONS_TYPES.all,
          })
        );
        dispatch(getListCommissions(queryString));
        onCloseModal();
      })
    );
  };

  const handleOpenSwap = (item) => {
    setDataSwap(item);
    setShowPopUpSwap(true);
  };

  const onSwapSubmit = (payload) => {
    dispatch(
      swapWithdraw(payload, () => {
        dispatch(getProfile());
        getWalletTransList();
        onCloseModal();
      })
    );
  };

  const onCloseModal = () => {
    setDataDeposit(null);
    setDataWithdraw(null);
    setShowPopUpDesposit(false);
    setShowPopUpWithdraw(false);
    setShowPopUpCommission(false);
    setShowPopUpSwap(false);
    setShowPopUpSubscribe(false);
  };

  const handleOnClickSubscribe = () => {
    setShowPopUpSubscribe(true);
  };

  const HandlenConfirmSubscribe = () => {
    dispatch(
      onConfirmSubscribe({ currency: CURRENCY }, () => {
        dispatch(getProfile());
        onCloseModal();
      })
    );
  };

  return (
    <>
      <Row className="dashboard-container" gutter={30}>
        <Col xl={24} lg={24} md={24} xs={24} sm={24} className="mb-30">
          <Row className="dashboard-wallets" gutter={16}>
            {listWallet.map((item, key) => (
              <Col
                xl={6}
                lg={6}
                md={6}
                sm={6}
                xs={24}
                key={key}
                className="wallet"
              >
                <Card className="bg-polygon">
                  <DepositPage
                    {...item}
                    handleOpenDeposit={() => {
                      handleOpenCode(item);
                    }}
                    handleOpenSwap={() => {
                      handleOpenSwap(item);
                    }}
                    handleOpenOther={() => {
                      handleOpenWithDraw({ ...item, index: key });
                    }}
                  />
                </Card>
              </Col>
            ))}
            <Col xl={6} lg={6} md={6} sm={6} xs={24} className="wallet">
              <Card className="bg-polygon ">
                <DepositPage
                  twoOption={false}
                  total={commissions_earned}
                  handleOpenSwap={() => {
                    handleOpenSwap();
                  }}
                  handleCommission={handleOpenCommission}
                />
              </Card>
            </Col>
          </Row>
        </Col>

        {!pocket_active && (
          <Col xl={24} lg={24} md={24} xs={24} sm={24} className="mb-30">
            <SubscribePage
              handleOnClickSubscribe={() => {
                handleOnClickSubscribe();
              }}
            />
          </Col>
        )}

        <Col xl={24} lg={24} md={24} xs={24} sm={24} className="mb-20">
          <Row gutter={30} className="history-report">
            <Col xl={12} lg={12} md={12} xs={24} sm={24} className="mb-30">
              <Transactions />
            </Col>
            <Col xl={12} lg={12} md={12} xs={24} sm={24} className="mb-30">
              <Commissions />
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal
        title={`${intl.formatMessage({
          id: "dashboard.wallet.deposit",
        })} ${
          dataDeposit
            ? intl.formatMessage({
                id: `dashboard.lastestTransactions.${dataDeposit.unit}`,
              })
            : ""
        } ${intl.formatMessage({
          id: "dashboard.title.wallet",
        })}`}
        visible={showPopUpDeposit}
        onCancel={() => {
          onCloseModal();
        }}
        footer={null}
        width={425}
        key={`deposit`}
        className="header-modal-custom"
      >
        <DepositModal {...dataDeposit} />
      </Modal>
      {dataWithdraw && (
        <Modal
          title={`${
            dataWithdraw.unit === USDTTRON
              ? intl.formatMessage({
                  id: `dashboard.wallet.withdrawal`,
                })
              : intl.formatMessage({
                  id: `dashboard.title.send`,
                })
          } ${intl.formatMessage({
            id: `dashboard.lastestTransactions.${dataWithdraw.unit}`,
          })} ${intl.formatMessage({
            id: "dashboard.title.wallet",
          })}`}
          visible={showPopUpWithdraw}
          onCancel={() => {
            onCloseModal();
          }}
          footer={null}
          width={425}
          key={`withdraw`}
          className="header-modal-custom"
        >
          <WithDrawModal
            {...dataWithdraw}
            onTransTransfer={onTransTransfer}
            onWithDrawTransfer={onWithDrawTransfer}
          />
        </Modal>
      )}

      <Modal
        title={<FormattedMessage id="dashboard.earncommit" />}
        visible={showPopUpCommission}
        onCancel={() => {
          onCloseModal();
        }}
        footer={null}
        width={425}
        key={`commission`}
        className="header-modal-custom"
      >
        <CommissionModal
          {...profileData}
          commissions_earned={commissions_earned}
          onCommissionSubmit={onCommissionSubmit}
        />
      </Modal>
      <Modal
        visible={showPopUpSwap}
        onCancel={() => {
          onCloseModal();
        }}
        footer={null}
        width={425}
        key={`swap`}
      >
        <SwapModal
          key={`swap-modal`}
          {...dataSwap}
          onSwapSubmit={onSwapSubmit}
        />
      </Modal>
      <Modal
        title={`${intl.formatMessage({
          id: "dashboard.referals.subscribe.modal.title",
        })} 100 USD JSB?`}
        visible={showPopUpSubscribe}
        onCancel={() => {
          onCloseModal();
        }}
        footer={null}
        width={450}
        key={`subscribe`}
        className="header-modal-custom"
      >
        <SubscribeModal
          onConfirmSubscribe={HandlenConfirmSubscribe}
          onClose={setShowPopUpSubscribe}
        ></SubscribeModal>
      </Modal>
    </>
  );
};

export default injectIntl(DashboardPage);
