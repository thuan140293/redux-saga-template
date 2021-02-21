import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "antd";
import {
  SwapOutlined,
  DownloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { slice } from "lodash";
import "./styles.scss";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const DownloadApp = () => {
  return (
    <Card className="mb-20 download-app">
      <Row className="">
        <Col md={16} sm={16} className="col-left">
          <p><FormattedMessage id="dashboard.downloadApp.title"/></p>
          <h4 class="gx-font-weight-semi-bold gx-text-white gx-mb-0">
          <FormattedMessage id="dashboard.downloadApp.subTitle"/>
          </h4>
        </Col>
        <Col md={8} sm={8} className="col-right">
          <img src={require("assets/images/chplay.png")}></img>
          {/* <img className='mt-10' src={require("assets/images/ios.png")}></img> */}
        </Col>
      </Row>
    </Card>
  );
};

export default DownloadApp;
