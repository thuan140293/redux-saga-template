import React, { useCallback, useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfile,
  openUpdatePasswordDialog,
  openUpdateProfileDialog,
  updatePassword,
  updateProfile,
  updateEmail,
  openUpdateEmailDialog,
} from "../redux/actions";
import { get, isEmpty } from "lodash";
import moment from "moment";
import ProfileCard from "./ProfileCard";
import { Button, Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import ProfileAccount from "./ProfileAccount";
import { getDataCities, getDataCountries } from "../../geography/redux/actions";

import { FormattedMessage, injectIntl } from "react-intl";

const dateFormat = "YYYY-MM-DD";

const disabledDate = (current) => {
  return current && current > moment().endOf("day");
};

function ProfilePage({ history, intl }) {
  const {
    profileData,
    verifyCode,
    geographyData,
    openEditProfileDialog,
    isOpenUpdatePasswordDialog,
    isOpenBankDialog,
    banks,
    userInfo,
    isOpenEmailDialog,
  } = useSelector((state) => ({
    profileData: state.profile.profileData,
    verifyCode: state.profile.verifyCode,
    geographyData: state.geography,
    openEditProfileDialog: state.profile.openEditProfileDialog,
    isOpenUpdatePasswordDialog: state.profile.isOpenUpdatePasswordDialog,
    isOpenBankDialog: state.profile.isOpenBankDialog,
    banks: state.profile.banks,
    userInfo: state.auth.userInfo,
    isOpenEmailDialog: state.profile.isOpenEmailDialog,
  }));
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [bankForm] = Form.useForm();
  const [emailForm] = Form.useForm();

  const [profileInfo, setProfileInfo] = useState({});

  useEffect(() => {
    dispatch(getProfile(userInfo.code));
    if (geographyData.countries.length <= 0) dispatch(getDataCountries());
  }, [dispatch, geographyData.countries.length, userInfo.code]);

  const reshapeData = useCallback(
    (profile) => {
      let contact = [
        {
          key: 1,
          title: (
            <FormattedMessage id="profile.profilePage.contact.firstName" />
          ),
          value: get(profile, "first_name"),
        },
        {
          key: 2,
          title: <FormattedMessage id="profile.profilePage.contact.lastName" />,
          value: get(profile, "last_name"),
        },
        {
          key: 3,
          title: <FormattedMessage id="profile.profilePage.contact.sex" />,
          value: get(profile, "gender"),
        },
        {
          key: 4,
          title: <FormattedMessage id="profile.profilePage.contact.DOBirth" />,
          value: "",
        },
        // {key: 5, title: "Địa chỉ", value: get(medicalData, 'address')},
        {
          key: 6,
          title: <FormattedMessage id="profile.profilePage.contact.city" />,
          value: get(profile, "province"),
        },
        {
          key: 7,
          title: <FormattedMessage id="profile.profilePage.contact.country" />,
          value: get(profile, "country"),
        },
      ];

      const dob = get(profile, "dob");
      if (dob) {
        const dateInfo = new Date(dob);
        if (dateInfo instanceof Date && !isNaN(dateInfo.valueOf())) {
          const date = moment(dob).format("DD/MM/yyyy");
          contact = contact.map((item) => {
            if (item.key === 4) {
              return { ...item, value: date };
            }
            return item;
          });
        }
      }

      let customerFamilies = [];
      let blood = [];
      let allergies = [];

      const familyInfo = get(profile, "customerFamilies");
      if (familyInfo) {
        customerFamilies = familyInfo.map((item) => ({
          title: item.value,
          value: [item.family_name, item.family_phone],
        }));
      }
      const bloodInfo = get(profile, "customerHealths.blood");
      if (bloodInfo) {
        blood = bloodInfo.map((item) => item.value);
      }
      const allergiesInfo = get(profile, "customerHealths.allergies");
      if (allergiesInfo) {
        allergies = allergiesInfo.map((item) => item.value);
      }

      const customerHealths = [
        {
          title: <FormattedMessage id="profile.profilePage.customerHealths1" />,
          value: blood,
        },
        {
          title: <FormattedMessage id="profile.profilePage.customerHealths2" />,
          value: allergies,
        },
        // {title: "Tiền sử bệnh", value: ["Tiểu đường type 2", "Tiểu đường type 2"]},
      ];

      const profileHeaderInfo = {
        name: `${profile.last_name} ${profile.first_name}`,
        avatar: profile.image,
        id: profile.code,
        dispatch: dispatch,
      };

      const profileCardInfo = {
        firstName: profile.first_name,
        lastName: profile.last_name,
        gender: profile.gender,
        phone: profile.phone_number,
        address: [profile.address, profile.province, profile.country]
          .filter((item) => item)
          .join(", "),
        pin: profile.pin,
      };

      const profileAccountInfo = {
        email: profile.email,
        username: profile.username,
      };

      const finalData = {
        contact,
        customerFamilies,
        customerHealths,
        profileHeaderInfo,
        profileCardInfo,
        profileAccountInfo,
      };
      setProfileInfo(finalData);
    },
    [dispatch]
  );

  useEffect(() => {
    if (!isEmpty(profileData)) {
      reshapeData(profileData);
    }
  }, [profileData, reshapeData]);

  const onChangeCountry = (value) => {
    dispatch(getDataCities(value));
  };

  const handleOpenProfileDialog = () => {
    onChangeCountry(profileData.country);
    form.setFieldsValue({
      first_name: profileData.first_name,
      last_name: profileData.last_name,
      phone_number: profileData.phone_number,
      gender: profileData.gender,
      passport: profileData.passport,
      address: profileData.address,
      country: profileData.country,
      dob: profileData.dob ? moment(profileData.dob) : null,
    });
    handleUpdateProfileDialog(true);
  };

  // get data geography for select
  const optionForSelect = (data) => {
    let result;
    if (data.length > 0) {
      result = data.map((obj, index) => {
        return (
          <Select.Option key={index} value={obj.name}>
            {obj.name}
          </Select.Option>
        );
      });
    }
    return result;
  };

  const handleUpdateProfile = (data) => {
    dispatch(updateProfile(data));
  };

  const handleUpdateProfileDialog = (open) => {
    dispatch(openUpdateProfileDialog(open));
  };

  // update password
  const handleUpdatePasswordDialog = (open) => {
    passwordForm.setFieldsValue({
      current_password: "",
      password: "",
      confirmPassword: "",
    });
    handleOpenUpdatePasswordDialog(open);
  };

  //update email
  const handleUpdateEmailDialog = (open) => {
    emailForm.setFieldsValue({
      email: "",
    });
    handleOpenUpdateEmailDialog(open);
  };

  const handleUpdatePassword = (data) => {
    dispatch(updatePassword(data));
  };

  const handleOpenUpdatePasswordDialog = (open) => {
    dispatch(openUpdatePasswordDialog(open));
  };

  const handleUpdateEmail = (data) => {
    dispatch(updateEmail(data));
  };

  const handleOpenUpdateEmailDialog = (open) => {
    dispatch(openUpdateEmailDialog(open));
  };
  return (
    <>
      <ProfileHeader
        {...{
          ...profileInfo.profileHeaderInfo,
          verifyCode,
          authUser: profileData,
        }}
      />
      <div className="profile-body-container">
        <Row>
          <Col className="profile-card" xl={16} lg={14} md={14} sm={24} xs={24}>
            <ProfileCard
              {...{
                ...profileInfo.profileCardInfo,
                handleOpenProfileDialog,
                dispatch,
                isOpenBankDialog,
                banks,
                bankForm,
              }}
            />
          </Col>
          <Col className="profile-card" xl={8} lg={10} md={10} sm={24} xs={24}>
            <ProfileAccount
              {...{
                ...profileInfo.profileAccountInfo,
                isOpenUpdatePasswordDialog,
                handleUpdatePasswordDialog,
                handleUpdatePassword,
                passwordForm,
                handleOpenUpdatePasswordDialog,
                emailForm,
                handleUpdateEmailDialog,
                handleUpdateEmail,
                handleOpenUpdateEmailDialog,
                isOpenEmailDialog,
              }}
            />
          </Col>
        </Row>

        <Modal
          visible={openEditProfileDialog}
          title={<FormattedMessage id="profile.ProfileCard.updateProfile" />}
          footer={false}
          onCancel={() => handleUpdateProfileDialog(false)}
          className="update-profile-modal"
        >
          <Form
            className="form-info"
            layout="vertical"
            form={form}
            onFinish={handleUpdateProfile}
          >
            <Row gutter={[8, 16]}>
              <Col xl={12} lg={12} md={12} sm={24} xs={12}>
                <label className="input-field-label">
                  <FormattedMessage id="profile.profilePage.contact.lastName" />
                  <span>
                    {" "}
                    <FormattedMessage id="profile.profilePage.required.mark" />
                  </span>
                </label>
                <Form.Item
                  name="last_name"
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage id="profile.profilePage.requiredMess" />
                      ),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={12}>
                <label className="input-field-label">
                  <FormattedMessage id="profile.profilePage.contact.firstName" />
                  <span>
                    {" "}
                    <FormattedMessage id="profile.profilePage.required.mark" />
                  </span>
                </label>
                <Form.Item
                  name="first_name"
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage id="profile.profilePage.requiredMess" />
                      ),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={12}>
                <label className="input-field-label">
                  <FormattedMessage id="profile.profilePage.contact.sex" />

                  <span>
                    {" "}
                    <FormattedMessage id="profile.profilePage.required.mark" />
                  </span>
                </label>
                <Form.Item
                  name="gender"
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage id="profile.profilePage.requiredMess" />
                      ),
                    },
                  ]}
                  initialValue="male"
                >
                  <Select style={{ width: "100%" }}>
                    <Select.Option value="male">Male</Select.Option>
                    <Select.Option value="female">Female</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={12}>
                <label className="input-field-label">
                  <FormattedMessage id="profile.profilePage.contact.DOBirth" />
                  <span>
                    {" "}
                    <FormattedMessage id="profile.profilePage.required.mark" />
                  </span>
                </label>
                <Form.Item
                  name="dob"
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage id="profile.profilePage.requiredMess" />
                      ),
                    },
                  ]}
                >
                  <DatePicker
                    disabledDate={disabledDate}
                    style={{ width: "100%" }}
                    format={dateFormat}
                  />
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={12}>
                <label className="input-field-label">
                  <FormattedMessage id="profile.profilePage.passport" />
                  <span>
                    {" "}
                    <FormattedMessage id="profile.profilePage.required.mark" />
                  </span>
                </label>
                <Form.Item
                  name="passport"
                  rules={[
                    {
                      required: false,
                      message: (
                        <FormattedMessage id="profile.profilePage.requiredMess" />
                      ),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={12}>
                <label className="input-field-label">
                  <FormattedMessage id="profile.profilePage.phone" />
                  <span>
                    {" "}
                    <FormattedMessage id="profile.profilePage.required.mark" />
                  </span>
                </label>
                <Form.Item
                  name="phone_number"
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage id="profile.profilePage.requiredMess" />
                      ),
                    },
                    {
                      pattern: /^(0[1-9])+([0-9]{8,20})\b$/,
                      message: (
                        <FormattedMessage id="profile.profilePage.illegal" />
                      ),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={12}>
                <label className="input-field-label">
                  <FormattedMessage id="profile.profilePage.contact.country" />
                  <span>
                    {" "}
                    <FormattedMessage id="profile.profilePage.required.mark" />
                  </span>
                </label>
                <Form.Item
                  name="country"
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage id="profile.profilePage.requiredMess" />
                      ),
                    },
                  ]}
                >
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder={intl.formatMessage({
                      id: "profile.profilePage.placeholder",
                    })}
                    optionFilterProp="children"
                    onChange={onChangeCountry}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {optionForSelect(geographyData.countries)}
                  </Select>
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={12}>
                <label className="input-field-label">
                  <FormattedMessage id="profile.profilePage.address" />
                  <span>
                    {" "}
                    <FormattedMessage id="profile.profilePage.required.mark" />
                  </span>
                </label>
                <Form.Item
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage id="profile.profilePage.requiredMess" />
                      ),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={12}></Col>
            </Row>

            <Form.Item className="action">
              <Button
                key="back"
                className="m-r-20 profile-button button-left"
                onClick={() => handleUpdateProfileDialog(false)}
              >
                <FormattedMessage id="profile.profilePage.cancel" />
              </Button>
              <Button
                className="profile-button button-right"
                key="submit"
                type="primary"
                htmlType="submit"
              >
                <FormattedMessage id="profile.profilePage.save" />
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}

export default injectIntl(ProfilePage);
