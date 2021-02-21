import React, { useState, useEffect } from "react";
import { Form, AutoComplete, InputNumber, Input, Button } from "antd";
import { wallerGetByEmailOrAddress } from "modules/dashboard/redux/actions";
import { debounced } from "helpers/CommonHelper";
import { useDispatch } from "react-redux";
import { get } from "lodash";
import { FormattedMessage, injectIntl } from "react-intl";

const { Option } = AutoComplete;
const TransferModal = ({ onCloseModal, onTransTransfer, intl }) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const [addressSelected, setAddressSelected] = useState(null);
  const [searchAddress, setSearchAddress] = useState("");
  const [walletOptionList, setWalletOptionList] = useState([]);

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

  const onFinish = (values) => {
    const payload = { ...values, wallet_addr: addressSelected };
    onTransTransfer(payload);
  };

  const onSelect = (data) => {
    const [address, fullName] = data.split(",");
    setAddressSelected(address);
    form.setFieldsValue({
      wallet_addr: fullName,
    });
  };

  const onSearchWalletAddress = (value) => {
    debounced(() => {
      setSearchAddress(value);
    });
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        label={<FormattedMessage id="dashboard.transferModal.walletAddress" />}
        name="wallet_addr"
        rules={[
          {
            required: true,
            message: <FormattedMessage id="dashboard.transferModal.message" />,
          },
        ]}
      >
        <AutoComplete
          size="large"
          onSelect={(value) => onSelect(value)}
          onSearch={onSearchWalletAddress}
          placeholder={intl.formatMessage({
            id: "dashboard.transferModal.emailOrWalletAddress",
          })}
        >
          {(walletOptionList || []).map((item) => (
            <Option
              key={item.id}
              value={`${get(item, "wallet.address")},${item.full_name}`}
            >
              {item.full_name}
            </Option>
          ))}
        </AutoComplete>
      </Form.Item>

      <Form.Item
        label={<FormattedMessage id="dashboard.transferModal.money" />}
        name="amount"
        rules={[
          {
            required: true,
            message: <FormattedMessage id="dashboard.transferModal.message" />,
          },
        ]}
      >
        <InputNumber
          className="w-100pc"
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          size="large"
          placeholder={intl.formatMessage({
            id: "dashboard.transferModal.pleaseEnter",
          })}
        />
      </Form.Item>

      <Form.Item
        label={<FormattedMessage id="dashboard.transferModal.note" />}
        name="note"
        rules={[
          {
            required: false,
            message: <FormattedMessage id="dashboard.transferModal.message" />,
          },
        ]}
      >
        <Input.TextArea
          size="large"
          placeholder={intl.formatMessage({
            id: "dashboard.transferModal.pleaseEnter",
          })}
        />
      </Form.Item>

      <div className="t-right">
        <Button className="mr-10" size="large" onClick={() => onCloseModal()}>
          <FormattedMessage id="dashboard.transferModal.cancel" />
        </Button>
        <Button htmlType="submit" size="large" type="primary">
          <FormattedMessage id="dashboard.transferModal.save" />
        </Button>
      </div>
    </Form>
  );
};

export default injectIntl(TransferModal);
