import React from "react";
import { Table, Typography } from "antd";
import { useSelector } from "react-redux";
import { get } from "lodash";
import { formatDate } from "helpers/CommonHelper";
import { FormattedMessage, injectIntl } from "react-intl";
const moment = require("moment-timezone");

// eslint-disable-next-line require-jsdoc
const { Text } = Typography;
function ItemList(props) {
  const { search, setSearch, pageDetail, intl } = props;
  const orderList = useSelector((state) => state.order.orderList);
  const renderStatus = (value) => {
    switch (value) {
      case 0:
      case "0":
      case "CANCEL":
        return <Text type="warning"><FormattedMessage id="order.list.cancel"/></Text>;
      case 1:
      case "1":
      case "COMPLETED":
      case "SUCCESS":
        return <Text className="text-success-color"><FormattedMessage id="order.list.success"/></Text>;
      case 2:
      case "2":
      case "PENDING":
        return <Text><FormattedMessage id="order.list.pending"/></Text>;
      default:
        break;
    }
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "",
      key: "stt",
      render: (text, record, index) =>
        search.page === 1
          ? index + 1
          : search.limit * (search.page - 1) + (index + 1),
    },
    {
      title: intl.formatMessage({ id: 'order.list.content' }),
      dataIndex: '',
      key: 'content',
      render: (text, record, index) =>
        get(record, "status") === 2
          ? `${intl.formatMessage({ id: 'order.list.content.status1' })} ${get(record, "order_code")} ${intl.formatMessage({ id: 'order.list.content.status1.title' })}`
          : `${intl.formatMessage({ id: 'order.list.content.status2' })} ${get(record, "order_code")} ${intl.formatMessage({ id: 'order.list.content.status2.title' })}`,
    },
    {
      title: intl.formatMessage({ id: 'order.list.amount' }),
      dataIndex: '',
      key: 'amount',
      align: 'right',
      render: (text, record, index) => {
        const value = Math.round(get(record, "total_pay") * 100) / 100;
        const currency = get(record, "currency") || "ICB";
        return `${value
          .toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} ${currency}`;
      },
    },
    {
      title: intl.formatMessage({ id: 'order.list.status' }),
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (text) => renderStatus(text),
    },
    {
      title: intl.formatMessage({ id: 'order.list.createdAt' }),
      dataIndex: "created_at",
      key: "created_at",
      render: (text, record) => {
        const created_at = get(record, "created_at");
        //update created_at -> timezone +7
        const tz = moment(created_at)
          .tz("Pacific/Kiritimati")
          .format("HH:mm DD/MM/YYYY");
        return tz;
      },
    },
  ];
  return (
    <Table
      className="table-ant-custom"
      columns={columns}
      dataSource={get(orderList, "data")}
      rowKey={(record) => record.id}
      onRow={(record) => ({
        onClick: () => {
          pageDetail(record.id);
        },
      })}
      pagination={{
        locale: { items_per_page: intl.formatMessage({ id: 'order.list.pages' }) },
        current: search.page,
        total: get(orderList, "total"),
        onChange: (page, pageRecord) => {
          setSearch({
            ...search,
            page,
            limit: pageRecord,
          });
        },
      }}
    />
  );
}

export default injectIntl(ItemList);
