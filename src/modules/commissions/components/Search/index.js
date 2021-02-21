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
    });
  };
  return (
    <Form form={form} >
      <Form.Item name="type" label={<FormattedMessage id="commissions.search.filter"/>}>
        <Select onChange={handleChange}>
          <Select.Option value="earn"><FormattedMessage id="commissions.search.withdrawalICB"/></Select.Option>
          <Select.Option value=""><FormattedMessage id="commissions.search.all"/></Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
};

export default Search;
