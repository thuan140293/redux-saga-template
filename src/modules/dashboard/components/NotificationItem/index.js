import React from 'react';

import {CodeSandboxOutlined} from '@ant-design/icons';
import './style.scss';
import { FormattedMessage } from 'react-intl';

const NotificationItem = ({detail, index, readNotification}) => {
  const {title, isRead, created_at_time, created_at, id} = detail;
  return (
    <div className={`wrapper-notification  ${index % 2 !== 0 ? 'wrapper-color-white' : ''}`}
     onClick={() => isRead !== 1 ? readNotification({id}) : null}>
      <div>
        <CodeSandboxOutlined className="content-left-icon" />
      </div>
      <div className="content-right">
        <div className={`item-wrapper ${isRead === 1 ? 'isRead' : ''}`}>
          <div>
            <p>{title}</p>
          </div>
          <div>
            <span>{created_at}</span>
          </div>
        </div>
        <div className={`item-wrapper ${isRead === 1 ? 'isRead' : ''}`}>
          <div>
            <p>{isRead === 1 ? <FormattedMessage id="dashboard.notificationItem.watched"/> : <FormattedMessage id="dashboard.notificationItem.notSeen"/>}</p>
          </div>
          <div>
            <span>{created_at_time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
