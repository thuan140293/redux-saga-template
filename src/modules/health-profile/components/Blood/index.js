import React, { useEffect } from 'react';
import { Form, Row, Col, Button, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCustomerHealth,
  updateCustomerHealth,
  getGeneralKeyList
} from 'modules/health-profile/redux/actions';
import { get } from 'lodash';
import { injectIntl } from 'react-intl';
const Blood = ({intl}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { listBlood } = useSelector(state => state.healthProfile);
  const { userInfo } = useSelector(state => state.auth);
  
  const id = get(userInfo, "customerHealths.blood[0].id");
  useEffect(() => {
    if (!listBlood.length) {
      dispatch(
        getGeneralKeyList({ type: 'blood' }, 'listBlood')
      );
    }
  }, []);


  const onSaveBlood = () => {
    const values = form.getFieldsValue();

    if (id) {
      dispatch(
        updateCustomerHealth({
          payload: { ...values, id, type: 'blood' },
          field: 'blood'
        })
      );
      return;
    }

    dispatch(
      createCustomerHealth({
        payload: { ...values, type: 'blood' },
        field: 'blood'
      })
    )
  }

  return (
    <>
      <Form layout='vertical' form={form}>
        <Row gutter={[10, 10]}>
          <Col span={7} md={8} xs={24}>
            <Form.Item
              label={intl.formatMessage({ id: 'healthProfile.blood.label' })}
              name={`general_key_id`}
              rules={[
                { required: true, message: intl.formatMessage({ id: 'healthProfile.blood.message' }) }
              ]}
              initialValue={get(userInfo, "customerHealths.blood[0].general_key_id")}
            >
              <Select
                showSearch
                placeholder={intl.formatMessage({ id: 'healthProfile.blood.placeholder' })}
                filterOption={false}
              >
                {
                  (listBlood || []).map(key => (
                    <Select.Option key={key.id} value={key.id}>{key.value}</Select.Option>
                  ))
                }
              </Select>
            </Form.Item>
          </Col>

          <Col span={7} md={8} xs={24} className='insurance-action'>
            <Button
              onClick={onSaveBlood}
              type="primary"
              className="button-save mr-10"
            >{intl.formatMessage({ id: 'healthProfile.blood.save' })}</Button>
          </Col>
        </Row>

      </Form>
    </>

  )
}

export default injectIntl(Blood);
