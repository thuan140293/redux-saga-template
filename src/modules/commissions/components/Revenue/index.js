import React, { useState, useEffect } from "react";
import {
  Typography,
  Row,
  Col,
  Card,
  Statistic,
  Button,
  Modal,
  InputNumber,
  Input,
  Form,
} from "antd";
import { get, isEmpty } from "lodash";
import { debounced } from "helpers/CommonHelper";
import { exchangeCalRate } from "modules/dashboard/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
import { walletTransWithdraw } from "modules/commissions/redux/actions";
import { FormattedMessage } from "react-intl";
const { Text } = Typography;
const Revenue = ({ dashboardInfo, reGetDashboard }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [icbValue, setIcbValue] = useState("");
  const [usdValue, setUsdValue] = useState("");
  const { exchangeData } = useSelector((state) => state.dashboard);

  const customerCommission =
    get(dashboardInfo, "customer.commissions_earned") || 0;
  // const customerCommissionWasEarn = +get(dashboardInfo, 'customer.total_commissions') - (+get(dashboardInfo, 'customer.commissions_earned'));

  useEffect(() => {
    if (isEmpty(exchangeData)) {
      return;
    }
    if (exchangeData.from === "USD") {
      setIcbValue(exchangeData.value);
      return;
    }
  }, [exchangeData]);

  const onCloseModal = () => {
    setShowModal(false);
  };

  const onShowModal = () => {
    setShowModal(true);
  };

  const exchangeUsdToIcb = (value) => {
    setUsdValue(value);
    debounced(() => {
      dispatch(
        exchangeCalRate({
          from_currency: "USD",
          to_currency: "ICB",
          amount: value,
          type: "EARN",
        })
      );
    });
  };

  const onFinish = (values) => {
    if (!icbValue || !usdValue) {
      return;
    }

    dispatch(
      walletTransWithdraw(
        {
          amount: usdValue,
          note: values.note,
          type: "EARN",
        },
        () => {
          reGetDashboard();
          setShowModal(false);
        }
      )
    );
  };

  return (
    <Card className="revenue-container">
      <div className="wrapper">
        <div className="title">
          <FormattedMessage id="commissions.revenue.revenue" />
        </div>
        <div>
          <Statistic
            className="icb-value"
            title=""
            suffix="ICB"
            value={customerCommission}
          />
        </div>

        {/* <div className='mt-5'>
        <Statistic
          className="icb-value"
          title="Đã kiếm được"
          prefix="$"
          value={customerCommissionWasEarn}
        />
        </div> */}
        <div className="action">
          <Button
            className="border-radius-20"
            type="primary"
            disabled={customerCommission ? false : true}
            onClick={onShowModal}
          >
            <FormattedMessage id="commissions.revenue.withdrawalICB" />
          </Button>
        </div>
      </div>

      <Modal
        title={<FormattedMessage id="commissions.revenue.withdrawalICB" />}
        visible={showModal}
        footer={false}
        onCancel={onCloseModal}
        width={470}
      >
        <Form
          onFinish={onFinish}
          layout="vertical"
          className="form-revenue-container"
        >
          <Row className="mb-20">
            <Col span={14}>
              <div className="label-custom">
                <label className="label-require">
                  <FormattedMessage id="commissions.revenue.money" />
                </label>
              </div>
              <div className="control">
                <div className="control-left">
                  <InputNumber
                    value={usdValue}
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    size="large"
                    onChange={exchangeUsdToIcb}
                  />
                </div>
                <div className="unit">
                  <Input size="large" disabled suffix="USD" />
                </div>
              </div>
            </Col>

            <Col span={10}>
              <div className="label-custom">
                <label className="form-item-hide-custom">a</label>
              </div>

              <div className="control">
                <div className="control-left">
                  <InputNumber
                    value={icbValue}
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    size="large"
                    disabled
                  />
                </div>
                <div className="unit">
                  <Input size="large" disabled suffix="ICB" />
                </div>
              </div>
            </Col>
            {!usdValue && (
              <Text type="danger">
                <FormattedMessage id="commissions.revenue.messMoney" />
              </Text>
            )}
          </Row>

          <Form.Item
            label={<FormattedMessage id="commissions.revenue.note" />}
            name="note"
            rules={[
              {
                required: false,
                message: <FormattedMessage id="commissions.revenue.messNote" />,
              },
            ]}
          >
            <Input.TextArea size="large"></Input.TextArea>
          </Form.Item>

          <div className="t-right">
            <Button className="mr-10" onClick={onCloseModal} size="large">
              <FormattedMessage id="commissions.revenue.cancel" />
            </Button>
            <Button htmlType="submit" size="large" type="primary">
              <FormattedMessage id="commissions.revenue.submit" />
            </Button>
          </div>
        </Form>
      </Modal>
    </Card>
  );
};

export default Revenue;
