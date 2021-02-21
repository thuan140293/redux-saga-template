import React, { } from 'react';
import {useDispatch} from 'react-redux';
import {Form, Card, Input, Button, message} from 'antd';
import '../SignInPage/styles.scss';
import * as actions from 'modules/auth/redux/actions';
import {ROUTE} from 'commons/constants';
import {Link} from 'react-router-dom';
import { FormattedMessage } from "react-intl";

function RequestNewPassword({history, location}) {
  const url = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const TOKEN_KEY = "token"
  const callbackSuccess = (mess) => {
    message.success(mess, 1);
  };
  const callbackFailed = (mess) => {
    message.error(mess, 1);
  };

  const onFinishRequestNewPassword = (values) => {
    values.token = url.get(TOKEN_KEY);
    dispatch(
      actions.postResetPassword(values, () => {
        history.push(ROUTE.HOME);
        return;
      }, callbackSuccess, callbackFailed)
    );
  };

  return (
    <div className="sign-in-container">
      <div className="login-container">
        <Card title={<FormattedMessage id="forgot.password.box.title" />} className="card-login-custom">
          <Form
            name="normal_login"
            form={form}
            className="login-form"
            onFinish={onFinishRequestNewPassword}
          >
            <label className="input-field-label"><FormattedMessage id="forgot.password.request.new.password.label" /><span> <FormattedMessage id="signIn.box.required.mark" /></span></label>
            <Form.Item
              name="new_password"
              rules={[
                {required: true, message: <FormattedMessage id="forgot.password.request.new.password.empty.message"/>},
              ]}
              hasFeedback
            >
              <Input type="password"/>
            </Form.Item>

            <Form.Item className="action">
              <Button
                size="middle"
                type="primary"
                htmlType="submit"
                className="primary-button"
              >
                <FormattedMessage id="forgot.password.button.label" />
              </Button>
            </Form.Item>

            <Form.Item className="action">
              <Link className="forgot-button" to={ROUTE.SIGNUP}><FormattedMessage id="signIn.box.signup.label" /></Link>
              <Link className="sign-up-link" to={ROUTE.LOGIN}><FormattedMessage id="signUp.box.signin.label" /></Link>
            </Form.Item>

          </Form>
        </Card>
      </div>
    </div>
  );
}

export default RequestNewPassword;
