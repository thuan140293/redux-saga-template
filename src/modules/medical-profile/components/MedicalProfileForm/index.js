import React, { useState, useEffect } from "react";
import {
  Col,
  Form,
  AutoComplete,
  DatePicker,
  Input,
  Button,
  Modal,
} from "antd";
import { CheckCircleTwoTone, MinusCircleOutlined } from "@ant-design/icons";
import { isEmpty, get } from "lodash";
import { createHospital } from "modules/medical-profile/redux/actions";
import moment from "moment";
import "./styles.scss";
import { useDispatch } from "react-redux";
import { injectIntl } from "react-intl";

const dateFormat = "YYYY-MM-DD";
const MedicalProfileForm = ({
  onCreateMedicalProfile,
  onUpdateMedicalProfile,
  detail,
  onCloseModal,
  onSearchHospital,
  hospitalOptions,
  listHospital,
  intl
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formHospital] = Form.useForm();
  const [isPublic, setIsPubic] = useState(false);
  const [hospitalSelected, setHospitalSelected] = useState(null);
  const [showModalAddHospital, setShowModalAddHospital] = useState(false);
  useEffect(() => {
    if (!isEmpty(detail)) {
      form.setFieldsValue({
        customer_id: get(detail, "customer.full_name"),
        hospital_id: get(detail, "hospital.title"),
        note: detail.note,
        date: moment(detail.updated_at || detail.created_at).tz(
          "Asia/Ho_Chi_Minh"
        ),
        id: detail.id,
      });

      onSearchHospital(get(detail, "hospital.title"));
      setIsPubic(detail.is_public ? true : false);
    }
  }, [detail, form]);

  const onSave = (values) => {
    if (detail) {
      onUpdateMedicalProfile({
        ...values,
        is_public: isPublic,
        id: detail.id,
        hospital_id: isNaN(+values.hospital_id)
          ? get(detail, "hospital.id")
          : hospitalSelected,
      });
      return;
    }
    onCreateMedicalProfile({
      ...values,
      is_public: isPublic,
      hospital_id: hospitalSelected,
    });
  };

  const handleSwitchStatus = () => {
    setIsPubic(!isPublic);
  };

  const onSelectHospital = (data) => {
    const [id, title] = data.split(",");
    setHospitalSelected(id);
    form.setFieldsValue({
      hospital_id: title,
    });
  };

  const onCreateHospital = (values) => {
    dispatch(
      createHospital(values, (data) => {
        setHospitalSelected(data.id);
        form.setFieldsValue({
          hospital_id: data.title,
        });
        formHospital.resetFields();
        setShowModalAddHospital(false);
        onSearchHospital("");
      })
    );
  };

  return (
    <>
      <Modal
        visible={showModalAddHospital}
        onCancel={() => setShowModalAddHospital(false)}
        title={intl.formatMessage({ id: 'medical-profile.medicalProfileForm.addNewHospital' })}
        footer={null}
      >
        {showModalAddHospital && (
          <>
            <Form
              layout="vertical"
              onFinish={onCreateHospital}
              form={formHospital}
            >
              <Form.Item
                name="title"
                label={intl.formatMessage({ id: 'medical-profile.medicalProfileForm.hospitalName' })}
                className="form-item-custom"
                rules={[{ required: true, message: intl.formatMessage({ id: 'medical-profile.medicalProfileForm.message' }) }]}
              >
                <Input size="large" placeholder={intl.formatMessage({ id: 'medical-profile.medicalProfileForm.hospitalName' })} />
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({ id: 'medical-profile.medicalProfileForm.address' })}
                name="address"
                className="form-item-custom"
                rules={[{ required: true, message: intl.formatMessage({ id: 'medical-profile.medicalProfileForm.message' }) }]}
              >
                <Input size="large" placeholder={intl.formatMessage({ id: 'medical-profile.medicalProfileForm.address' })} />
              </Form.Item>
              <div className="mt-10 t-right">
                <Button
                  onClick={() => setShowModalAddHospital(false)}
                  type="default"
                  className="mr-10"
                >
                  {intl.formatMessage({ id: 'medical-profile.medicalProfileForm.cancel' })}
                </Button>
                <Button
                  htmlType="submit"
                  type="primary"
                  className="button-save"
                >
                  {intl.formatMessage({ id: 'medical-profile.medicalProfileForm.save' })}
                </Button>
              </div>
            </Form>
          </>
        )}
      </Modal>
      <Form form={form} onFinish={onSave}>
        <Form.Item
          name="hospital_id"
          className="form-item-custom"
          rules={[{ required: true, message: intl.formatMessage({ id: 'medical-profile.medicalProfileForm.message' }) }]}
        >
          <AutoComplete
            onSelect={(data) => onSelectHospital(data)}
            onSearch={onSearchHospital}
            placeholder={intl.formatMessage({ id: 'medical-profile.medicalProfileForm.searchHospital' })}
            size="large"
          >
            {hospitalOptions}
          </AutoComplete>
        </Form.Item>
        {listHospital && !listHospital.length && (
          <Button
            onClick={() => setShowModalAddHospital(true)}
            className="mb-20"
            type="primary"
          >
            {intl.formatMessage({ id: 'medical-profile.medicalProfileForm.addHospital' })}
          </Button>
        )}

        <Form.Item
          name="note"
          className="form-item-custom"
          rules={[{ required: true, message: intl.formatMessage({ id: 'medical-profile.medicalProfileForm.message' }) }]}
        >
          <Input size="large" placeholder={intl.formatMessage({ id: 'medical-profile.medicalProfileForm.note' })}/>
        </Form.Item>

        <Form.Item
          name="date"
          className="form-item-custom"
          rules={[{ required: true, message: intl.formatMessage({ id: 'medical-profile.medicalProfileForm.message' }) }]}
        >
          <DatePicker
            placeholder={intl.formatMessage({ id: 'medical-profile.medicalProfileForm.date' })}
            className="w-100pc"
            size="large"
            format={dateFormat}
          />
        </Form.Item>

        <Col span={24}>
          {isPublic && (
            <div
              onClick={handleSwitchStatus}
              className="wrapper-status is-public"
            >
              <span className="mr-5">
                <CheckCircleTwoTone />
              </span>
              <p>
              {intl.formatMessage({ id: 'medical-profile.medicalProfileForm.warning1' })}
              </p>
            </div>
          )}
          {!isPublic && (
            <div
              onClick={handleSwitchStatus}
              className="wrapper-status not-public"
            >
              <span className="mr-5">
                <MinusCircleOutlined />
              </span>
              <p>
              {intl.formatMessage({ id: 'medical-profile.medicalProfileForm.warning2' })}
              </p>
            </div>
          )}
        </Col>

        <Col span={24} className="wrapper-action t-right">
          <Button
            type="default"
            onClick={() => onCloseModal()}
            className="mr-10"
          >
            {intl.formatMessage({ id: 'medical-profile.medicalProfileForm.cancel' })}
          </Button>
          <Button htmlType="submit" type="primary" className="button-save">
            {intl.formatMessage({ id: 'medical-profile.medicalProfileForm.save' })}
          </Button>
        </Col>
      </Form>
    </>
  );
};

export default injectIntl(MedicalProfileForm);
