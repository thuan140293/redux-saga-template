import React, { useState } from "react";
import { Layout, Menu, Avatar, Dropdown, Drawer, Select } from "antd";
import { ROUTE, USER_INFO_KEY, MENU_HEADER } from "commons/constants";
import "./styles.scss";
import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import { useSelector } from "react-redux";
import {
  UserOutlined,
  DashboardOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { get } from "lodash";
import * as Cookies from "js-cookie";
import { MenuOutlined } from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";

const ICON_MENU = {
  dashboard: <DashboardOutlined />,
  report: <AppstoreOutlined className="color-icon-default" />,
  product: <AppstoreOutlined />,
  customer: <UserOutlined />,
  setting: <SettingOutlined />,
};

const { Header } = Layout;

const handleLogout = () => {
  Cookies.remove("token");
  localStorage.removeItem(USER_INFO_KEY);
  window.location.href = window.location.origin + ROUTE.LOGIN;
};

const SubMenuAvatar = () => {
  return (
    <Menu>
      <Menu.Item onClick={handleLogout}>
        <FormattedMessage id="mainSideBar.logout" />
      </Menu.Item>
    </Menu>
  );
};

const HeaderMain = ({ intl }) => {
  const [current, setCurrent] = useState("");
  const [showDrawer, setShowDrawer] = useState(false);
  const handleChangeMenu = () => {
    setShowDrawer(false);
  };
  const [isShow, setShow] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <Header
        className="header-container desktop"
        onClick={() => {
          setShow(true);
        }}
      >
        <div className="logo-header">
          <Link to={ROUTE.HOME}>
            <img
              className="image-loading"
              src={require("assets/images/logo/logo_home_white_bg.jpg")}
              alt="logo"
            />
          </Link>

          <span className="col-right">
            <Menu
              onClick={handleChangeMenu}
              selectedKeys={[current]}
              mode="horizontal"
            >
              {(MENU_HEADER || []).map((item, key) =>
                item.submenu ? (
                  <SubMenu
                    key={key}
                    title={<FormattedMessage id={item.name} />}
                  >
                    {item.submenu.map((item1, key1) => (
                      <Menu.Item key={key1}>
                        <Link to={item1.url}>
                          <FormattedMessage id={item1.name} />
                        </Link>
                      </Menu.Item>
                    ))}
                  </SubMenu>
                ) : (
                  <Menu.Item key={key}>
                    {!item.submenu && (
                      <Link to={item.url}>
                        <FormattedMessage id={item.name} />
                      </Link>
                    )}
                  </Menu.Item>
                )
              )}
              <Dropdown overlay={SubMenuAvatar} trigger={["click"]}>
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  {get(userInfo, "imageUrl") && (
                    <Avatar src={userInfo.imageUrl} size="large" />
                  )}

                  {!get(userInfo, "imageUrl") && (
                    <Avatar size="large" icon={<UserOutlined />} />
                  )}
                </a>
              </Dropdown>
            </Menu>
          </span>
        </div>
      </Header>
      <Header className="header-container mobile">
        <div className="mobile-menu">
          <Link to={ROUTE.HOME}>
            <img
              className="image-loading"
              src={require("assets/images/logo/logo_new.png")}
              alt="logo"
              className="logo-menu-mobile"
            />
          </Link>
          <MenuOutlined
            onClick={() => {
              setShowDrawer(true);
            }}
            className="icon"
          />
        </div>
        <Drawer
          placement="left"
          visible={showDrawer}
          className="mode-drawer-custom"
          onClose={() => {
            setShowDrawer(false);
          }}
        >
          <Link to={ROUTE.HOME}>
            <img
              className="image-loading"
              src={require("assets/images/logo/logo_new.png")}
              alt="logo"
              className="logo-area-mobile"
            />
          </Link>
          <div className="avatar-mobile">
            <div className="avatar mr-15">
              {get(userInfo, "imageUrl") && (
                <Avatar src={userInfo.imageUrl} size="large" />
              )}
              {!get(userInfo, "imageUrl") && (
                <Avatar size="large" icon={<UserOutlined />} />
              )}
              <span className="ml-5 info">
                {get(userInfo, "last_name")} {get(userInfo, "first_name")}
              </span>
            </div>
            <div className="logout" onClick={handleLogout}>
              <FormattedMessage id="mainSideBar.logout" />
            </div>
          </div>

          <Menu
            onClick={handleChangeMenu}
            selectedKeys={[current]}
            mode="inline"
          >
            {(MENU_HEADER || []).map((item, key) =>
              item.submenu ? (
                <SubMenu
                  key={`mobile-${item.key}`}
                  title={<FormattedMessage id={item.name} />}
                  icon={ICON_MENU[item.icon]}
                >
                  {item.submenu.map((item1, key1) => (
                    <Menu.Item key={`mobile-sub-${key1}`}>
                      <Link to={item1.url}>
                        <FormattedMessage id={item1.name} />
                      </Link>
                    </Menu.Item>
                  ))}
                </SubMenu>
              ) : (
                <Menu.Item key={key}>
                  {ICON_MENU[item.icon]}
                  {!item.submenu && (
                    <Link to={item.url}>
                      <FormattedMessage id={item.name} />
                    </Link>
                  )}
                </Menu.Item>
              )
            )}
          </Menu>
        </Drawer>
      </Header>
    </>
  );
};

export default injectIntl(HeaderMain);
