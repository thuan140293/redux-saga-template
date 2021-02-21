import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Input, Button, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCustomerInsurance,
  updateCustomerInsurance,
  createCustomerInsurance,
  getGeneralKeyList
} from 'modules/health-profile/redux/actions';
import { toast } from 'react-toastify';
import { cloneDeep } from 'lodash';
import './styles.scss';
import { injectIntl } from 'react-intl';
const Insurance = ({intl}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { listInsurance } = useSelector(state => state.healthProfile);
  const { userInfo } = useSelector(state => state.auth);

  const [insurances, setInsurances] = useState([]);

  useEffect(() => {
    if (!listInsurance.length) {
      dispatch(
        getGeneralKeyList({ type: 'insurance' }, 'listInsurance')
      );
    }
  }, []);
  useEffect(() => {
    if (userInfo) {
      const data = userInfo.customerInsurances || [];
      setInsurances(cloneDeep(data));
      setFormValue(data);
    }
  }, [userInfo]);

  const setFormValue = data => {
    let obj = {};
    data.forEach((item, index) => {
      obj = {
        ...obj,
        [`general_key_id${index}`]: item.general_key_id,
        [`insurance_code${index}`]: item.insurance_code
      };
    });
    form.setFieldsValue(obj);
  }

  const onSaveInsurance = (item, index) => {
    const values = form.getFieldsValue();
    const body = {
      general_key_id: values[`general_key_id${index}`],
      insurance_code: values[`insurance_code${index}`]
    };

    if (
      !body.general_key_id || 
      !body.insurance_code
    ) {
      toast.error('Vui lòng đầy đủ thông tin');
      return;
    }

    if (item.id) {
      body.id = item.id
      dispatch(updateCustomerInsurance(body));
      return;
    }
    dispatch(createCustomerInsurance(body));
  }

  const onDeleteInsurance = (item, index) => {
    if (item.id) {
      dispatch(deleteCustomerInsurance({ id: item.id }));
      return;
    }
    setInsurances(insurances.filter((item, i) => i !== index));
  }

  const addNewInsurance = () => {
    if (insurances.length > (userInfo.customerInsurances || []).length) {
      toast.error('Vui lòng lưu thông tin trước khi thêm mới');
      return;
    }
    const insurancesNew = [
      ...cloneDeep(insurances),
      { general_key_id: null, insurance_code: null, id: null }
    ]
    setInsurances(insurancesNew);
    setFormValue(insurancesNew);
  }

  return (
    <>
      <Button
        onClick={addNewInsurance}
        type="primary"
        className="button-save mt-20 mb-20"
      >{intl.formatMessage({ id: 'healthProfile.insurance.addNew' })}</Button>
      <Form layout='vertical' form={form}>
        {insurances.map((item, index) => (
          <Row gutter={[10, 10]} key={item.id}>
            <Col span={7} md={8} xs={24}>
              <Form.Item
                label={intl.formatMessage({ id: 'healthProfile.insurance.insurances' })}
                name={`general_key_id${index}`}
                rules={[
                  { required: true, message: intl.formatMessage({ id: 'healthProfile.insurance.message' }) }
                ]}
                initialValue={item.general_key_id}
                shouldUpdate
              >
                <Select
                  showSearch
                  placeholder={intl.formatMessage({ id: 'healthProfile.insurance.chooseInsurances' })}
                  filterOption={false}
                >
                  {
                    (listInsurance || []).map(key => (
                      <Select.Option key={key.id} value={key.id}>{key.value}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={7} md={8} xs={24}>
              <Form.Item
                rules={[{ required: true, message: intl.formatMessage({ id: 'healthProfile.insurance.message' }) }]}
                name={`insurance_code${index}`}
                label="Code"
                initialValue={item.insurance_code}
              >
                <Input type="text" placeholder={intl.formatMessage({ id: 'healthProfile.insurance.inputCode' })} />
              </Form.Item>
            </Col>

            <Col span={7} md={8} xs={24} className='insurance-action'>
              <Button
                onClick={() => onSaveInsurance(item, index)}
                type="primary"
                className="button-save mr-10"
              >{intl.formatMessage({ id: 'healthProfile.insurance.save' })}</Button>

              <Button
                onClick={() => onDeleteInsurance(item, index)}
                type="danger"
                className="button-delete"
              >{intl.formatMessage({ id: 'healthProfile.insurance.delete' })}</Button>
            </Col>
          </Row>

        ))}
      </Form>
    </>

  )
}

export default injectIntl(Insurance);
