import React, {useEffect} from 'react';
import {Row, Col, Form, Input, Select, DatePicker, Button} from 'antd';
import {isEmpty} from 'lodash';
import {useSelector} from 'react-redux';
import * as moment from 'moment';
import { injectIntl } from 'react-intl';
const BeneficiaryInfo = ({
  userInfo,
  onGetListCity,
  onGetListRelation,
  intl
}) => {
  const [form] = Form.useForm();
  const {listRelation, listCountry, listCity} = useSelector((state) => state.testGen);

  useEffect(() => {
    if (isEmpty(userInfo)) {
      return;
    }
    form.setFieldsValue({
      firstName: userInfo.first_name,
      lastName: userInfo.last_name,
      gender: userInfo.gender,
      phone_number: userInfo.phone_number,
      address: userInfo.address,
      email: userInfo.email,
      country: userInfo.country,
      province: userInfo.province,
      birthday: userInfo.birthday ? moment(userInfo.birthday) : null,
      company: userInfo.company,
      relation_id: userInfo.relation_id,
    });
    onGetListCity({city_name: userInfo.country});
    onGetListRelation();
  }, [userInfo]);
  return (
    <Form layout='vertical' form={form} >
      <Row gutter={10}>
        <Col span={12}>
          <Form.Item
            name="firstName"
            label={intl.formatMessage({ id: 'order.beneficiaryInfo.firstName' })}
            className="form-item-custom"
            rules={[{required: true, message: intl.formatMessage({ id: 'order.beneficiaryInfo.messageObligatory' })}]}
          >
            <Input disabled/>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="lastName"
            label={intl.formatMessage({ id: 'order.beneficiaryInfo.lastName' })}
            className="form-item-custom"
            rules={[{required: true, message: intl.formatMessage({ id: 'order.beneficiaryInfo.messageObligatory' })}]}
          >
            <Input disabled/>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="gender"
            label={intl.formatMessage({ id: 'order.beneficiaryInfo.gender' })}
            className="form-item-custom"
            rules={[{required: true, message: intl.formatMessage({ id: 'order.beneficiaryInfo.messageObligatory' })}]}
          >
            <Select disabled placeholder={intl.formatMessage({ id: 'order.beneficiaryInfo.chooseGender' })}>
              <Select.Option value="male">{intl.formatMessage({ id: 'order.beneficiaryInfo.male' })}</Select.Option>
              <Select.Option value="female">{intl.formatMessage({ id: 'order.beneficiaryInfo.female' })}</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="relation_id"
            label={intl.formatMessage({ id: 'order.beneficiaryInfo.relation' })}
            className="form-item-custom"
            rules={[{required: true, message: intl.formatMessage({ id: 'order.beneficiaryInfo.messageObligatory' })}]}
          >
            <Select
              showSearch
              optionFilterProp="children"
              placeholder={intl.formatMessage({ id: 'order.beneficiaryInfo.chooseRelation' })}
              disabled
            >

              {listRelation.map((item) => (
                <Select.Option key={item.id} value={item.id}>{item.value}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="birthday"
            label={intl.formatMessage({ id: 'order.beneficiaryInfo.birthday' })}
            className="form-item-custom"
            rules={[{required: true, message: intl.formatMessage({ id: 'order.beneficiaryInfo.messageObligatory' })}]}
          >
            <DatePicker disabled className='w-100pc' format="DD/MM/YYYY" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="phone_number"
            label={intl.formatMessage({ id: 'order.beneficiaryInfo.phone' })}
            className="form-item-custom"
            rules={[
              {required: true, message: intl.formatMessage({ id: 'order.beneficiaryInfo.messageObligatory' })},
              {
                pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
                message: intl.formatMessage({ id: 'order.beneficiaryInfo.phoneMessage' }),
              },
            ]}
          >
            <Input disabled/>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="email"
            label='Email'
            className="form-item-custom"
            rules={[
              {required: true, message: intl.formatMessage({ id: 'order.beneficiaryInfo.messageObligatory' })},
              {
                type: 'email',
                message: intl.formatMessage({ id: 'order.beneficiaryInfo.emailMessage' }),
              },
            ]}
          >
            <Input type="email" disabled/>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="country"
            label={intl.formatMessage({ id: 'order.beneficiaryInfo.country' })}
            className="form-item-custom"
            rules={[{required: true, message: intl.formatMessage({ id: 'order.beneficiaryInfo.messageObligatory' })}]}
          >
            <Select
              showSearch
              optionFilterProp="children"
              placeholder={intl.formatMessage({ id: 'order.beneficiaryInfo.chooseCountry' })}
              disabled
            >
              {(listCountry || []).map((item) => (
                <Select.Option key={item.name} value={item.name}>{item.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="province"
            label={intl.formatMessage({ id: 'order.beneficiaryInfo.province' })}
            className="form-item-custom"
            rules={[{required: true, message: intl.formatMessage({ id: 'order.beneficiaryInfo.messageObligatory' })}]}
            disabled
          >
            <Select
              showSearch
              optionFilterProp="children"
              placeholder={intl.formatMessage({ id: 'order.beneficiaryInfo.chooseProvince' })}
              disabled
            >
              {(listCity || []).map((item) => (
                <Select.Option key={item.name} value={item.name}>{item.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="address"
            label={intl.formatMessage({ id: 'order.beneficiaryInfo.address' })}
            className="form-item-custom"
            rules={[{required: true, message: intl.formatMessage({ id: 'order.beneficiaryInfo.messageObligatory' })}]}
          >
            <Input disabled/>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="company"
            label={intl.formatMessage({ id: 'order.beneficiaryInfo.company' })}
            className="form-item-custom"
            rules={[{required: true, message: intl.formatMessage({ id: 'order.beneficiaryInfo.messageObligatory' })}]}
          >
            <Input disabled/>
          </Form.Item>
        </Col>

      </Row>
    </Form>
  );
};

export default injectIntl(BeneficiaryInfo);
