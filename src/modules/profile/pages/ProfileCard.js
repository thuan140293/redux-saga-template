import React from "react";
import { Button, Card, Col, Row, Tabs } from "antd";
import "./index.scss";
import BankManager from "./BankManager";
import { FormattedMessage, injectIntl } from "react-intl";

const { TabPane } = Tabs;

export default injectIntl(function ProfileCard({
  firstName,
  lastName,
  gender,
  phone,
  address,
  pin,
  handleOpenProfileDialog,
  isOpenBankDialog,
  dispatch,
  banks,
  bankForm,
  intl
}) {
  return (
    <div className="report-content">
      <Card
        title={<FormattedMessage id="profile.ProfileAccount.information.label"/>}
        className="br-10 report-card"
      >
            <div className="gx-mb-2 zzz">
              <Row className="m-all-20">
                <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                  <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
                    <div className="gx-media-body">
                      <h6 className="profile-title"><FormattedMessage id="profile.ProfileCard.fullName"/></h6>
                      <span className="profile-content card-link-content">
                        {lastName} {firstName}
                      </span>
                    </div>
                  </div>
                </Col>
                <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                  <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
                    <div className="gx-media-body">
                      <h6 className="profile-title"><FormattedMessage id="profile.ProfileCard.sex"/></h6>
                      <span className="profile-content card-link-content">
                        {gender}
                      </span>
                    </div>
                  </div>
                </Col>
                <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                  <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
                    <div className="gx-media-body">
                      <h6 className="profile-title"><FormattedMessage id="profile.ProfileCard.phoneNumber"/></h6>
                      <span className="profile-content card-link-content">
                        {phone}
                      </span>
                    </div>
                  </div>
                </Col>
                <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                  <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
                    <div className="gx-media-body">
                      <h6 className="profile-title"><FormattedMessage id="profile.ProfileCard.idPassport"/></h6>
                      <span className="profile-content card-link-content">
                        {pin}
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="m-all-20">
                <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                  <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
                    <div className="gx-media-body">
                      <h6 className="profile-title"><FormattedMessage id="profile.ProfileCard.location"/></h6>
                      <span className="profile-content card-link-content">
                        {address}
                      </span>
                    </div>
                  </div>
                </Col>
                <Col className="button-container" xl={12} lg={12} md={12} sm={12} xs={24}>
                  <Button type="primary" onClick={handleOpenProfileDialog}>
                   <FormattedMessage id="profile.ProfileCard.updateProfile"/>
                  </Button>
                </Col>
              </Row>
            </div>
      </Card>
    </div>
  );
}
)