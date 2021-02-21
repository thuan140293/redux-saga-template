import React from "react";
import { Card, Tabs } from 'antd';
import { Insurance, Blood, MedicalHistory, Language, Family, Allergies } from '../components'
import { FormattedMessage } from "react-intl";

const { TabPane } = Tabs;
const HealthProfilePage = () => {
  return (
    <Card>
      <Tabs defaultActiveKey="1">
        <TabPane tab={<FormattedMessage id="healthProfile.page.insurance"/>} key="1">
          <Insurance />
        </TabPane>
        <TabPane tab={<FormattedMessage id="healthProfile.page.blood"/>} key="2">
          <Blood />
        </TabPane>
        <TabPane tab={<FormattedMessage id="healthProfile.page.medicalHistory"/>} key="3">
          <MedicalHistory />
        </TabPane>
        <TabPane tab={<FormattedMessage id="healthProfile.page.language"/>} key="4">
          <Language />
        </TabPane>
        <TabPane tab={<FormattedMessage id="healthProfile.page.family"/>} key="5">
          <Family />
        </TabPane>
        <TabPane tab={<FormattedMessage id="healthProfile.page.allergies"/>} key="6">
          <Allergies />
        </TabPane>

      </Tabs>
    </Card>
  );
};

export default HealthProfilePage;
