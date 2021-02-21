import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { ROUTE, USER_INFO_KEY } from "commons/constants/index";
import { MainSideBar, HeaderMain } from "../components";
import * as Cookies from "js-cookie";
import "./private.scss";

const PrivateLayout = (props) => {
  const [openKeys, setOpenKeys] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);

  const [modeMobile, setModeMobile] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    onGetDefaultOpenKey();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);

  const handleResize = () => {
    const windowSize = window.innerWidth;
    if (windowSize < 1000) {
      setModeMobile(true);
    } else {
      setModeMobile(false);
    }
  };

  const onGetDefaultOpenKey = () => {
    const { pathname } = window.location;
    let keys = [];
    switch (pathname) {
      case ROUTE.ORDER:
        keys = ["_myTransaction"];
        break;
      case ROUTE.WALLET_TRANSACTION:
        keys = ["_myTransaction"];
        break;
      case ROUTE.COMMISSIONS:
        keys = ["_myTransaction"];
        break;
      default:
        break;
    }
    setOpenKeys(keys);
  };

  const toggleSideBar = () => {
    setVisible(!visible);
    setShowDrawer(!showDrawer);
    if (!visible) {
      setOpenKeys([]);
      return;
    }
    onGetDefaultOpenKey();
  };

  return (
    <Layout className="private-layout-container">
      <Layout>
        <HeaderMain
          modeMobile={modeMobile}
          toggleSlider={toggleSideBar}
          visible={visible}
        />
        <div className="content-layout">{props.children}</div>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
