import React, { useEffect } from "react";
import { Form, Row, Col, Select, Input, Button, DatePicker } from "antd";
import * as moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { getListCity } from "modules/test-gen/redux/actions";
import { getProfile, updateProfile } from "modules/profile/redux/actions";
import { isEmpty } from "lodash";
import { injectIntl } from "react-intl";

const disabledDate = (current) => {
  return current && current > moment().endOf("day");
};
const dateFormat = "DD-MM-YYYY";

const StepProfile = ({ onGoNextStep, intl }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { listCountry, listCity } = useSelector((state) => state.testGen);
  const { profileData } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  useEffect(() => {
    if (isEmpty(profileData)) {
      return;
    }
    form.setFieldsValue({
      first_name: profileData.first_name,
      last_name: profileData.last_name,
      phone_number: profileData.phone_number,
      gender: profileData.gender,
      passport: profileData.passport,
      address: profileData.address,
      country: profileData.country,
      province: profileData.province,
      pin: profileData.pin,
      nation: profileData.nation,
      dob: profileData.dob ? moment(profileData.dob) : null,
    });

    if (profileData.country) {
      dispatch(
        getListCity({ city_name: profileData.country })
      );
    }

  }, [profileData]);

  const handleUpdateProfile = (values) => {
    dispatch(
      updateProfile(values, () => {
        onGoNextStep();
      })
    );
  };

  const onChangeCountry = (value) => {
    dispatch(getListCity({ city_name: value }));
  };

  return (
    <Form
      className="form-info mt-20"
      layout="vertical"
      form={form}
      onFinish={handleUpdateProfile}
    >
      <Row gutter={[16, 16]}>
        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          <Form.Item
            label={intl.formatMessage({ id: 'membershipPlan.stepProfile.lastName' })}
            name="last_name"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'membershipPlan.stepProfile.messageObligatory' }),
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          <Form.Item
            label={intl.formatMessage({ id: 'membershipPlan.stepProfile.firstName' })}
            name="first_name"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'membershipPlan.stepProfile.messageObligatory' }),
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          <Form.Item
            label={intl.formatMessage({ id: 'membershipPlan.stepProfile.gender' })}
            name="gender"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'membershipPlan.stepProfile.messageObligatory' }),
              },
            ]}
            initialValue="male"
          >
            <Select style={{ width: "100%" }}>
              <Select.Option value="male">{intl.formatMessage({ id: 'membershipPlan.stepProfile.male' })}</Select.Option>
              <Select.Option value="female">{intl.formatMessage({ id: 'membershipPlan.stepProfile.female' })}</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          <Form.Item
            label={intl.formatMessage({ id: 'membershipPlan.stepProfile.birthday' })}
            name="dob"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'membershipPlan.stepProfile.messageObligatory' }),
              },
            ]}
          >
            <DatePicker
              disabledDate={disabledDate}
              style={{ width: "100%" }}
              format={dateFormat}
            />
          </Form.Item>
        </Col>
        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          <Form.Item
            label={intl.formatMessage({ id: 'membershipPlan.stepProfile.passport' })}
            name="passport"
            // rules={[
            //   {
            //     pattern: /[0-9]{8,20}\b$/,
            //     message: "invalid",
            //   },
            // ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          <Form.Item
            label={intl.formatMessage({ id: 'membershipPlan.stepProfile.phone' })}
            name="phone_number"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'membershipPlan.stepProfile.messageObligatory' }),
              },
              {
                pattern: /^(0[1-9])+([0-9]{8,20})\b$/,
                message: "invalid",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          <Form.Item
            label={intl.formatMessage({ id: 'membershipPlan.stepProfile.pin' })}
            name="pin"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'membershipPlan.stepProfile.messageObligatory' }),
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </Col>

        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          <Form.Item
            label={intl.formatMessage({ id: 'membershipPlan.stepProfile.country' })}
            name="country"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'membershipPlan.stepProfile.messageObligatory' }),
              },
            ]}
          >
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder={intl.formatMessage({ id: 'membershipPlan.stepProfile.chooseCountry' })}
              optionFilterProp="children"
              onChange={onChangeCountry}
            >
              {(listCountry || []).map((item) => (
                <Select.Option key={item.name} value={item.name}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          <Form.Item
            label={intl.formatMessage({ id: 'membershipPlan.stepProfile.nation' })}
            name="nation"
            rules={[{ required: true, message: intl.formatMessage({ id: 'membershipPlan.stepProfile.messageObligatory' }) }]}
          >
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder={intl.formatMessage({ id: 'membershipPlan.stepProfile.chooseCountry' })}
              optionFilterProp="children"
            >
              {(listCountry || []).map((item) => (
                <Select.Option key={item.name} value={item.name}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          <Form.Item
            label={intl.formatMessage({ id: 'membershipPlan.stepProfile.province' })}
            name="province"
            rules={[{ required: true, message: intl.formatMessage({ id: 'membershipPlan.stepProfile.messageObligatory' }) }]}
          >
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder={intl.formatMessage({ id: 'membershipPlan.stepProfile.chooseProvince' })}
              optionFilterProp="children"
            >
              {(listCity || []).map((item) => (
                <Select.Option key={item.name} value={item.name}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          <Form.Item
            label={intl.formatMessage({ id: 'membershipPlan.stepProfile.address' })}
            name="address"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'membershipPlan.stepProfile.messageObligatory' }),
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xl={12} lg={12} md={12} sm={24} xs={24}></Col>
      </Row>

      <Form.Item className="action t-right">
        <Button key="submit" type="primary" htmlType="submit">
          {intl.formatMessage({ id: 'membershipPlan.stepProfile.save' })}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default injectIntl(StepProfile);
