import React from 'react';
import MoneyCollectOutlined from '@ant-design/icons/lib/icons/MoneyCollectOutlined';
import FontSizeOutlined from '@ant-design/icons/lib/icons/FontSizeOutlined';
import ProfileOutlined from '@ant-design/icons/lib/icons/ProfileOutlined';
import SendOutlined from '@ant-design/icons/lib/icons/SendOutlined';
import {Button} from 'antd';
import { FormattedMessage } from 'react-intl';

export default function Subscription() {
  return (
    <>
      <div className="subscription-wrapper">
        <div className="subscription-header">
          <br></br>
          <div className="subscription-header-content"><FormattedMessage id="profile.subscription.title"/></div>
        </div>

        <div className="subscription-body">
          <div className="subscription-content">
            <div className="subscription-content-item"><MoneyCollectOutlined /> <FormattedMessage id="profile.subscription.moneyCollect"/></div>
            <div className="subscription-content-item"><FontSizeOutlined /> <FormattedMessage id="profile.subscription.fontSize"/></div>
            <div className="subscription-content-item"><ProfileOutlined /> <FormattedMessage id="profile.subscription.profile"/></div>
            <div className="subscription-content-item"><SendOutlined /> <FormattedMessage id="profile.subscription.send"/></div>
          </div>
          <Button href="/membership-plan" className="subscription-button">
            <FormattedMessage id="profile.subscription.button"/>
          </Button>
        </div>
      </div>
    </>
  );
}
