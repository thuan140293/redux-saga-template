import React, { useState, useEffect } from "react";
import { pickBy, get, toLower, toUpper, includes } from "lodash";
import { FormattedMessage, injectIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import * as qs from "query-string";

import { formatDate } from "helpers/CommonHelper";
import { OPTION_COMMISSIONS_TYPES } from "commons/constants";

import { getListCommissions } from "modules/commissions/redux/actions";
import FeatherArrowIcon from "modules/dashboard/components/FeatherArrowIcon";
import ReportTable from "modules/dashboard/components/ReportTable";

import "./styles.scss";

const Commissions = ({ intl }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState({
    page: 1,
    limit: 10,
    type: OPTION_COMMISSIONS_TYPES.all,
  });

  const commissionsList = useSelector(
    (state) => state.commissions.commissionsList
  );

  useEffect(() => {
    const queryString = qs.stringify(pickBy(search));
    dispatch(getListCommissions(queryString));
  }, [dispatch, search]);

  const columns = [
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        switch (get(record, "type")) {
          case "earn":
            return <FeatherArrowIcon isDown={false} />;
          default:
            return <FeatherArrowIcon isDown={true} />;
        }
      },
    },
    {
      title: <FormattedMessage id="dashboard.lastestCommission.value" />,
      dataIndex: "value",
      key: "value",
      render: (text) =>
        text.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
    },
    {
      title: <FormattedMessage id="dashboard.lastestCommission.type" />,
      dataIndex: "type",
      key: "type",
      render: (text) => <span>{text !== "earn" ? "Recieved" : "Earned"}</span>,
    },
    {
      title: <FormattedMessage id="dashboard.lastestCommission.time" />,
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => (text ? formatDate(text) : ""),
      align: "right",
    },
  ];

  const filterType = (type) => () => {
    setSearch({
      ...search,
      type: toLower(type),
    });
  };

  const renderExtraOption = () => {
    const { type } = search;
    return (
      <>
        <a
          href="#"
          onClick={filterType(OPTION_COMMISSIONS_TYPES.all)}
          className={`filter ${
            toUpper(type) === OPTION_COMMISSIONS_TYPES.all ? "active" : ""
          }`}
        >
          <FormattedMessage id="dashboard.lastestCommission.all" />
        </a>
        <a
          href="#"
          onClick={filterType(OPTION_COMMISSIONS_TYPES.earn)}
          className={`filter ${
            toUpper(type) === OPTION_COMMISSIONS_TYPES.earn ? "active" : ""
          }`}
        >
          <FormattedMessage id="dashboard.lastestCommission.earned" />
        </a>
        <a
          href="#"
          onClick={filterType(OPTION_COMMISSIONS_TYPES.receive)}
          className={`filter ${
            !includes(
              [OPTION_COMMISSIONS_TYPES.all, OPTION_COMMISSIONS_TYPES.earn],
              toUpper(type)
            )
              ? "active"
              : ""
          }`}
        >
          <FormattedMessage id="dashboard.lastestCommission.received" />
        </a>
      </>
    );
  };

  return (
    <div className="transactions">
      <ReportTable
        pagination
        title={<FormattedMessage id="dashboard.lastestCommission.title" />}
        extra={renderExtraOption()}
        rowKey={(record) => record.id}
        dataSource={get(commissionsList, "data", [])}
        columns={columns}
        pagination={{
          current: search.pageIndex,
          total: get(commissionsList, ["pagination", "total"], 0),
          onChange: (page, pageRecord) => {
            setSearch({
              ...search,
              page: page,
              limit: pageRecord,
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

export default injectIntl(Commissions);
