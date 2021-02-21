import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getListWalletTransaction } from "../../redux/actions";
import { pickBy, get } from "lodash";
import { Row, Col, Typography } from "antd";
import { ROUTE } from "commons/constants";
import * as qs from "query-string";

import "../style.scss";
import List from "../../components/List";
import Search from "../../components/Search";
import Modal from "antd/lib/modal/Modal";
import { formatDate } from "helpers/CommonHelper";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
const { Text } = Typography;
const PageList = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const [search, setSearch] = useState({
    pageIndex: 1,
    pageSize: 10,
    type: "ALL",
  });
  const [showDetailTransaction, setShowDetailTransaction] = useState(false);
  const [detailInfo, setDetailInfo] = useState(null);

  const openShowDetail = (record) => {
    setDetailInfo(record);
    setShowDetailTransaction(true);
  };

  const closeShowDetail = () => {
    setShowDetailTransaction(false);
  };

  useEffect(() => {
    const queryString = qs.stringify(pickBy(search));
    history.push(ROUTE.WALLET_TRANSACTION + "?" + queryString);
    dispatch(getListWalletTransaction(queryString));
  }, [dispatch, search, history]);

  const renderStatus = (value) => {
    switch (value) {
      case 0:
      case "0":
      case "FAILED":
        return <Text type="warning"><FormattedMessage id="walletTransaction.pageList.failed"/></Text>;
      case 1:
      case "1":
      case "COMPLETED":
      case "SUCCESS":
        return <Text className="text-success-color"><FormattedMessage id="walletTransaction.pageList.success"/></Text>;
      case 2:
      case "2":
      case "PENDING":
        return <Text><FormattedMessage id="walletTransaction.pageList.pending"/></Text>;
      default:
        break;
    } 
  };

  const renderVn = (type) => {
    switch (type) {
      case "TRANSFER":
        return <FormattedMessage id="walletTransaction.pageList.transfer"/>;
      case "BUY":
        return <FormattedMessage id="walletTransaction.pageList.buy"/>;
      case "WITHDRAW":
        return <FormattedMessage id="walletTransaction.pageList.withdraw"/>;
      case "DEPOSIT":
        return <FormattedMessage id="walletTransaction.pageList.deposit"/>;
      case "EARN":
        return <FormattedMessage id="walletTransaction.pageList.earn"/>;
      case "membership":
        return <FormattedMessage id="walletTransaction.pageList.membership"/>;
      default:
        return type;
    }
  };
  return (
    <>
      <Row className="table-header">
        <Col sm={24} xs={24} md={20} lg={20} xl={20}>
          <h1><FormattedMessage id="walletTransaction.pageList.header"/></h1>
        </Col>
        <Col className="" sm={24} xs={24} md={4} lg={4} xl={4}>
          <Search search={search} setSearch={setSearch} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <List
            setSearch={setSearch}
            search={search}
            openShowDetail={openShowDetail}
          />
        </Col>
      </Row>

      <Modal
        title={detailInfo ? detailInfo.code :<FormattedMessage id="walletTransaction.pageList.info"/>}
        visible={showDetailTransaction}
        onCancel={closeShowDetail}
        footer={null}
        bodyStyle={{ padding: 0, fontSize: "16px" }}
      >
        <div className={`rowModal rowModal-color `}>
          <span><FormattedMessage id="walletTransaction.pageList.createdAt"/></span>
          <span>{formatDate(get(detailInfo, "created_at"))}</span>
        </div>
        <div className="rowModal ">
          <span><FormattedMessage id="walletTransaction.pageList.type"/></span>
          <span>{renderVn(get(detailInfo, "type"))}</span>
        </div>
        <div
          className={`rowModal rowModal-color ${
            get(detailInfo, "type") === "TRANSFER" ? "" : "display-none"
          }`}
        >
          {get(detailInfo, "action") !== "OUT" ? (
            <>
              <span><FormattedMessage id="walletTransaction.pageList.sender"/> </span>
              <span>{get(detailInfo, "customerReceived.full_name")}</span>
            </>
          ) : (
            <>
              <span><FormattedMessage id="walletTransaction.pageList.receiver"/> </span>
              <span>
                {get(detailInfo, "customerReceived.full_name") ||
                  <FormattedMessage id="walletTransaction.pageList.customerReceived"/>}
              </span>
            </>
          )}
        </div>

        <div
          className={`rowModal ${
            get(detailInfo, "type") === "TRANSFER" ? "" : "rowModal-color"
          }`}
        >
          <span><FormattedMessage id="walletTransaction.pageList.amount"/></span>
          <span>
            {get(detailInfo, "amount")} {get(detailInfo, "currency")}
          </span>
        </div>
        <div
          className={`rowModal  ${
            get(detailInfo, "type") === "TRANSFER" ? "rowModal-color" : ""
          }`}
        >
          <span><FormattedMessage id="walletTransaction.pageList.fee"/></span>
          <span>
            {get(detailInfo, "fee")} {get(detailInfo, "currency")}
          </span>
        </div>
        <div
          className={`rowModal  ${
            get(detailInfo, "type") === "TRANSFER" ? "" : "rowModal-color"
          }`}
        >
          <span><FormattedMessage id="walletTransaction.pageList.amountActuallyReceived"/></span>
          <span>
            {get(detailInfo, "amount") - get(detailInfo, "fee")}{" "}
            {get(detailInfo, "currency")}
          </span>
        </div>
        <div
          className={`rowModal  ${
            get(detailInfo, "type") === "TRANSFER" ? "rowModal-color" : ""
          }`}
        >
          <span><FormattedMessage id="walletTransaction.pageList.status"/></span>
          {renderStatus(get(detailInfo, "status"))}
        </div>
        <div
          className={`rowModal-add  ${
            get(detailInfo, "type") === "TRANSFER" ? "" : "rowModal-color"
          }`}
        >
          <p>
            <u><FormattedMessage id="walletTransaction.pageList.infoPl"/></u>
          </p>
          <p><FormattedMessage id="walletTransaction.pageList.orderId"/> <Link to={`/order/${get(detailInfo, "order.id")}`}>{get(detailInfo, "order.order_code")}</Link></p>
          <p><FormattedMessage id="walletTransaction.pageList.note"/> {get(detailInfo, "note")}</p>
        </div>
      </Modal>
    </>
  );
};
export default PageList;
