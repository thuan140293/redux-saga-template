import React, { useState, useEffect } from "react";
import { pickBy, get } from "lodash";
import { FormattedMessage, injectIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import * as qs from "query-string";

import { formatDate } from "helpers/CommonHelper";
import {
  OPTION_TRANSACTIONS_TYPES,
  OPTION_COMMISSIONS_TYPES,
} from "commons/constants";

import { getListWalletTransaction } from "modules/wallet-transaction/redux/actions";
import FeatherArrowIcon from "modules/dashboard/components/FeatherArrowIcon";
import ReportTable from "modules/dashboard/components/ReportTable";

import "./styles.scss";

const Transactions = ({ intl }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState({
    pageIndex: 1,
    pageSize: 10,
    type: OPTION_COMMISSIONS_TYPES.all,
    currency: OPTION_TRANSACTIONS_TYPES.USDTJSB,
  });

  const walletTransList = useSelector(
    (state) => state.walletTransaction.walletTransactionList
  );

  useEffect(() => {
    const queryString = qs.stringify(pickBy(search));
    dispatch(getListWalletTransaction(queryString));
  }, [dispatch, search]);

  const columns = [
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        switch (get(record, "action")) {
          case "IN":
            return <FeatherArrowIcon isDown={false} />;
          case "OUT":
            return <FeatherArrowIcon isDown={true} />;
          default:
            return "";
        }
      },
    },
    {
      title: <FormattedMessage id="dashboard.lastestTransactions.value" />,
      dataIndex: "amount",
      key: "amount",
      render: (text) =>
        text.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
    },
    {
      title: <FormattedMessage id="dashboard.lastestTransactions.fee" />,
      dataIndex: "fee",
      key: "fee",
      render: (text) => <span>{text !== null ? text : 0}</span>,
    },
    {
      title: <FormattedMessage id="dashboard.lastestTransactions.time" />,
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => (text ? formatDate(text) : ""),
      align: "right",
    },
  ];

  const filterType = (currency) => () => {
    setSearch({
      ...search,
      currency,
    });
  };

  const renderExtraOption = () => {
    const { currency } = search;
    return (
      <>
        <a
          href="#"
          onClick={filterType(OPTION_TRANSACTIONS_TYPES.USDTTRON)}
          className={`filter ${
            currency === OPTION_TRANSACTIONS_TYPES.USDTTRON ? "active" : ""
          }`}
        >
          <FormattedMessage id="dashboard.lastestTransactions.USDTTRON" />
        </a>
        <a
          href="#"
          onClick={filterType(OPTION_TRANSACTIONS_TYPES.USDTJSB)}
          className={`filter ${
            currency === OPTION_TRANSACTIONS_TYPES.USDTJSB ? "active" : ""
          }`}
        >
          <FormattedMessage id="dashboard.lastestTransactions.USDTJSB" />
        </a>
        <a
          href="#"
          onClick={filterType(OPTION_TRANSACTIONS_TYPES.JSB)}
          className={`filter ${
            currency === OPTION_TRANSACTIONS_TYPES.JSB ? "active" : ""
          }`}
        >
          <FormattedMessage id="dashboard.lastestTransactions.JSB" />
        </a>
      </>
    );
  };

  return (
    <div className="transactions">
      <ReportTable
        pagination
        title={<FormattedMessage id="dashboard.lastestTransactions.title" />}
        extra={renderExtraOption()}
        rowKey={(record) => record.id}
        dataSource={get(walletTransList, "data", [])}
        columns={columns}
        pagination={{
          current: search.pageIndex,
          total: get(walletTransList, "total", 0),
          onChange: (page, pageRecord) => {
            setSearch({
              ...search,
              pageIndex: page,
              pageSize: pageRecord,
            });
          },
          locale: {
            items_per_page: intl.formatMessage({
              id: "walletTransaction.list.pages",
            }),
          },
        }}
      />
    </div>
  );
};

export default injectIntl(Transactions);
