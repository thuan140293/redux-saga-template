import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import "./style.scss";
import { Pagination } from "antd";
import NotificationItem from "../../components/NotificationItem";
import { get, pickBy } from "lodash";
import * as qs from "query-string";
import { FormattedMessage } from "react-intl";
const Notification = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState({
    limit: 5,
    page: 1,
  });
  const notificationList = useSelector(
    (state) => state.dashboard.notificationList
  );
  useEffect(() => {
    const queryString = qs.stringify(pickBy(search));
    dispatch(actions.getListNotificationDashboard(queryString));
  }, [dispatch, search]);

  const readNotification = (id) => {
    dispatch(actions.changeStatusRead(id));
  };

  return (
    <div>
      <h1><FormattedMessage id="dashboard.notification.title"/></h1>
      {(get(notificationList, "data") || []).map((item, index) => (
        <NotificationItem
          readNotification={readNotification}
          detail={item}
          index={index}
          key={item.id}
        />
      ))}
      <div className="notification-pagination">
        <Pagination
          current={search.page}
          pageSize={search.limit}
          total={notificationList.total}
          onChange={(page) =>
            setSearch({
              ...search,
              page,
            })
          }
        />
      </div>
    </div>
  );
};

export default Notification;
