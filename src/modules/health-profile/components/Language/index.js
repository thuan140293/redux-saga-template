import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCustomerHealth,
  updateCustomerHealth,
  deleteCustomerHealth,
  getGeneralKeyList
} from 'modules/health-profile/redux/actions';
import { get, cloneDeep } from 'lodash';
import { injectIntl } from 'react-intl';
const Language = ({intl}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { listLanguage } = useSelector(state => state.healthProfile);
  const { userInfo } = useSelector(state => state.auth);

  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    if (!listLanguage.length) {
      dispatch(
        getGeneralKeyList({ type: 'language' }, 'listLanguage')
      );
    }
  }, []);
  useEffect(() => {
    if (userInfo) {
      const data = get(userInfo, "customerHealths.language") || [];
      setLanguages(data);
      setFormValue(data);
    }
  }, [userInfo]);

  const setFormValue = data => {
    let obj = {};
    data.forEach((item, index) => {
      obj = {
        ...obj,
        [`general_key_id${index}`]: item.general_key_id
      };
    });
    form.setFieldsValue(obj);
  }

  const onSave = (item, index) => {
    const values = form.getFieldsValue();
    if (item.id) {
      const body = {
        id: item.id,
        general_key_id: values[`general_key_id${index}`]
      };
      dispatch(
        updateCustomerHealth({ payload: body, field: 'language' })
      )
      return;
    }

    dispatch(
      createCustomerHealth({
        payload: { type: 'language', general_key_id: values[`general_key_id${index}`] },
        field: 'language'
      })
    )
  }

  const onDelete = (item, index) => {
    if (item.id) {
      dispatch(
        deleteCustomerHealth({
          payload: { id: item.id },
          field: 'language'
        })
      )
      return;
    }
    const list = cloneDeep(languages);
    list.splice(index, 1);
    setLanguages(list);
  }

  const addNew = () => {
    if (languages.length > (get(userInfo, "customerHealths.language") || []).length) {
      return;
    }
    const languagesNew = [
      ...languages,
      { id: null, general_key_id: null }
    ];
    setLanguages(languagesNew);
    setFormValue(languagesNew);
  }

  return (
    <>
      <Button
        onClick={addNew}
        type="primary"
        className="button-save mt-20 mb-20"
      >{intl.formatMessage({ id: 'healthProfile.language.addNew' })}</Button>
      <Form layout='vertical' form={form}>
        {languages.map((item, index) => (
          <Row gutter={[10, 10]} key={item.id}>
            <Col span={7} md={8} xs={24}>
              <Form.Item
                label={intl.formatMessage({ id: 'healthProfile.language.typeLanguages' })}
                name={`general_key_id${index}`}
                rules={[
                  { required: true, message: intl.formatMessage({ id: 'healthProfile.language.message' }) }
                ]}
                initialValue={item.general_key_id}
              >
                <Select
                  showSearch
                  placeholder={intl.formatMessage({ id: 'healthProfile.language.chooseLanguages' })}
                  filterOption={false}
                >
                  {
                    (listLanguage || []).map(key => (
                      <Select.Option key={key.id} value={key.id}>{key.value}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>

            <Col span={7} md={8} xs={24} className='insurance-action'>
              <Button
                onClick={() => onSave(item, index)}
                type="primary"
                className="button-save mr-10"
              >{intl.formatMessage({ id: 'healthProfile.language.save' })}</Button>

              <Button
                onClick={() => onDelete(item, index)}
                type="danger"
                className="button-delete"
              >{intl.formatMessage({ id: 'healthProfile.language.delete' })}</Button>
            </Col>
          </Row>

        ))}
      </Form>
    </>

  )
}

export default injectIntl(Language);
