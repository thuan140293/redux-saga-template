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
const Allergies = ({intl}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { listAllergy } = useSelector(state => state.healthProfile);
  const { userInfo } = useSelector(state => state.auth);

  const [allergies, setAllergies] = useState([]);

  useEffect(() => {
    if (!listAllergy.length) {
      dispatch(
        getGeneralKeyList({ type: 'allergies' }, 'listAllergy')
      );
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      const data = get(userInfo, "customerHealths.allergies") || [];
      setAllergies(data);
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
        updateCustomerHealth({ payload: body, field: 'allergies' })
      )
      return;
    }

    dispatch(
      createCustomerHealth({
        payload: { type: 'allergies', general_key_id: values[`general_key_id${index}`] },
        field: 'allergies'
      })
    )
  }

  const onDelete = (item, index) => {
    if (item.id) {
      dispatch(
        deleteCustomerHealth({
          payload: { id: item.id },
          field: 'allergies'
        })
      )
      return;
    }
    const list = cloneDeep(allergies);
    list.splice(index, 1);
    setAllergies(list);
  }

  const addNew = () => {
    if (allergies.length > (get(userInfo, "customerHealths.allergies") || []).length) {
      return;
    }
    const allergiesNew = [
      ...allergies,
      { id: null, general_key_id: null }
    ];
    setAllergies(allergiesNew);
    setFormValue(allergiesNew);
  }

  return (
    <>
      <Button
        onClick={addNew}
        type="primary"
        className="button-save mt-20 mb-20"
      >{intl.formatMessage({ id: 'healthProfile.allergies.addNew' })}</Button>
      <Form layout='vertical' form={form}>
        {allergies.map((item, index) => (
          <Row gutter={10} key={item.id}>
            <Col span={7} md={8} xs={12}>
              <Form.Item
                label={intl.formatMessage({ id: 'healthProfile.allergies.typeAllergies' })}
                name={`general_key_id${index}`}
                rules={[
                  { required: true, message: intl.formatMessage({ id: 'healthProfile.allergies.message' }) }
                ]}
                initialValue={item.general_key_id}
              >
                <Select
                  showSearch
                  placeholder={intl.formatMessage({ id: 'healthProfile.allergies.chooseAllergies' })}
                  filterOption={false}
                >
                  {
                    (listAllergy || []).map(key => (
                      <Select.Option key={key.id} value={key.id}>{key.value}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>

            <Col span={7} md={8} xs={12} className='insurance-action'>
              <Button
                onClick={() => onSave(item, index)}
                type="primary"
                className="button-save mr-10"
              >{intl.formatMessage({ id: 'healthProfile.allergies.save' })}</Button>

              <Button
                onClick={() => onDelete(item, index)}
                type="danger"
                className="button-delete"
              >{intl.formatMessage({ id: 'healthProfile.allergies.delete' })}</Button>
            </Col>
          </Row>

        ))}
      </Form>
    </>

  )
}

export default injectIntl(Allergies);
