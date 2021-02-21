import {Card, Col, Row, Spin} from 'antd';
import React, {useEffect, useState} from 'react';
import {get, map} from 'lodash';
import Input from 'antd/es/input';
import Button from 'antd/es/button';
import DownloadOutlined from '@ant-design/icons/lib/icons/DownloadOutlined';
import MedicalProfile from './MedicalProfile';
import moment from 'moment';
import * as actions from '../redux/actions';
import {loadMoreMedicalProfile} from '../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {ROUTE} from '../../../commons/constants';
import defaultAvatar from '../../../assets/images/logo/logoApp.png';
import {checkIsImage} from '../../../commons/components/UploadAnt';
import {FilePdfOutlined} from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';

export const cardContactHeaderStyle = {
  fontWeight: 'bold',
  fontSize: '18px',
};

export const cardMedicalHeaderStyle = {
  color: '#0F6AB1',
  fontWeight: 'bold',
  fontSize: '18px',
};

export const cardMedicalBodyStyle = {
  borderLeft: '5px solid #0F6AB1',
};

const notYetUpdate = 'Chưa cập nhật thông tin!';

export const ContactContent = ({title, value}) => {
  return (
    <>
      {title && (
          <Row className="contact-info">
            <Col span={12} className="title">{title}</Col>
            <Col span={12} className="value">{value || ""}</Col>
          </Row>
      )}
    </>
  );
};

export const MedicalInfoContent = ({title, value}) => {
  return (
    <div className="medical-info-content">
      <div className="title">{title}</div>
      {value.length ? (
          <div className="value">{value.map((item, key) => (<div key={key}>{item}</div>))}</div>
      ): <div>{notYetUpdate}</div>}
    </div>
  );
};

export default function MedicalDetail({history}) {
  const medical = useSelector((state) => state.medical);
  const dispatch = useDispatch();

  const [medicalInfo, setMedicalInfo] = useState({});
  const [verifyCode, setVerifyCode] = useState();
  const [isViewFile, setIsViewFile] = useState({status: false, currentViewFiles: []});

  const {customerCode, medicalData, currentMedicalProfilePage} = medical;

  useEffect(() => {
    if (customerCode) {
      dispatch(actions.getMedical({customerCode}));
    } else {
      history.push(ROUTE.PUBLIC);
    }
  }, [customerCode, history, dispatch]);

  useEffect(() => {
    if (medicalData && customerCode) {
      const statusCode = get(medical, 'medicalData.status_code');
      if (statusCode === 200) {
        const medicalData = get(medical, 'medicalData.data');
        reshapeData(medicalData);
      } else {
        history.push(ROUTE.PUBLIC);
      }
    }
  }, [medicalData, history, customerCode, medical]);

  const sendVerifyCode = () => {
    dispatch(actions.getMedical({customerCode, verifyCode}));
  };

  const reshapeData = (medicalData) => {
    let contact = [
      {key: 1, title: 'Họ và tên đệm', value: get(medicalData, 'last_name')},
      {key: 2, title: 'Tên', value: get(medicalData, 'first_name')},
      {key: 3, title: 'Giới tính', value: get(medicalData, 'gender') || notYetUpdate},
      {key: 4, title: 'Ngày sinh', value: ''},
      // {key: 5, title: "Địa chỉ", value: get(medicalData, 'address')},
      {key: 6, title: 'Tỉnh/ Thành phố', value: get(medicalData, 'province') || notYetUpdate},
      {key: 7, title: 'Quốc gia', value: get(medicalData, 'country') || notYetUpdate},
    ];

    const dob = get(medicalData, 'dob');
    if (dob) {
      const dateInfo = new Date(dob);
      if (dateInfo instanceof Date && !isNaN(dateInfo.valueOf())) {
        const date = moment(dob).format('DD/MM/yyyy');
        contact = contact.map((item) => {
          if (item.key === 4) {
            return {...item, value: date};
          }
          return item;
        });
      }
    } else {
      contact = contact.map((item) => {
        if (item.key === 4) {
          return {...item, value: notYetUpdate};
        }
        return item;
      });
    }

    let customerFamilies = [];
    let blood = [];
    let allergies = [];

    const familyInfo = get(medicalData, 'customerFamilies');
    if (familyInfo) {
      customerFamilies = familyInfo.map(
          (item) => ({title: item.value, value: [item.family_name, item.family_phone]}));
    }
    const bloodInfo = get(medicalData, 'customerHealths.blood');
    if (bloodInfo) {
      blood = bloodInfo.map((item) => item.value || customerHealths);
    }
    const allergiesInfo = get(medicalData, 'customerHealths.allergies');
    if (allergiesInfo) {
      allergies = allergiesInfo.map((item) => item.value || customerHealths);
    }

    const customerHealths = [
      {title: 'Nhóm máu', value: blood},
      // {title: "Tiền sử bệnh", value: ["Tiểu đường type 2", "Tiểu đường type 2"]},
      {title: 'Dị ứng thuốc', value: allergies},
    ];

    const finalData = {contact, customerFamilies, customerHealths};
    setMedicalInfo(finalData);
  };

  const getName = () => {
    return `${get(medical, 'medicalData.data.first_name')} ${get(medical, 'medicalData.data.last_name')}`;
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      sendVerifyCode();
    }
  };

  const getAvatar = (image) =>{
    if (image) {
      return image;
    }
    return defaultAvatar;
  };

  const handleViewFile = (files, status) =>{
    setIsViewFile((prevState) =>({
      ...prevState,
      status: status,
      currentViewFiles: files,
    }));
  };

  const fetchMoreData = () =>{
    dispatch(loadMoreMedicalProfile({
      customerCode: customerCode,
      page: currentMedicalProfilePage,
    }));
  };

  const handleBackToProfile = () =>{
    handleViewFile([], false)
  }

  return (
    <>
      <div className="medical-detail-container">
        <Row className="scan-medical-header">
          <Col xl={8} lg={8} md={8} sm={12} xs={12} className="info-wrapper">
            <div className="info">Thông tin cá nhân</div>
            <div className="customer-code-title">Mã khách hàng</div>
            <div className="customer-code">{customerCode}</div>
          </Col>
          <Col xl={8} lg={8} md={8} sm={12} xs={12} className="profile-wrapper">
            <div className="profile-info">Xin chào, {get(medical, 'medicalData.data.last_name')}</div>
            <div className="profile-card">
              <img src={getAvatar(get(medical, 'medicalData.data.image'))} alt="card-font"/>
            </div>
          </Col>
        </Row>
        {
          !isViewFile.status? (
              <Row className="scan-medical-body">
                <Col xl={6} lg={4} md={6} sm={6} xs={24} className="scan-medical-body-col">
                  <Card title="Thông tin cá nhân" className="card-title"
                    headStyle={cardContactHeaderStyle}>
                    {medicalInfo.contact &&
                    medicalInfo.contact.map((item, index) => (
                      <ContactContent title={item.title} value={item.value} key={index}/>
                    ))
                    }
                  </Card>

                  <Card title="Thông tin người thân" className="card-title"
                    headStyle={cardContactHeaderStyle}>
                    {get(medicalInfo, 'customerFamilies', []).length ? (
                        medicalInfo.customerFamilies.map((item, index) => (
                          <MedicalInfoContent title={item.title} value={item.value} key={index}/>
                        ),
                        )): <div>{notYetUpdate}</div>
                    }
                  </Card>

                  <Card title="Thông tin y tế khẩn cấp" className="card-title"
                    headStyle={cardMedicalHeaderStyle}
                    bodyStyle={cardMedicalBodyStyle}
                  >
                    {medicalInfo.customerHealths &&
                    medicalInfo.customerHealths.map((item, index) => (
                      <MedicalInfoContent title={item.title} value={item.value} key={index}/>
                    ))
                    }
                  </Card>
                </Col>

                <Col xl={10} lg={10} md={10} sm={10} xs={24} className="scan-medical-body-col">
                  <Card title="Hồ sơ sức khỏe cá nhân" className="medical-profile-card-title"
                    headStyle={cardMedicalHeaderStyle}
                    bodyStyle={cardMedicalBodyStyle}
                  >
                    {get(medical, 'medicalData.data.medicalProfiles.pagination.total', 0)?(
                        <InfiniteScroll
                            dataLength={get(medical, 'medicalData.data.medicalProfiles.data', []).length}
                            next={fetchMoreData}
                            hasMore={currentMedicalProfilePage !== get(medical, 'medicalData.data.medicalProfiles.pagination.lastPage', 0)}
                            loader={<Spin size="small" />}
                            height={500}
                            endMessage={
                              <p style={{textAlign: 'center'}}>
                                <b>Đã load tất cả hồ sơ</b>
                              </p>
                            }
                        >
                          {
                            get(medical, 'medicalData.data.medicalProfiles') &&
                            medical.medicalData.data.medicalProfiles.data.map((item, index) => (
                                <MedicalProfile {...item} key={index} handleViewFile={handleViewFile}/>
                            ))
                          }
                        </InfiniteScroll>
                    ): (
                        <span>Chưa có thông tin hồ sơ sức khỏe</span>
                    )
                    }

                  </Card>

                  <Card className="card-title"
                    headStyle={cardMedicalHeaderStyle}
                    bodyStyle={cardMedicalBodyStyle}
                  >
                    {
                      get(medical, 'medicalData.data.verifyStatus') === false && (
                        <div className="verify-customer">
                          <div className="title">Bạn cần xác thực mã tại đây để xem thông tin hồ sơ sức khỏe
                              của {getName()}</div>
                          <div className="note">Bạn có thể lấy mã bằng cách liên hệ {getName()} hoặc gọi
                              đến <span
                            className="hot-line">Hotline iCareBase 19003051</span></div>
                          <div className="input-control-wrapper">
                            <Input placeholder="Nhập mã xác thực" className="input-control"
                              value={verifyCode}
                              onChange={(e) => setVerifyCode(e.target.value)}
                              onKeyPress={handleEnter}/>
                            <Button type="primary" shape="round" icon={<DownloadOutlined/>} size='large'
                              className="input-control-button" onClick={sendVerifyCode}>
                                Gửi xác thực
                            </Button>
                          </div>
                        </div>
                      )
                    }
                  </Card>
                </Col>
              </Row>
          ): (
              <>
                <Button onClick={handleBackToProfile} className="view-file-back-button">Trở về</Button>
                <Row className="scan-medical-view-files">
                  {
                    map(isViewFile.currentViewFiles, (file) =>(
                      <Col xl={4} lg={4} md={4} sm={12} xs={12} key={file.id}>
                        <div className={`file-item ${!checkIsImage(file.url)}`} onClick={() => window.open(file.url)}>
                          {
                            checkIsImage(file.url)? (
                                <img src={file.url} alt='file' />
                            ): (
                                <span><FilePdfOutlined className='icon-file' /></span>
                            )
                          }
                          <div className='created-date'>{moment(file.created_at).format('DD/MM/YYYY')}</div>
                        </div>
                      </Col>
                    ))
                  }
                </Row>
              </>
          )
        }
      </div>
    </>
  );
}
