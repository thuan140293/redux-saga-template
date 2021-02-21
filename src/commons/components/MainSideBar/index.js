import React from "react";
import cn from "classnames";
import { Layout, Menu, Avatar, Drawer } from "antd";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  DownOutlined,
  UpOutlined,
  DashboardOutlined,
  HeartOutlined,
  CreditCardOutlined,
  BranchesOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  WalletOutlined,
  CrownOutlined,
  SubnodeOutlined,
  UnorderedListOutlined
} from "@ant-design/icons";
import { ROUTE } from "commons/constants";
import { useSelector } from "react-redux";
import { get } from "lodash";
import "./styles.scss";
import { VERSION, HOTLINE, REPORTBUG, SUPPORTLINK } from "commons/constants";
import { FormattedMessage } from "react-intl";

const { SubMenu } = Menu;
const { Sider } = Layout;
const rootSubMenuKeys = ["_myTransaction"];

const MainSideBar = ({
  visible,
  openKeys,
  current,
  setOpenKeys,
  setCurrentTabSidebar,
  onLogout,
  modeMobile,
  showDrawer,
  setShowDrawer,
}) => {
  const { userInfo } = useSelector((state) => state.auth);
  const handleClickMenu = (e) => {
    setCurrentTabSidebar(e.key);
  };

  const handleOpenChangeMenu = (openKeysList) => {
    const latestOpenKey = openKeysList.find(
      (key) => openKeys.indexOf(key) === -1
    );

    if (rootSubMenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(openKeysList);
      return;
    }

    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  const renderIconRightMenu = (keyMenu, keyCurrent) => (
    <span className="icon-right-sub-menu">
      {[keyMenu].includes(keyCurrent[0]) ? <UpOutlined /> : <DownOutlined />}
    </span>
  );

  const renderMenu = (showContent) => {
    return (
      <>
        <div className="logo-area">
          <img src={require("assets/images/logo/logo.png")} alt="logo" />
        </div>

        <div className="wrapper-profile">
          <div className="avatar mr-15">
            {get(userInfo, "imageUrl") && (
              <Avatar src={userInfo.imageUrl} size="large" />
            )}
            {!get(userInfo, "imageUrl") && (
              <Avatar size="large" icon={<UserOutlined />} />
            )}
          </div>
          {!showContent && (
            <div className="info">
              <div>
              {get(userInfo, "last_name")} {get(userInfo, "first_name")}
              </div>
              <div className="logout" onClick={onLogout}>
              <FormattedMessage id="mainSideBar.logout"/>
              </div>
            </div>
          )}
        </div>
        <Menu
          className="sidebar-menu-custom"
          mode="inline"
          onClick={handleClickMenu}
          onOpenChange={handleOpenChangeMenu}
          openKeys={openKeys}
          selectedKeys={[current]}
          collapsed
        >
          <Menu.Item
            className={cn("menu-item-custom", showContent && "menu-item-hide")}
            key={ROUTE.HOME}
          >
            <div className="menu-sub_title">
              <Link className="link-sidebar" to={ROUTE.HOME}>
                {!showContent && (
                  <span>
                    <DashboardOutlined /> <FormattedMessage id="mainSideBar.dashboardOutlined"/>
                  </span>
                )}
                {showContent && <DashboardOutlined />}
              </Link>
            </div>
          </Menu.Item>
          <Menu.Item
            className={cn("menu-item-custom", showContent && "menu-item-hide")}
            key={ROUTE.SETTING}
          >
            <Link className="link-sidebar" to={ROUTE.SETTING}>
              {!showContent && (
                <span>
                  <UserOutlined /> <FormattedMessage id="mainSideBar.userOutlined"/>
                </span>
              )}
              {showContent && <UserOutlined />}
            </Link>
          </Menu.Item>
          <Menu.Item
            className={cn("menu-item-custom", showContent && "menu-item-hide")}
            key={ROUTE.MEDICAL_PROFILE}
          >
            <div className="menu-sub_title">
              <Link className="link-sidebar" to={ROUTE.MEDICAL_PROFILE}>
                {!showContent && (
                  <span>
                    <HeartOutlined /> <FormattedMessage id="mainSideBar.heartOutlined"/>
                  </span>
                )}
                {showContent && <HeartOutlined />}
              </Link>
            </div>
          </Menu.Item>

          <Menu.Item
            className={cn("menu-item-custom", showContent && "menu-item-hide")}
            key={ROUTE.APPOINTMENT}
          >
            <div className="menu-sub_title">
              <Link className="link-sidebar" to={ROUTE.APPOINTMENT}>
                {!showContent && (
                  <span>
                    <UnorderedListOutlined /> <FormattedMessage id="mainSideBar.unorderedListOutlined"/>
                  </span>
                )}
                {showContent && <UnorderedListOutlined />}
              </Link>
            </div>
          </Menu.Item>

          <Menu.Item
            className={cn("menu-item-custom", showContent && "menu-item-hide")}
            key={ROUTE.MEMBERSHIP_PLAN}
          >
            <div className="menu-sub_title">
              <Link className="link-sidebar" to={ROUTE.MEMBERSHIP_PLAN}>
                {!showContent && (
                  <span>
                    <CreditCardOutlined /> <FormattedMessage id="mainSideBar.creditCardOutlined"/>
                  </span>
                )}
                {showContent && <CreditCardOutlined />}
              </Link>
            </div>
          </Menu.Item>
          <Menu.Item
            className={cn("menu-item-custom", showContent && "menu-item-hide")}
            key={ROUTE.TEST_GEN}
          >
            <div className="menu-sub_title">
              <Link className="link-sidebar" to={ROUTE.TEST_GEN}>
                {!showContent && (
                  <span>
                    <SubnodeOutlined /> <FormattedMessage id="mainSideBar.subnodeOutlined"/>
                  </span>
                )}
                {showContent && <SubnodeOutlined />}
              </Link>
            </div>
          </Menu.Item>

          <SubMenu
            className="menu-sub-custom"
            key="_myTransaction"
            title={
              <div className="menu-sub_title">
                {!showContent && (
                  <>
                    <span>
                      <DollarOutlined /> <FormattedMessage id="mainSideBar.dollarOutlined"/>
                    </span>
                    {renderIconRightMenu("_myTransaction", openKeys)}
                  </>
                )}
                {showContent && <DollarOutlined />}
              </div>
            }
          >
            <Menu.Item className="menu-item" key={ROUTE.ORDER}>
              <Link className="link-sidebar" to={ROUTE.ORDER}>
                <ShoppingCartOutlined /> <FormattedMessage id="mainSideBar.shoppingCartOutlined"/>
              </Link>
            </Menu.Item>
            <Menu.Item className="menu-item" key={ROUTE.WALLET_TRANSACTION}>
              <Link className="link-sidebar" to={ROUTE.WALLET_TRANSACTION}>
                <WalletOutlined /> <FormattedMessage id="mainSideBar.walletOutlined"/>
              </Link>
            </Menu.Item>
            <Menu.Item className="menu-item" key={ROUTE.COMMISSIONS}>
              <Link className="link-sidebar" to={ROUTE.COMMISSIONS}>
                <CrownOutlined /> <FormattedMessage id="mainSideBar.crownOutlined"/>
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item
            className={cn("menu-item-custom", showContent && "menu-item-hide")}
            key={ROUTE.REFERRAL}
          >
            <Link className="link-sidebar" to={ROUTE.REFERRAL}>
              {!showContent && (
                <span>
                  <BranchesOutlined /> <FormattedMessage id="mainSideBar.branchesOutlined"/>
                </span>
              )}
              {showContent && <BranchesOutlined />}
            </Link>
          </Menu.Item>
        </Menu>
        <div className="sidebar-info">
          <p>
            <a href={SUPPORTLINK} target="blank">
            <FormattedMessage id="mainSideBar.support"/>
            </a>
          </p>
          <p>
            <a href={REPORTBUG} target="blank">
            <FormattedMessage id="mainSideBar.reportBugs"/>
            </a>
          </p>
          <p>
            <a href={`tel:${HOTLINE}`}><FormattedMessage id="mainSideBar.hotline"/> {HOTLINE}</a>
          </p>
        </div>
      </>
    );
  };
  return (
    <>
      {modeMobile && (
        <Drawer
          placement="right"
          visible={showDrawer}
          placement="left"
          className="mode-drawer-custom"
          onClose={() => setShowDrawer(false)}
        >
          {renderMenu(false)}
        </Drawer>
      )}

      {!modeMobile && (
        <Sider
          className="sidebar-custom"
          collapsed={visible}
          collapsible
          trigger={null}
          width={290}
        >
          {renderMenu(visible)}
        </Sider>
      )}
    </>
  );
};

export default MainSideBar;
