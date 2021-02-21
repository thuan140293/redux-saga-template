import React, { useEffect } from "react";
import { Form, Button, InputNumber } from "antd";
import * as numeral from "numeral";
import "./styles.scss";
import { FormattedMessage, injectIntl } from "react-intl";
import SelectNumberOption from "./selectNumberOption";
import { useDispatch, useSelector } from "react-redux";
import { exchangeCalRate } from "modules/dashboard/redux/actions";
import { roundNumber } from "modules/dashboard/pages/Deposit";
const EARN = "EARN";
const CommissionModal = ({
  intl,
  unit,
  onCommissionSubmit = () => {},
  ...props
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { exchangeData } = useSelector((state) => state.dashboard) || {
    fee: 0,
  };
  const { commissions_earned: maxValue } = props || { amount: 0 };

  useEffect(() => {
    form.setFieldsValue({ amount: "" });
  }, [props]);

  useEffect(() => {
    dispatch(
      exchangeCalRate({
        amount: maxValue,
        type: EARN,
      })
    );
  }, []);

  const onFinish = (values) => {
    const valueAmount = numeral(values.amount).value();
    if (!valueAmount || !maxValue) return;
    onCommissionSubmit({
      amount: valueAmount,
      type: EARN,
    });
  };
  const handleSelect = (value) => {
    const { fee } = exchangeData;
    const computeAmount = maxValue ? (maxValue * value) / 100 - fee : 0;
    if (maxValue < fee || computeAmount < 0)
      return form.setFieldsValue({ amount: 0 });
    form.setFieldsValue({ amount: roundNumber(computeAmount) });
  };
  return (
    <div className="withdraw-modal-container">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <label>
          <FormattedMessage id="dashboard.input.amount" /> available:{" "}
          {roundNumber(maxValue) || 0}
        </label>
        <Form.Item
          name="amount"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage id="dashboard.transferModal.message" />
              ),
            },
          ]}
        >
          <InputNumber
            className="w-100pc"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            placeholder={intl.formatMessage({
              id: "dashboard.transferModal.pleaseEnter",
            })}
          />
        </Form.Item>
        <SelectNumberOption handleSelect={handleSelect} />
        <div className="t-right">
          <Button htmlType="submit">
            <FormattedMessage id="dashboard.button.confirm" />
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default injectIntl(CommissionModal);
