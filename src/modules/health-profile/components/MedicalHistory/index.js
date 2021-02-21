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
const MedicalHistory = ({intl}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { listMedicalHistory } = useSelector(state => state.healthProfile);
  const { userInfo } = useSelector(state => state.auth);

  const [medicalHistories, setMedicalHistories] = useState([]);

  useEffect(() => {
    if (!listMedicalHistory.length) {
      dispatch(
        getGeneralKeyList({ type: 'medical_history' }, 'listMedicalHistory')
      );
    }
  }, []);
  useEffect(() => {
    if (userInfo) {
      const data = get(userInfo, "customerHealths.medical_history") || [];
      setMedicalHistories(data);
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
        updateCustomerHealth({ payload: body, field: 'medical_history' })
      )
      return;
    }

    dispatch(
      createCustomerHealth({
        payload: { type: 'medical_history', general_key_id: values[`general_key_id${index}`] },
        field: 'medical_history'
      })
    )
  }

  const onDelete = (item, index) => {
    if (item.id) {
      dispatch(
        deleteCustomerHealth({
          payload: { id: item.id },
          field: 'medical_history'
        })
      )
      return;
    }
    const list = cloneDeep(medicalHistories);
    list.splice(index, 1);
    setMedicalHistories(list);
  }

  const addNew = () => {
    if (medicalHistories.length > (get(userInfo, "customerHealths.medical_history") || []).length) {
      return;
    }
    const medicalHistoriesNew = [
      ...medicalHistories,
      { id: null, general_key_id: null }
    ];
    setMedicalHistories(medicalHistoriesNew);
    setFormValue(medicalHistoriesNew);
  }

  return (
    <>
      <Button
        onClick={addNew}
        type="primary"
        className="button-save mt-20 mb-20"
      >{intl.formatMessage({ id: 'healthProfile.medicalHistory.addNew' })}</Button>
      <Form layout='vertical' form={form}>
        {medicalHistories.map((item, index) => (
          <Row gutter={[10, 10]} key={item.id}>
            <Col span={7} md={8} xs={24}>
              <Form.Item
                label={intl.formatMessage({ id: 'healthProfile.medicalHistory.medicalHistories' })}
                name={`general_key_id${index}`}
                rules={[
                  { required: true, message: intl.formatMessage({ id: 'healthProfile.medicalHistory.message' })}
                ]}
                initialValue={item.general_key_id}
              >
                <Select
                  showSearch
                  placeholder={intl.formatMessage({ id: 'healthProfile.medicalHistory.chooseMedicalHistories' })}
                  filterOption={false}
                >
                  {
                    (listMedicalHistory || []).map(key => (
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
              >{intl.formatMessage({ id: 'healthProfile.medicalHistory.save' })}</Button>

              <Button
                onClick={() => onDelete(item, index)}
                type="danger"
                className="button-delete"
              >{intl.formatMessage({ id: 'healthProfile.medicalHistory.delete' })}</Button>
            </Col>
          </Row>

        ))}
      </Form>
    </>

  )
}

export default injectIntl(MedicalHistory);
