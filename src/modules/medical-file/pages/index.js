import React, { useEffect, useState } from "react";
import { Card, Modal, AutoComplete } from "antd";
import { forEach } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetailMedicalProfile,
  getListHospital,
  updateMedicalProfile,
} from "modules/medical-profile/redux/actions";
import {
  MedicalProfileItem,
  MedicalProfileForm,
} from "modules/medical-profile/components";
import { UploadAnt } from "commons/components";
import {
  customerMedicalFileCreate,
  customerMedicalFileList,
  customerMedicalFileDelete,
} from "modules/medical-file/redux/actions";
import "./styles.scss";
import { SEARCH_HOSPITAL } from "modules/medical-profile/redux/constants";
import { debounced } from "helpers/CommonHelper";
const Option = AutoComplete.Option;

const MedicalFilePage = ({ match, history }) => {
  const dispatch = useDispatch();
  const [medicalProfileId, setMedicalProfileId] = useState(0);
  const { medicalProfileDetail, listHospital } = useSelector(
    (state) => state.medicalProfile
  );
  const { medicalFileList } = useSelector((state) => state.medicalFile);
  const [searchParams] = useState({ page: 1, limit: 10 });

  const [medicalProfileSelected, setMedicalProfileSelected] = useState(null);
  const [showModalMedicalProfile, setShowModalMedicalProfile] = useState(false);
  const [searchHospital, setSearchHospital] = useState(SEARCH_HOSPITAL);

  useEffect(() => {
    dispatch(getListHospital(searchHospital));
  }, [searchHospital, dispatch]);

  useEffect(() => {
    const id = match.params.id;
    setMedicalProfileId(id);

    dispatch(getDetailMedicalProfile(id));
  }, [match.params.id]);

  useEffect(() => {
    if (medicalProfileId) {
      dispatch(
        customerMedicalFileList({
          ...searchParams,
          customer_medical_profile_id: medicalProfileId,
        })
      );
    }
  }, [searchParams, medicalProfileId]);

  const onSearchHospital = (keyword) => {
    debounced(() => {
      setSearchHospital({
        ...searchHospital,
        keyword,
      });
    });
  };

  const hospitalOptions = (listHospital.data || []).map((item) => (
    <Option key={item.id} value={`${item.id},${item.title}`}>
      {item.title}
    </Option>
  ));

  const onShowModalMedicalProfile = (data) => {
    setMedicalProfileSelected(data);
    setShowModalMedicalProfile(true);
  };

  const closeModalMedicalProfile = () => {
    setShowModalMedicalProfile(false);
    setMedicalProfileSelected(null);
  };

  const onUpdateMedicalProfile = payload => {
    dispatch(
      updateMedicalProfile(payload, () => {
        closeModalMedicalProfile();
        dispatch(getDetailMedicalProfile(medicalProfileId));
      })
    );
  };

  const handleChangeFile = (files) => {
    forEach(files, async (file) => {
      const body = new FormData();
      body.append("medical_profile_id", medicalProfileId);
      body.append("file", file);
      dispatch(customerMedicalFileCreate(body));
    });
  };

  const handleDeleteFile = (id) => {
    dispatch(customerMedicalFileDelete({ id }));
  };

  const goDetailMedicalProfile = (value) => {
    history.push({
      pathname: "/medical-profile",
      search: `?detail=${value.id}`,
    });
  };

  return (
    <div className="medical-file-container">
      <Modal
        visible={showModalMedicalProfile}
        onCancel={closeModalMedicalProfile}
        title="Cập nhật hồ sơ y tế"
        footer={null}
      >
        {showModalMedicalProfile && (
          <MedicalProfileForm
            listHospital={listHospital.data}
            hospitalOptions={hospitalOptions}
            onSearchHospital={onSearchHospital}
            detail={medicalProfileSelected}
            onUpdateMedicalProfile={onUpdateMedicalProfile}
            onCloseModal={closeModalMedicalProfile}
          />
        )}
      </Modal>

      <MedicalProfileItem
        data={medicalProfileDetail}
        onUpdate={onShowModalMedicalProfile}
        onDetail={goDetailMedicalProfile}
      />

      <Card className="mt-20">
        <UploadAnt
          onChange={handleChangeFile}
          listFile={medicalFileList}
          onDelete={handleDeleteFile}
        />
      </Card>
    </div>
  );
};

export default MedicalFilePage;
