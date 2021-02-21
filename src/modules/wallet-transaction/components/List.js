import React from "react";
import { useSelector } from "react-redux";
import { Table, Typography } from "antd";
import { get } from "lodash";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { formatDate } from "helpers/CommonHelper";
import { FormattedMessage } from "react-intl";
const { Text } = Typography;
const List = (props) => {
  const { search, setSearch, openShowDetail } = props;
  const walletTransList = useSelector(
    (state) => state.walletTransaction.walletTransactionList
  );

  const renderStatus = (value) => {
    switch (value) {
      case 0:
      case "0":
      case "FAILED":
        return <Text type="warning"><FormattedMessage id="walletTransaction.list.failed"/></Text>;
      case 1:
      case "1":
      case "COMPLETED":
      case "SUCCESS":
        return <Text className="text-success-color"><FormattedMessage id="walletTransaction.list.success"/></Text>;
      case 2:
      case "2":
      case "PENDING":
        return <Text><FormattedMessage id="walletTransaction.list.pending"/></Text>;
      default:
        break;
    }
  };

  const renderVn = (type) => {
    switch (type) {
      case "TRANSFER":
        return <FormattedMessage id="walletTransaction.list.transfer"/>;
      case "BUY":
        return <FormattedMessage id="walletTransaction.list.buy"/>;
      case "WITHDRAW":
        return <FormattedMessage id="walletTransaction.list.withdraw"/>;
      case "DEPOSIT":
        return <FormattedMessage id="walletTransaction.list.deposit"/>;
      case "EARN":
        return <FormattedMessage id="walletTransaction.list.earn"/>;
      case "membership":
        return <FormattedMessage id="walletTransaction.list.membership"/>;
      default:
        return type;
    }
  };

  const columns = [
    {
      title: "",
      dataIndex: "",
      key: "icon",
      render: (text, record) => {
        switch (get(record, "action")) {
          case "IN":
            return <PlusCircleOutlined className="icon-in-custom" />;
          case "OUT":
            return <MinusCircleOutlined className="icon-out-custom" />;
          default:
            return "";
        }
      },
    },
    {
      title: <FormattedMessage id="walletTransaction.list.code"/>,
      dataIndex: "code",
      key: "code",
    },
    {
      title: <FormattedMessage id="walletTransaction.list.amount"/>,
      dataIndex: "amount",
      key: "amount",
      align: "right",
      render: (text) =>
        text.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
    },
    {
      title: <FormattedMessage id="walletTransaction.list.currency"/>,
      dataIndex: "currency",
      key: "currency",
      align: "center",
      render: (text, record) => {
        return get(record, `currency`) || `ICB`;
      },
    },
    {
      title: <FormattedMessage id="walletTransaction.list.note"/>,
      dataIndex: "note",
      key: "note",
    },
    // {
    //   title: "Ghi chú",
    //   dataIndex: "note",
    //   key: "note",
    // },
    {
      title: <FormattedMessage id="walletTransaction.list.type"/>,
      dataIndex: "type",
      key: "type",
      align: "center",
      render: (text) => renderVn(text),
    },
    {
      title:<FormattedMessage id="walletTransaction.list.status"/>,
      dataIndex: "status",
      key: "status",
      render: (text) => renderStatus(text),
    },
    {
      title: <FormattedMessage id="walletTransaction.list.updatedAt"/>,
      dataIndex: "updated_at",
      key: "updated_at",
      render: (text) => formatDate(text),
    },
  ];
  return (
    <Table
      className="table-ant-custom"
      columns={columns}
      dataSource={walletTransList.data}
      rowKey={(record) => record.id}
      onRow={(record) => ({
        onClick: () => {
          openShowDetail(record);
        },
      })}
      pagination={{
        current: search.pageIndex,
        total: get(walletTransList, "total"),
        onChange: (page, pageRecord) => {
          setSearch({
            ...search,
            pageIndex: page,
            pageSize: pageRecord,
          });
        },
        locale: { items_per_page: <FormattedMessage id="walletTransaction.list.pages"/> },
      }}
    />
  );
};

export default List;
