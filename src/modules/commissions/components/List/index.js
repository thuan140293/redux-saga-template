import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Table, Typography} from 'antd';
import {get} from 'lodash';
import {formatDate} from 'helpers/CommonHelper';
import { injectIntl } from 'react-intl';

const {Text} = Typography;
const List = ({intl}) => {
  const [page, setPage] = useState(1);
  const commissionsList = useSelector(
      (state) => state.commissions.commissionsList,
  );
  const renderStatus = (value) =>{
    switch (value) {
      case 0:
      case '0':
      case 'FAILED':
        return <Text type='warning'>{intl.formatMessage({ id: 'commissions.list.failed' })}</Text>;
      case 1:
      case '1':
      case 'COMPLETED':
      case 'SUCCESS':
        return <Text className='text-success-color'>{intl.formatMessage({ id: 'commissions.list.success' })}</Text>;
      case 2:
      case '2':
      case 'PENDING':
        return <Text>{intl.formatMessage({ id: 'commissions.list.pending' })}</Text>;
      default:
        break;
    }
  };
  const columns = [
    {
      title: 'STT',
      dataIndex: '',
      key: 'STT',
      render: (text, record, index) => page === 1 ? index + 1 : (10 * (page - 1)) + ( index + 1),
    },
    {
      title: intl.formatMessage({ id: 'commissions.list.type' }),
      dataIndex: 'type',
      key: 'type',
      render: (text, record) =>
        text === 'earn' ? 'Rút về ví ICB' : 'Nhận thưởng hệ thống',
    },
    {
      title: intl.formatMessage({ id: 'commissions.list.value' }),
      dataIndex: 'value',
      key: 'value',
      render: (text, record) =>
        get(record, 'type') === 'earn' ? `- ${text}` : `+ ${text}`,
    },
    {
      title: intl.formatMessage({ id: 'commissions.list.from' }),
      dataIndex: '',
      key: 'from',
      align: 'center',

      render: (text, record) => `${get(record, 'from_customer.full_name')}`,
    },
    {
      title: intl.formatMessage({ id: 'commissions.list.to' }),
      dataIndex: '',
      key: 'to',
      align: 'center',
      render: (text, record) => `${get(record, 'to_customer.full_name') || ''}`,
    },
    {
      title: intl.formatMessage({ id: 'commissions.list.status' }),
      dataIndex: 'status',
      key: 'status',
      render: (text) => renderStatus(text),
    },
    {
      title: intl.formatMessage({ id: 'commissions.list.createdAt' }),
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text, record) => formatDate(get(record, 'created_at')),
    },
  ];
  return (
    <Table
      className='table-ant-custom'
      dataSource={commissionsList}
      columns={columns}
      rowKey={(record) => record.id}
      rowClassName={(record) => {
        if (record.type === 'earn') return 'type-earn';
        else return 'type-other';
      }}
      pagination={{
        onChange: (pageIndex) => {
          setPage(pageIndex);
        },
        locale: {items_per_page: intl.formatMessage({ id: 'commissions.list.pages' })},
      }}
    />
  );
};

export default injectIntl(List);
