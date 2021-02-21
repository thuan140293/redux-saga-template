import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Card, Input, Button, message} from 'antd';
import '../SignInPage/styles.scss';
import * as actions from 'modules/auth/redux/actions';
import {ROUTE, VERSION, HOTLINE} from 'commons/constants';
import {Link} from 'react-router-dom';
import { FormattedMessage } from "react-intl";
import {getParamFromURL} from 'helpers/CommonHelper';

function ResetPassword({history, location}) {
  const url = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const callbackSuccess = (mess) => {
    message.success(mess, 1);
  };
  const callbackFailed = (mess) => {
    message.error(mess, 1);
  };

  const onFinishForgotPassword = (values) => {
    dispatch(
      actions.postForgotPassword(values, callbackSuccess, callbackFailed)
    );
  };

  useEffect(() => {
    const token = getParamFromURL("token");
    if(token) {
      history.push('/reset-password?token='+token);
    }
  }, [history]);

  return (
    <div className="sign-in-container">
      <div className="login-container">
        <Card title={<FormattedMessage id="forgot.password.box.title" />} className="card-login-custom">
          <Form
            name="normal_login"
            form={form}
            className="login-form"
            onFinish={onFinishForgotPassword}
          >
            <label className="input-field-label"><FormattedMessage id="forgot.password.input.field.label.email" /><span> <FormattedMessage id="signIn.box.required.mark" /></span></label>
            <Form.Item
              name="email"
              rules={[
                {required: true, message: <FormattedMessage id="forgot.password.empty.message.email"/>},
              ]}
              hasFeedback
            >
              <Input/>
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

export default ResetPassword;
