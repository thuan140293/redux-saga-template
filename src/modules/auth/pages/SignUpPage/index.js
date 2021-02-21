import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Card, Input, Button, message } from "antd";
import "../SignInPage/styles.scss";
import * as actions from "modules/auth/redux/actions";
import { ROUTE, VERSION, HOTLINE } from "commons/constants";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const SignUpPage = ({ history, location }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { setFieldsValue } = form;
  const url = new URLSearchParams(location.search);
  useEffect(() => {
    setFieldsValue({
      sponsorKey: url.get("sponsorkey") || "",
    });
  }, [url, setFieldsValue]);
  const isDisable = url.get("sponsorkey") ? true : false;
  const callbackSuccess = (mess) => {
    message.success(mess, 1);
  };
  const callbackFailed = (mess) => {
    message.error(mess, 1);
  };

  const onFinish = (values) => {
    const payload = {
      ...values,
      username: values.email,
    };
    dispatch(
      actions.postSignup(
        payload,
        () => {
          history.push(ROUTE.LOGIN);
        },
        callbackSuccess,
        callbackFailed
      )
    );
  };

  const onModalForgotPassword = () => {
  };

  return (
    <div className="sign-in-container">
      <div className="login-container">
        <Card title={<FormattedMessage id="signUp.box.title" />} className="card-login-custom">
          <Form
            name="normal_login"
            form={form}
            className="login-form"
            onFinish={onFinish}
          >
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
              <div style={{ width: '45%' }}>
              <label className="input-field-label"><FormattedMessage id="signUp.box.input.field.label.firstname" /><span> <FormattedMessage id="signIn.box.required.mark" /></span></label>
                <Form.Item
                  name="last_name"
                  rules={[{ required: true, message: <FormattedMessage id="signUp.box.input.field.empty.message" /> }]}
                >
                  <Input/>
                </Form.Item>
              </div>
              <div style={{ width: '45%' }}>
              <label className="input-field-label"><FormattedMessage id="signUp.box.input.field.label.lastname" /><span> <FormattedMessage id="signIn.box.required.mark" /></span></label>
                <Form.Item
                  name="first_name"
                  rules={[{ required: true, message: <FormattedMessage id="signUp.box.input.field.empty.message" /> }]}
                >
                  <Input/>
                </Form.Item>
              </div>
            </div>

            <label className="input-field-label"><FormattedMessage id="signUp.box.input.field.label.email" /><span> <FormattedMessage id="signIn.box.required.mark" /></span></label>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: <FormattedMessage id="signUp.box.empty.message.email" />,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <label className="input-field-label"><FormattedMessage id="signUp.box.input.field.label.password" /><span> <FormattedMessage id="signIn.box.required.mark" /></span></label>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: <FormattedMessage id="signUp.box.empty.message.password"/> },
              ]}
            >
              <Input type="password"/>
            </Form.Item>

            <label className="input-field-label"><FormattedMessage id="signUp.box.input.field.label.sponsor.code" /><span> <FormattedMessage id="signIn.box.required.mark" /></span></label>
            <Form.Item
              name="sponsorKey"
              rules={[
                {
                  required: true,
                  message:
                  <FormattedMessage id="signUp.box.empty.message.sponsor.code" />,
                },
              ]}
            >
              <Input disabled={isDisable} />
            </Form.Item>
            <Form.Item className="action">
              <Button
                size="middle"
                type="primary"
                htmlType="submit"
                className="primary-button"
              >
                <FormattedMessage id="signUp.box.signUpButton.label" />
              </Button>
            </Form.Item>
          </Form>
          
          <Form.Item className="action">
              <Link className="forgot-button" to={ROUTE.FORGOT_PASSWORD}><FormattedMessage id="signIn.box.forgot.password.label" /></Link>
              <Link className="sign-up-link" to={ROUTE.LOGIN}><FormattedMessage id="signUp.box.signin.label" /></Link>
            </Form.Item>

        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
