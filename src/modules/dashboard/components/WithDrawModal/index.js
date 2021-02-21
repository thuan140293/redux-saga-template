import React, { useEffect, useState } from "react";
import { Form, Input, AutoComplete, Button, InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as numeral from "numeral";
import "./styles.scss";
import { FormattedMessage, injectIntl } from "react-intl";
import {
  sendType,
  USDTTRON,
  roundNumber,
} from "modules/dashboard/pages/Deposit";
import { debounced } from "helpers/CommonHelper";
import {
  wallerGetByEmailOrAddress,
  exchangeCalRate,
} from "modules/dashboard/redux/actions";
import SelectNumberOption from "../CommissionModal/selectNumberOption";

const { Option } = AutoComplete;
const TRON = "TRON";
const WithDrawModal = ({
  intl,
  onWalletTransWithdraw,
  unit,
  onTransTransfer = () => {},
  onWithDrawTransfer = () => {},
  index,
  ...props
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [addressSelected, setAddressSelected] = useState(null);
  const [searchAddress, setSearchAddress] = useState("");
  const [walletOptionList, setWalletOptionList] = useState([]);
  const { amount: maxValue } = props || { amount: 0 };
  const { exchangeData } = useSelector((state) => state.dashboard) || {
    fee: 0,
  };
  useEffect(() => {
    const typeFee = unit === USDTTRON ? "WITHDRAW" : "TRANSFER";
    dispatch(
      exchangeCalRate({
        amount: maxValue,
        type: typeFee,
      })
    );
  }, []);

  useEffect(() => {
    setAddressSelected("");
    setSearchAddress("");
    setWalletOptionList([]);
    form.setFieldsValue({ wallet_addr: "", amount: "" });
  }, [index]);

  useEffect(() => {
    dispatch(
      wallerGetByEmailOrAddress(
        searchAddress,
        (data) => {
          setWalletOptionList(data);
        },
        () => {
          setWalletOptionList([]);
        }
      )
    );
  }, [searchAddress, dispatch]);

  const onSelect = (data) => {
    const parseData = JSON.parse(data);
    const { full_name, wallet } = parseData || { full_name: "", wallet: [] };
    const { address } = wallet.find((o) => o.unit === unit) || { address: "" };
    form.setFieldsValue({
      wallet_addr: full_name,
    });
    if (address === "") return setAddressSelected("");
    return setAddressSelected(address);
  };

  const onSearchWalletAddress = (value) => {
    debounced(() => {
      setSearchAddress(value);
    });
  };

  const onFinish = (values) => {
    const wallet_addr =
      unit === USDTTRON ? values.wallet_addr : addressSelected;
    const valueAmount = numeral(values.amount).value();
    if (!valueAmount || !maxValue) return;
    const payload = {
      ...values,
      wallet_addr,
      currency: unit,
    };
    if (unit === USDTTRON) {
      return onWithDrawTransfer({
        toAddress: wallet_addr,
        network: TRON,
        amount: valueAmount,
      });
    }
    return onTransTransfer(payload);
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
          <FormattedMessage id="dashboard.input.address" />
        </label>
        <Form.Item
          name="wallet_addr"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage id="dashboard.transferModal.message" />
              ),
            },
          ]}
        >
          {unit === USDTTRON ? (
            <Input
              placeholder={intl.formatMessage({
                id: "dashboard.transferModal.pleaseEnter",
              })}
            />
          ) : (
            <AutoComplete
              onSelect={(value) => onSelect(value)}
              onSearch={onSearchWalletAddress}
              placeholder={intl.formatMessage({
                id: "dashboard.transferModal.emailOrWalletAddress",
              })}
            >
              {(walletOptionList || []).map((item) => (
                <Option key={item.id} value={JSON.stringify(item)}>
                  {item.full_name}
                </Option>
              ))}
            </AutoComplete>
          )}
        </Form.Item>
        <label>
          <FormattedMessage id="dashboard.input.amount" />:{" "}
          {roundNumber(maxValue)}
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

export default injectIntl(WithDrawModal);
