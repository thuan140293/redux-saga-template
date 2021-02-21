import React, { useEffect } from 'react';
import { Row, Col, Form, Input, Select, DatePicker, Button } from 'antd';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import * as moment from 'moment';
import { injectIntl } from 'react-intl';
const BeneficiaryInfo = ({
  userInfo,
  onGetListCity,
  onShowModalAddToCart,
  packageData,
  intl
}) => {
  const [form] = Form.useForm();
  const { listRelation, listCountry, listCity } = useSelector(state => state.testGen);

  useEffect(() => {
    if (isEmpty(userInfo)) {
      return;
    }
    form.setFieldsValue({
      firstName: userInfo.first_name,
      lastName: userInfo.last_name,
      gender: userInfo.gender,
      phone: userInfo.phone_number,
      address: userInfo.address,
      email: userInfo.email,
      country: userInfo.country,
      province: userInfo.province,
    });
    onGetListCity({ city_name: userInfo.country });
  }, [userInfo])

  const onSave = values => {
    let priceApply = packageData.price;
    if (packageData.type === "package") {
      if (
        packageData.price_sale &&
        packageData.price > packageData.price_sale
      ) {
        priceApply = packageData.price_sale;
      }
    }
    const payload = {
      ...values,
      name: packageData.type === "combo" ? packageData.combo_name: packageData.title,
      product_id: packageData.id,
      price: priceApply,
      quantity: 1,
      total: priceApply,
      type: packageData.type,
      birthday: moment(values.birthday).format("YYYY-MM-DD"),
    };
  }

  return (
    <Form layout='vertical' form={form} onFinish={onSave}>
      <Row gutter={10}>
        <Col span={12}>
          <Form.Item
            name="firstName"
            label={intl.formatMessage({ id: 'testGen.beneficiaryInfo.firstName' })}
            className="form-item-custom"
            rules={[{ required: true, message: intl.formatMessage({ id: 'testGen.beneficiaryInfo.messageObligatory' }) }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="lastName"
            label={intl.formatMessage({ id: 'testGen.beneficiaryInfo.lastName' })}
            className="form-item-custom"
            rules={[{ required: true, message: intl.formatMessage({ id: 'testGen.beneficiaryInfo.messageObligatory' }) }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="gender"
            label={intl.formatMessage({ id: 'testGen.beneficiaryInfo.gender' })}
            className="form-item-custom"
            rules={[{ required: true, message: intl.formatMessage({ id: 'testGen.beneficiaryInfo.messageObligatory' }) }]}
          >
            <Select placeholder="Chọn giới tính">
              <Select.Option value="male">{intl.formatMessage({ id: 'testGen.beneficiaryInfo.male' })}</Select.Option>
              <Select.Option value="female">{intl.formatMessage({ id: 'testGen.beneficiaryInfo.female' })}</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="relation_id"
            label={intl.formatMessage({ id: 'testGen.beneficiaryInfo.relation' })}
            className="form-item-custom"
            rules={[{ required: true, message: intl.formatMessage({ id: 'testGen.beneficiaryInfo.messageObligatory' }) }]}
          >
            <Select
              showSearch
              optionFilterProp="children"
              placeholder={intl.formatMessage({ id: 'testGen.beneficiaryInfo.chooseRelation' })}
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
            label={intl.formatMessage({ id: 'testGen.beneficiaryInfo.birthday' })}
            className="form-item-custom"
            rules={[{ required: true, message: intl.formatMessage({ id: 'testGen.beneficiaryInfo.messageObligatory' }) }]}
          >
            <DatePicker className='w-100pc' format="DD/MM/YYYY" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="phone"
            label={intl.formatMessage({ id: 'testGen.beneficiaryInfo.phone' })}
            className="form-item-custom"
            rules={[
              { required: true, message: intl.formatMessage({ id: 'testGen.beneficiaryInfo.messageObligatory' }) },
              {
                pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
                message: intl.formatMessage({ id: 'testGen.beneficiaryInfo.phoneMessage' })
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
              { required: true, message: intl.formatMessage({ id: 'testGen.beneficiaryInfo.messageObligatory' }) },
              {
                type: "email",
                message: intl.formatMessage({ id: 'testGen.beneficiaryInfo.emailMessage' })
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="country"
            label={intl.formatMessage({ id: 'testGen.beneficiaryInfo.country' })}
            className="form-item-custom"
            rules={[{ required: true, message: intl.formatMessage({ id: 'testGen.beneficiaryInfo.messageObligatory' }) }]}
          >
            <Select
              showSearch
              optionFilterProp="children"
              placeholder={intl.formatMessage({ id: 'testGen.beneficiaryInfo.chooseCountry' })}
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
            label={intl.formatMessage({ id: 'testGen.beneficiaryInfo.province' })}
            className="form-item-custom"
            rules={[{ required: true, message: intl.formatMessage({ id: 'testGen.beneficiaryInfo.messageObligatory' }) }]}
          >
            <Select
              showSearch
              optionFilterProp="children"
              placeholder={intl.formatMessage({ id: 'testGen.beneficiaryInfo.chooseProvince' })}
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
            label={intl.formatMessage({ id: 'testGen.beneficiaryInfo.address' })}
            className="form-item-custom"
            rules={[{ required: true, message: intl.formatMessage({ id: 'testGen.beneficiaryInfo.messageObligatory' }) }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="company"
            label={intl.formatMessage({ id: 'testGen.beneficiaryInfo.company' })}
            className="form-item-custom"
            rules={[{ required: true, message: intl.formatMessage({ id: 'testGen.beneficiaryInfo.messageObligatory' }) }]}
          >
            <Input />
          </Form.Item>
        </Col>

      </Row>

      <div className='mt-10 t-right'>
        <Button onClick={onShowModalAddToCart} className='mr-10'>{intl.formatMessage({ id: 'testGen.beneficiaryInfo.cancel' })}</Button>
        <Button htmlType='submit' type='primary'>{intl.formatMessage({ id: 'testGen.beneficiaryInfo.save' })}</Button>
      </div>
    </Form>
  )
};

export default injectIntl(BeneficiaryInfo);
