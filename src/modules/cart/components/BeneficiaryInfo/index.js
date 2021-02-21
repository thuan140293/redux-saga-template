import React, { useEffect } from 'react';
import { Row, Col, Form, Input, Select, DatePicker, Button } from 'antd';
import { isEmpty, get } from 'lodash';
import { useSelector } from 'react-redux';
import * as moment from 'moment';
import { injectIntl } from 'react-intl';
const BeneficiaryInfo = ({
  userInfo,
  onGetListCity,
  onCloseModal,
  onSubmit,
  intl
}) => {
  const [form] = Form.useForm();
  const { listRelation, listCountry, listCity } = useSelector(state => state.testGen);

  useEffect(() => {
    if (isEmpty(userInfo)) {
      return;
    }
    form.setFieldsValue({
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      gender: userInfo.gender,
      phone_number: userInfo.phone_number,
      address: userInfo.address,
      email: userInfo.email,
      country: userInfo.country,
      province: userInfo.province,
      birthday: userInfo.birthday ? moment(userInfo.birthday) : null,
      company: userInfo.company,
      relation_id: userInfo.relation_id
    });
    onGetListCity({ city_name: userInfo.country || 'Viet Nam' });
  }, [userInfo])

  const onSave = values => {
    const payload = {
      ...values,
      birthday: moment(values.birthday).format("YYYY-MM-DD"),
    };
    onSubmit(payload);
  }

  return (
    <Form layout='vertical' form={form} onFinish={onSave}>
      <Row gutter={10}>

        <Col span={12}>
          <Form.Item
            name="lastName"
            label={intl.formatMessage({ id: 'cart.beneficiaryInfo.lastName' })}
            className="form-item-custom"
            rules={[{ required: true, message: intl.formatMessage({ id: 'cart.beneficiaryInfo.messageObligatory' })}]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="firstName"
            label={intl.formatMessage({ id: 'cart.beneficiaryInfo.firstName' })}
            className="form-item-custom"
            rules={[{ required: true, message: intl.formatMessage({ id: 'cart.beneficiaryInfo.messageObligatory' }) }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="gender"
            label={intl.formatMessage({ id: 'cart.beneficiaryInfo.gender' })}
            className="form-item-custom"
            rules={[{ required: true, message: intl.formatMessage({ id: 'cart.beneficiaryInfo.messageObligatory' }) }]}
          >
            <Select placeholder={intl.formatMessage({ id: 'cart.beneficiaryInfo.chooseGender' })}>
              <Select.Option value="male">{intl.formatMessage({ id: 'cart.beneficiaryInfo.male' })}</Select.Option>
              <Select.Option value="female">{intl.formatMessage({ id: 'cart.beneficiaryInfo.female' })}</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="relation_id"
            label={intl.formatMessage({ id: 'cart.beneficiaryInfo.relation' })}
            className="form-item-custom"
            rules={[{ required: true, message: intl.formatMessage({ id: 'cart.beneficiaryInfo.messageObligatory' }) }]}
          >
            <Select
              showSearch
              optionFilterProp="children"
              placeholder={intl.formatMessage({ id: 'cart.beneficiaryInfo.chooseRelation' })}
            >

              {listRelation.map(item => (
                <Select.Option key={item.id} value={item.id}>{item.value}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="birthday"
            label={intl.formatMessage({ id: 'cart.beneficiaryInfo.birthday' })}
            className="form-item-custom"
            rules={[{ required: true, message: intl.formatMessage({ id: 'cart.beneficiaryInfo.messageObligatory' }) }]}
          >
            <DatePicker className='w-100pc' format="DD/MM/YYYY" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="phone_number"
            label={intl.formatMessage({ id: 'cart.beneficiaryInfo.phone' })}
            className="form-item-custom"
            rules={[
              { required: true, message: intl.formatMessage({ id: 'cart.beneficiaryInfo.messageObligatory' }) },
              {
                pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
                message: intl.formatMessage({ id: 'cart.beneficiaryInfo.phoneMessage' })
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="email"
            label='Email'
            className="form-item-custom"
            rules={[
              { required: true, message: intl.formatMessage({ id: 'cart.beneficiaryInfo.messageObligatory' }) },
              {
                type: "email",
                message: intl.formatMessage({ id: 'cart.beneficiaryInfo.emailMessage' })
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="country"
            label={intl.formatMessage({ id: 'cart.beneficiaryInfo.country' })}
            className="form-item-custom"
            rules={[{ required: true, message: intl.formatMessage({ id: 'cart.beneficiaryInfo.messageObligatory' }) }]}
          >
            <Select
              showSearch
              optionFilterProp="children"
              placeholder={intl.formatMessage({ id: 'cart.beneficiaryInfo.chooseCountry' })}
            >
              {(listCountry || []).map(item => (
                <Select.Option key={item.name} value={item.name}>{item.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="province"
            label={intl.formatMessage({ id: 'cart.beneficiaryInfo.province' })}
            className="form-item-custom"
            rules={[{ required: true, message: intl.formatMessage({ id: 'cart.beneficiaryInfo.messageObligatory' }) }]}
          >
            <Select
              showSearch
              optionFilterProp="children"
              placeholder={intl.formatMessage({ id: 'cart.beneficiaryInfo.chooseProvince' })}
            >
              {(listCity || []).map(item => (
                <Select.Option key={item.name} value={item.name}>{item.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="address"
            label={intl.formatMessage({ id: 'cart.beneficiaryInfo.address' })}
            className="form-item-custom"
            rules={[{ required: true, message: intl.formatMessage({ id: 'cart.beneficiaryInfo.messageObligatory' }) }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="company"
            label={intl.formatMessage({ id: 'cart.beneficiaryInfo.company' })}
            className="form-item-custom"
          >
            <Input />
          </Form.Item>
        </Col>

      </Row>

      <div className='mt-10 t-right'>
        <Button onClick={onCloseModal} className='mr-10'>{intl.formatMessage({ id: 'cart.beneficiaryInfo.cancel' })}</Button>
        <Button htmlType='submit' type='primary'>{intl.formatMessage({ id: 'cart.beneficiaryInfo.save' })}</Button>
      </div>
    </Form>
  )
};

export default injectIntl(BeneficiaryInfo);
