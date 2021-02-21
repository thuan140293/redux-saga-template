import React, { useEffect, useState } from "react";
import { Form, Button, InputNumber, Select, Input } from "antd";
import * as numeral from "numeral";
import "./styles.scss";
import { FormattedMessage, injectIntl } from "react-intl";
import { USDTTRON, USDTJSB, JSB } from "modules/dashboard/pages/Deposit";

const options = [
  {
    value: USDTTRON,
    label: USDTTRON,
  },
  {
    value: USDTJSB,
    label: USDTJSB,
  },
  // {
  //   value: JSB,
  //   label: JSB,
  // },
];

const { Option } = Select;
const SwapModal = ({
  intl,
  unit = USDTTRON,
  onSwapSubmit = () => {},
  ...props
}) => {
  const [fromCurrency, setFromCurrency] = useState(unit);
  const [toCurrency, setToCurrency] = useState();
  const [amountValue, setAmountValue] = useState("");
  const [form] = Form.useForm();
  const { commissions_earned: maxValue } = props || { amount: 0 };
  useEffect(() => {
    form.setFieldsValue({ amount: "" });
  }, [props]);

  const onFinish = () => {
    const amount = numeral(amountValue).value();
    if (!amount || amount > maxValue) return;
    if (!toCurrency) return;
    const payload = {
      fromCurrency: fromCurrency,
      toCurrency: toCurrency,
      amount,
    };
    onSwapSubmit(payload);
  };

  const handleChangeFrom = (val) => {
    setFromCurrency(val);
  };

  const handleChangeTo = (val) => {
    setToCurrency(val);
  };

  const onChangeInput = (value) => {
    setAmountValue(value);
  };
  return (
    <div className="withdraw-modal-container swap-container">
      <div className="title">
        <FormattedMessage id="dashboard.swap" />
        <span> USD </span>
        <FormattedMessage id="dashboard.title.wallet" />
      </div>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <label>
          <FormattedMessage id="dashboard.from" />
        </label>
        <Form.Item name="amount">
          <Input.Group compact>
            <InputNumber
              value={amountValue}
              onChange={onChangeInput}
              style={{ width: 188 }}
              className="w-100pc"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              placeholder={intl.formatMessage({
                id: "dashboard.transferModal.pleaseEnter",
              })}
            />
            <Select
              defaultValue={fromCurrency}
              onChange={handleChangeFrom}
              className="mobile-select"
              style={{ width: 128 }}
            >
              {options.map((item, key) => (
                <Option key={key} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
            {!amountValue && (
              <div className="red-color">
                <FormattedMessage id="dashboard.transferModal.message" />
              </div>
            )}
          </Input.Group>
        </Form.Item>
        <label>
          <FormattedMessage id="dashboard.to" />
        </label>
        <Form.Item name="toAmount">
          <Input.Group compact>
            <InputNumber
              value={amountValue}
              style={{ width: 188 }}
              className="w-100pc"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              disabled={true}
            />
            <Select
              className="mobile-select"
              style={{ width: 128 }}
              onChange={handleChangeTo}
            >
              {options
                .filter((item) => item.value !== fromCurrency)
                .map((item, key) => (
                  <Option key={key} value={item.value}>
                    {item.label}
                  </Option>
                ))}
            </Select>
            {!toCurrency && (
              <div className="red-color">
                <FormattedMessage id="dashboard.transferModal.message" />
              </div>
            )}
          </Input.Group>
        </Form.Item>

        <div className="t-right">
          <Button htmlType="submit">
            <FormattedMessage id="dashboard.button.confirm" />
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default injectIntl(SwapModal);
