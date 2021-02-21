import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Modal,
  Form,
  Card,
  DatePicker,
  AutoComplete,
  Pagination,
  Collapse
} from "antd";
import { SEARCH_MEDICAL_PROFILE, SEARCH_HOSPITAL } from "../../redux/constants";
import { pickBy, cloneDeep, get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  getListMedicalProfile,
  deleteMedicalProfile,
  getListHospital,
  updateMedicalProfile,
  createMedicalProfile,
} from "../../redux/actions";
import { MedicalProfileItem, MedicalProfileForm } from "../../components";
import { debounced } from "helpers/CommonHelper";
import "./styles.scss";
import { injectIntl } from "react-intl";

const Option = AutoComplete.Option;
const { Panel } = Collapse;

const ListMedicalProfile = ({ history, intl }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { medicalProfileData, listHospital } = useSelector(
    (state) => state.medicalProfile
  );

  const [searchMedicalProfile, setSearchMedicalProfile] = useState(
    cloneDeep(SEARCH_MEDICAL_PROFILE)
  );
  const [searchHospital, setSearchHospital] = useState(
    cloneDeep(SEARCH_HOSPITAL)
  );
  const [hospitalId, setHospitalId] = useState(null);
  const [medicalProfileSelected, setMedicalProfileSelected] = useState(null);
  const [showModalMedicalProfile, setShowModalMedicalProfile] = useState(false);

  useEffect(() => {
    dispatch(
      getListMedicalProfile(
        pickBy({ ...searchMedicalProfile, hospital_id: hospitalId }, (param) => param)
      )
    );
  }, [dispatch, searchMedicalProfile]);

  useEffect(() => {
    dispatch(
      getListHospital(searchHospital)
    );
  }, [searchHospital, dispatch]);

  // Master data
  const hospitalOptions = (listHospital.data || []).map((item) => (
    <Option key={item.id} value={`${item.id},${item.title}`}>
      {item.title}
    </Option>
  ));

  const onSearchHospital = (keyword) => {
    debounced(() => {
      setSearchHospital({
        ...searchHospital,
        keyword,
      });
    });
  };
  // End Master data

  // Medical profile
  const onShowModalMedicalProfile = (data) => {
    setMedicalProfileSelected(data);
    setShowModalMedicalProfile(true);
  };

  const addNewMedicalProfile = () => {
    setShowModalMedicalProfile(true);
    setMedicalProfileSelected(null);
  };

  const closeModalMedicalProfile = () => {
    setShowModalMedicalProfile(false);
  };

  const onCreateMedicalProfile = (payload) => {
    dispatch(
      createMedicalProfile(payload, () => {
        closeModalMedicalProfile();
        setSearchMedicalProfile({ ...searchMedicalProfile });
      })
    );
  };

  const onUpdateMedicalProfile = (payload) => {
    dispatch(
      updateMedicalProfile(payload, () => {
        closeModalMedicalProfile();
        setSearchMedicalProfile({ ...searchMedicalProfile });
      })
    );
  };

  const onDeleteMedicalProfile = (id) => {
    dispatch(
      deleteMedicalProfile({ id }, () => {
        setSearchMedicalProfile({ ...searchMedicalProfile });
      })
    );
  };

  const onSaveMedicalProfile = (values) => {
    setSearchMedicalProfile(values);
  };
  // End medical profile

  const goDetailMedicalProfile = (value) => {
    history.push({
      pathname: "/medical-profile",
      search: `?detail=${value.id}`,
    });
  };

  const handleChangeSearchHospital = (value, option) => {
    form.setFieldsValue({
      hospital_id: get(option, 'children')
    });
    setHospitalId(get(option, 'key'));
  }

  return (
    <>
      <Modal
        visible={showModalMedicalProfile}
        onCancel={closeModalMedicalProfile}
        title={medicalProfileSelected ? intl.formatMessage({ id: 'medical-profile.listMedicalProfile.noData' }) : intl.formatMessage({ id: 'medical-profile.listMedicalProfile.titleConfirm' })}
        footer={null}
      >
        {showModalMedicalProfile && (
          <MedicalProfileForm
            listHospital={listHospital.data}
            hospitalOptions={hospitalOptions}
            onSearchHospital={onSearchHospital}
            detail={medicalProfileSelected}
            onCreateMedicalProfile={onCreateMedicalProfile}
            onUpdateMedicalProfile={onUpdateMedicalProfile}
            onCloseModal={closeModalMedicalProfile}
          />
        )}
      </Modal>

      <Collapse className='mb-20' defaultActiveKey='0'>
        <Panel header={intl.formatMessage({ id: 'medical-profile.listMedicalProfile.header' })} key="1">
          <Form
            layout="vertical"
            name="normal_login"
            className="login-form"
            onFinish={onSaveMedicalProfile}
            initialValues={{
              fromDate: searchMedicalProfile.fromDate,
              toDate: searchMedicalProfile.toDate,
            }}
            form={form}
          >
            <Row gutter={[16, 16]}>
              <Col xl={6} lg={12} md={24} sm={24} xs={24}>
                <Form.Item label={intl.formatMessage({ id: 'medical-profile.listMedicalProfile.hospital' })} name="hospital_id">
                  <AutoComplete
                    size="large"
                    onSelect={(value) => null}
                    onSearch={onSearchHospital}
                    onChange={handleChangeSearchHospital}
                    placeholder={intl.formatMessage({ id: 'medical-profile.listMedicalProfile.searchHospital' })}
                    allowClear
                  >
                    {hospitalOptions}
                  </AutoComplete>
                </Form.Item>
              </Col>

              <Col xl={6} lg={12} md={24} sm={24} xs={24}>
                <Form.Item label={intl.formatMessage({ id: 'medical-profile.listMedicalProfile.fromDate' })} name="fromDate">
                  <DatePicker
                    size="large"
                    className="w-100pc"
                    placeholder={intl.formatMessage({ id: 'medical-profile.listMedicalProfile.fromDate' })}
                  />
                </Form.Item>
              </Col>

              <Col xl={6} lg={12} md={24} sm={24} xs={24}>
                <Form.Item label={intl.formatMessage({ id: 'medical-profile.listMedicalProfile.toDate' })} name="toDate">
                  <DatePicker
                    size="large"
                    className="w-100pc"
                    placeholder={intl.formatMessage({ id: 'medical-profile.listMedicalProfile.toDate' })}
                  />
                </Form.Item>
              </Col>
              <Col xl={6} lg={12} md={24} sm={24} xs={24}>
                <Button className='mt-30' type="primary" htmlType="submit">
                  {intl.formatMessage({ id: 'medical-profile.listMedicalProfile.search' })}
              </Button>
              </Col>
            </Row>
          </Form>
        </Panel>
      </Collapse>


      <Card className="medical-profile-page">
        <div className="wrapper-paginate mt-20 mb-20">
          <Button type="primary" onClick={addNewMedicalProfile}>
            {intl.formatMessage({ id: 'medical-profile.listMedicalProfile.addNew' })}
          </Button>
          <Pagination
            current={get(medicalProfileData, "page")}
            total={get(medicalProfileData, "total")}
            onChange={(page) =>
              setSearchMedicalProfile({ ...searchMedicalProfile, page })
            }
          />
        </div>

        <Row gutter={[16, 16]}>
          {get(medicalProfileData, "data").map((medicalProfile) => (
            <Col xl={12} lg={24} md={24} sm={24} xs={24} key={medicalProfile.id}>
              <MedicalProfileItem
                data={medicalProfile}
                onDelete={onDeleteMedicalProfile}
                onUpdate={onShowModalMedicalProfile}
                onDetail={goDetailMedicalProfile}
              />
            </Col>
          ))}
        </Row>

        <div className="mt-20 t-right">
          <Pagination
            current={get(medicalProfileData, "page")}
            total={get(medicalProfileData, "total")}
            onChange={(page) =>
              setSearchMedicalProfile({ ...searchMedicalProfile, page })
            }
          />
        </div>
      </Card>
    </>
  );
};

export default injectIntl(ListMedicalProfile);