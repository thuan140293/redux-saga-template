import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button, Select, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateCustomerFamily,
  createCustomerFamily,
  deleteCustomerFamily,
  getGeneralKeyList
} from 'modules/health-profile/redux/actions';
import { get, cloneDeep } from 'lodash';
import { injectIntl } from 'react-intl';

const Family = ({intl}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { listFamily } = useSelector(state => state.healthProfile);
  const { userInfo } = useSelector(state => state.auth);

  const [families, setFamilies] = useState([]);

  useEffect(() => {
    if (!listFamily.length) {
      dispatch(
        getGeneralKeyList({ type: 'relationship' }, 'listFamily')
      );
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      const data = get(userInfo, "customerFamilies") || [];
      setFamilies(data);
      setFormValue(data);
    }
  }, [userInfo]);

  const setFormValue = data => {
    let obj = {};
    data.forEach((item, index) => {
      obj = {
        ...obj,
        [`family_name${index}`]: item.family_name,
        [`family_phone${index}`]: item.family_phone,
        [`general_key_id${index}`]: item.general_key_id
      };
    });
    form.setFieldsValue(obj);
  }

  const onSave = (item, index) => {
    const values = form.getFieldsValue();
    const body = {
      family_name: values[`family_name${index}`],
      family_phone: values[`family_phone${index}`],
      general_key_id: values[`general_key_id${index}`],
      is_default: false
    };

    if (item.id) {
      body.id = item.id;
      dispatch(
        updateCustomerFamily(body)
      );
      return;
    }
    dispatch(createCustomerFamily(body));
  }

  const onDelete = (item, index) => {
    if (item.id) {
      dispatch(deleteCustomerFamily({ id: item.id }));
      return;
    }
    const list = cloneDeep(families);
    list.splice(index, 1);
    setFamilies(list);
  }

  const addNew = () => {
    if (families.length > (get(userInfo, "customerFamilies") || []).length) {
      return;
    }
    const familiesNew = [
      ...families, {
        general_key_id: null,
        family_name: null,
        family_phone: null,
        id: null
      }
    ];
    
    setFamilies(familiesNew);
    setFormValue(familiesNew);
  }

  return (
    <>
      <Button
        onClick={addNew}
        type="primary"
        className="button-save mt-20 mb-20"
      >{intl.formatMessage({ id: 'healthProfile.family.addNew' })}</Button>

      <Form layout='vertical' form={form}>
        {families.map((item, index) => (
          <Row gutter={[10, 10]} key={item.id}>
            <Col span={6} md={8} xs={24}>
              <Form.Item
                label={intl.formatMessage({ id: 'healthProfile.family.name' })}
                name={`family_name${index}`}
                className="form-item-custom"
                rules={[{ required: true, message: intl.formatMessage({ id: 'healthProfile.family.message' }) }]}
                initialValue={item.family_name}
              >
                <Input placeholder={intl.formatMessage({ id: 'healthProfile.family.inputName' })} />
              </Form.Item>
            </Col>
            <Col span={6} md={8} xs={24}>
              <Form.Item
                label={intl.formatMessage({ id: 'healthProfile.family.phone' })}
                className="form-item-custom"
                name={`family_phone${index}`}
                rules={[{ required: true, message: intl.formatMessage({ id: 'healthProfile.family.message' }) }]}
                initialValue={item.family_phone}
              >
                <Input type="text" placeholder={intl.formatMessage({ id: 'healthProfile.family.inoutPhone' })} />
              </Form.Item>
            </Col>
            <Col span={6} md={8} xs={24}>
              <Form.Item
                label={intl.formatMessage({ id: 'healthProfile.family.relationship' })}
                name={`general_key_id${index}`}
                rules={[
                  { required: true, message: intl.formatMessage({ id: 'healthProfile.family.message' }) }
                ]}
                initialValue={item.general_key_id}
              >
                <Select
                  showSearch
                  placeholder={intl.formatMessage({ id: 'healthProfile.family.chooseRelationship' })}
                  filterOption={false}
                >
                  {
                    (listFamily || []).map(key => (
                      <Select.Option key={key.id} value={key.id}>{key.value}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>

            <Col span={6} md={8} xs={24} className='family-action'>
              <Button
                onClick={() => onSave(item, index)}
                type="primary"
                className="button-save mr-10"
              >{intl.formatMessage({ id: 'healthProfile.family.save' })}</Button>

              <Button
                onClick={() => onDelete(item, index)}
                type="danger"
                className="button-delete"
              >{intl.formatMessage({ id: 'healthProfile.family.delete' })}</Button>
            </Col>
          </Row>

        ))}
      </Form>
    </>

  )
}

export default injectIntl(Family);
