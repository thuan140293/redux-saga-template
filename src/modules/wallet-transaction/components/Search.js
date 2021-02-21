import React, {useEffect} from 'react';
import {Form, Select} from 'antd';
import {get} from 'lodash';
import { FormattedMessage } from 'react-intl';
const Search = (props) => {
  const [form] = Form.useForm();
  const {setFieldsValue} = form;
  const {search, setSearch} = props;

  useEffect(() => {
    setFieldsValue({
      type: get(search, 'type'),
    });
  }, [search, setFieldsValue]);

  const handleChange = (value) => {
    setSearch({
      ...search,
      type: value,
      pageIndex: 1,
    });
  };
  return (
    <Form form={form} >
      <Form.Item name="type" label="Lọc">
        <Select onChange={handleChange}>
          <Select.Option value="ALL"><FormattedMessage id="walletTransaction.search.all"/></Select.Option>
          <Select.Option value="EARN"><FormattedMessage id="walletTransaction.search.earn"/></Select.Option>
          <Select.Option value="DEPOSIT"><FormattedMessage id="walletTransaction.search.deposit"/></Select.Option>
          <Select.Option value="WITHDRAW"><FormattedMessage id="walletTransaction.search.withdraw"/></Select.Option>
          <Select.Option value="BUY"><FormattedMessage id="walletTransaction.search.buy"/></Select.Option>
          <Select.Option value="TRANSFER"><FormattedMessage id="walletTransaction.search.transfer"/></Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
};

export default Search;
