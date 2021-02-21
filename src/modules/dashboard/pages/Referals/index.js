import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  message,
  Modal,
  Input,
  Form,
  Tooltip,
  Card,
} from "antd";
import { CopyOutlined, SendOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { get } from "lodash";
import { inviteFriend } from "modules/dashboard/redux/actions";
import "./styles.scss";
import { FormattedMessage, injectIntl } from "react-intl";

const HealthProfile = ({intl}) => {
  const dispatch = useDispatch();
  const { dashboardInfo } = useSelector((state) => state.dashboard);
  const [showModalInvite, setShowModalInvite] = useState(false);

  const customerSponsorLink = `${
    process.env.REACT_APP_USER_URL
  }/signup?sponsorkey=${get(dashboardInfo, "customer.sponsorKey")}`;

  const copyReferralLink = (code) => {
    const link = `${process.env.REACT_APP_USER_URL}/signup?sponsorkey=${code}`;
    navigator.clipboard.writeText(link);
    message.success(
      <>
        {intl.formatMessage({ id: 'dashboard.referals.messageCopyLink' })} <a href={link}> {link} </a>!
      </>
    );
  };

  const onCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    message.success(intl.formatMessage({ id: 'dashboard.referals.messageCopyCode' }) + code + "!");
  };

  const onCloseModalInvite = () => {
    setShowModalInvite(false);
  };

  const onInviteFriend = (values) => {
    dispatch(
      inviteFriend(values, () => {
        onCloseModalInvite();
      })
    );
  };

  return (
    <Card className="wrapper-referals">
      <Row className="referals-container">
        <Col span={24} className="invite-box">
          <div className="title mb-15"><FormattedMessage id="dashboard.referals.title"/></div>
          <div className="content">
            <Tooltip title={<FormattedMessage id="dashboard.referals.copyOnlyReferral"/>}>
              <span
                className="icon-copy"
                onClick={() =>
                  onCopyCode(get(dashboardInfo, "customer.sponsorKey"))
                }
              >
                <span className="mr-5">
                  {get(dashboardInfo, "customer.sponsorKey")}
                </span>
                <CopyOutlined />
              </span>
            </Tooltip>
          </div>
          <div className="content">
            <Tooltip title={<FormattedMessage id="dashboard.referals.copyOnlyReferral"/>}>
              <span
                className="icon-copy"
                onClick={() =>
                  copyReferralLink(get(dashboardInfo, "customer.sponsorKey"))
                }
              >
                <span className="copy-link mr-5"><FormattedMessage id="dashboard.referals.copyFullLink"/></span>
                <CopyOutlined />
              </span>
            </Tooltip>
          </div>

          <div className="action mt-20">
            <Tooltip title={<FormattedMessage id="dashboard.referals.copyLink"/>}>
              <Button
                onClick={() => setShowModalInvite(true)}
                type="dashed"
                danger
                shape="round"
                icon={<SendOutlined />}
              >
                <FormattedMessage id="dashboard.referals.emailReferralCode"/>
              </Button>
            </Tooltip>
          </div>
        </Col>

        <Modal
          title={<FormattedMessage id="dashboard.referals.sendReferralLink"/>}
          visible={showModalInvite}
          onCancel={onCloseModalInvite}
          footer={null}
          width={450}
        >
          <p><FormattedMessage id="dashboard.referals.inviteYourFriend"/></p>
          <a href={customerSponsorLink}>{customerSponsorLink}</a>

          {showModalInvite && (
            <Form onFinish={onInviteFriend} layout="vertical" className="mt-10">
              <Form.Item
                label=""
                name="email"
                rules={[{ required: true, message: <FormattedMessage id="dashboard.referals.messCheckEmail"/> }]}
              >
                <Input size="large" placeholder={intl.formatMessage({ id: 'dashboard.referals.placeCheckEmail' })} />
              </Form.Item>
              <div className="mt-20 t-right">
                <Button
                  className="mr-10"
                  size="large"
                  onClick={onCloseModalInvite}
                >
                  <FormattedMessage id="dashboard.referals.cancel"/>
                </Button>
                <Button htmlType="submit" size="large" type="primary">
                <FormattedMessage id="dashboard.referals.save"/>
                </Button>
              </div>
            </Form>
          )}
        </Modal>
      </Row>
    </Card>
  );
};

export default injectIntl(HealthProfile);
