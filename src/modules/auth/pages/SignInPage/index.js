import React, { useState } from "react";
import { Card, Form, Input, Button, Modal, message } from "antd";
import { useDispatch } from "react-redux";
import { get } from "lodash";
import { ROUTE, VERSION, HOTLINE, KNOWLEDGEBASELINK, SUPPORTLINK } from "commons/constants";
import * as actions from "modules/auth/redux/actions";
import { Link } from "react-router-dom";
import "./styles.scss";
import { FormattedMessage } from "react-intl";

const SignInPage = ({ history, location }) => {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(
      actions.postLogin(values, (data) => {
        if (get(location, "location.state.from")) {
          history.push(location.state.from.pathname);
          return;
        }
        if (get(data, "needToChangePlan")) {
          history.push(ROUTE.MEMBERSHIP_PLAN);
        } else {
          history.push(ROUTE.HOME);
        }
      })
    );
  };

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

  return (
    <div className="sign-in-container">
      <div className="login-container">
        <Card title={<FormattedMessage id="signIn.box.title" />} className="card-login-custom">
          <Form name="normal_login" className="login-form" onFinish={onFinish}>
            <label className="input-field-label"><FormattedMessage id="signIn.box.input.field.label.email" /><span> <FormattedMessage id="signIn.box.required.mark" /></span></label>
            <Form.Item
              name="email"
              rules={[{ required: true, message: <FormattedMessage id="signIn.box.empty.message.email" /> }]}
            >
              <Input />
            </Form.Item>
            <label className="input-field-label"><FormattedMessage id="signIn.box.input.field.label.password" /><span> <FormattedMessage id="signIn.box.required.mark" /></span></label>
            <Form.Item
              name="password"
              rules={[{ required: true, message: <FormattedMessage id="signIn.box.empty.message.password" /> }]}
            >
              <Input type="password" />
            </Form.Item>

            <Form.Item className="action">
              <Button
                size="middle"
                type="primary"
                htmlType="submit"
                className="primary-button"
              >
                <FormattedMessage id="signIn.box.signInButton.label" />
              </Button>
            </Form.Item>

            <Form.Item className="action">
              <Link className="forgot-button" to={ROUTE.FORGOT_PASSWORD}><FormattedMessage id="signIn.box.forgot.password.label" /></Link>
              <Link className="sign-up-link" to={ROUTE.SIGNUP}><FormattedMessage id="signIn.box.signup.label" /></Link>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
