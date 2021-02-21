import React from 'react';
import {Button, Card, Form, Input, Modal} from 'antd';
import LaptopOutlined from '@ant-design/icons/lib/icons/LaptopOutlined';
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined';
import LockOutlined from '@ant-design/icons/lib/icons/LockOutlined';
import './index.scss';
import EditOutlined from '@ant-design/icons/lib/icons/EditOutlined';
import { FormattedMessage, injectIntl } from 'react-intl';

const AccountInfo = ({title, icon, content, editIcon, action}) =>{
  return (
    <>
      <div className="account-info-wrapper">
        <div className="account-info-icon">
          {icon}
        </div>
        <div className="account-info">
          <span className="account-info-title">{title}</span>
          <p className="account-info-content">
            <span onClick={action} className="card-link-content">
              {content}
              <span>{editIcon}</span>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default injectIntl(function ProfileAccount({
  email,
  username,
  handleUpdatePasswordDialog,
  isOpenUpdatePasswordDialog,
  handleUpdatePassword,
  passwordForm,
  handleOpenUpdatePasswordDialog,
  emailForm,
  handleUpdateEmailDialog,
  handleUpdateEmail,
  handleOpenUpdateEmailDialog,
  isOpenEmailDialog,
  intl
}) {
  return (
    <>
    <div className="report-content">
      <Card className="br-10 report-card" title={intl.formatMessage({ id: 'profile.ProfileAccount.title' })}>
        <AccountInfo
          title="Email"
          icon={<LaptopOutlined />}
          content={email}
          editIcon={<EditOutlined />}
          action={handleUpdateEmailDialog}
        />

        <AccountInfo
          title={intl.formatMessage({ id: 'profile.ProfileAccount.title' })}
          icon={<UserOutlined />}
          content={username}
        />

        <AccountInfo
          title={intl.formatMessage({ id: 'profile.ProfileAccount.password' })}
          icon={<LockOutlined />}
          content="*************"
          editIcon={<EditOutlined />}
          action={handleUpdatePasswordDialog}
        />
      </Card>

      <Modal
        visible={isOpenEmailDialog}
        width="400px"
        title={intl.formatMessage({ id: 'profile.ProfileAccount.updateEmail' })}
        onCancel={() => handleOpenUpdateEmailDialog(false)}
        footer={false}
        className="update-profile-modal"
      >
        <Form
          className="form-info"
          layout="vertical"
          onFinish={handleUpdateEmail}
          form={emailForm}
        >
          <label className="input-field-label"><FormattedMessage id="profile.ProfileAccount.email.label" /><span> <FormattedMessage id="profile.profilePage.required.mark" /></span></label>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please enter field!',
              },
            ]}
          >
            <Input type="email"/>
          </Form.Item>
        
          <Form.Item className="action">
            <Button
              key="back"
              className="m-r-20 profile-button button-left"
              onClick={() => handleUpdateEmailDialog(false)}
            >
                    <FormattedMessage id="profile.ProfileAccount.cancel"/>
            </Button>
            <Button
              key="submit"
              type="primary profile-button button-right"
              htmlType="submit"
            >
                    <FormattedMessage id="profile.ProfileAccount.save"/>
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        visible={isOpenUpdatePasswordDialog}
        width="400px"
        title={intl.formatMessage({ id: 'profile.ProfileAccount.updatePassword' })}
        onCancel={() => handleOpenUpdatePasswordDialog(false)}
        footer={false}
        className="update-profile-modal"
      >
        <Form
          className="form-info"
          layout="vertical"
          onFinish={handleUpdatePassword}
          form={passwordForm}
        >
          <label className="input-field-label"><FormattedMessage id="profile.ProfileAccount.currentPassword" /><span> <FormattedMessage id="profile.profilePage.required.mark" /></span></label>
          <Form.Item
            name="current_password"
            rules={[
              {
                required: true,
                message: 'Please enter field!',
              },
            ]}
          >
            <Input.Password type="password"/>
          </Form.Item>

          <label className="input-field-label"><FormattedMessage id="profile.ProfileAccount.newPassword" /><span> <FormattedMessage id="profile.profilePage.required.mark" /></span></label>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter field!',
              },
            ]}
          >
            <Input.Password type="password"/>
          </Form.Item>

          <label className="input-field-label"><FormattedMessage id="profile.ProfileAccount.confirmPassword" /><span> <FormattedMessage id="profile.profilePage.required.mark" /></span></label>
          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please enter field!',
              },
              ({getFieldValue}) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject('Password confirm was wrong!');
                },
              }),
            ]}
          >
            <Input.Password type="password"/>
          </Form.Item>

          <Form.Item className="action">
            <Button
              key="back"
              className="m-r-20 profile-button button-left"
              onClick={() => handleUpdatePasswordDialog(false)}
            >
                    <FormattedMessage id="profile.ProfileAccount.cancel"/>
            </Button>
            <Button
              key="submit"
              type="primary profile-button button-right"
              htmlType="submit"
            >
                    <FormattedMessage id="profile.ProfileAccount.save"/>
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      </div>
    </>
  );
}
)