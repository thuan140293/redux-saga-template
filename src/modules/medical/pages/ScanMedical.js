import React, {useEffect, useState} from 'react';
import './index.scss';
import SearchOutlined from '@ant-design/icons/lib/icons/SearchOutlined';
import {get} from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../redux/actions';
import {ROUTE, VERSION} from '../../../commons/constants';

export default function ScanMedical({history}) {
  const medical = useSelector((state) => state.medical);
  const dispatch = useDispatch();

  const [customerCode, setCode] = useState(undefined);
  const [error, setError] = useState(undefined);


  useEffect(() => {
    dispatch(actions.resetMedical());
  }, [dispatch]);

  useEffect(() => {
    if (medical.medicalData && customerCode) {
      const statusCode = get(medical, 'medicalData.status_code');
      if (statusCode === 200) {
        history.push(ROUTE.PUBLIC_PROFILE);
      } else {
        setError('Mã khách hàng không tồn tại, vui lòng kiểm tra lại.');
      }
    }
  }, [medical, customerCode, history]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (customerCode) {
        handleSubmit();
      }
    }
  };

  const handleSubmit = () => {
    if (customerCode) {
      setError(undefined);
      dispatch(actions.getMedical({customerCode}));
    }
  };

  const handleChangeCode = (e) =>{
    setCode(e.target.value)
  }

  return (
    <>
      <div className="scan-medical-container">
        <div className="scan-medical-wrapper">
          <div className="scan-medical-logo">
            <img src={require('assets/images/icarebase-logo-scan-medical.png')} alt="icare-logo"/>
          </div>
          <div className="scan-medical-title">
            <span>Tra cứu mã khách hàng</span>
          </div>
          <div className="scan-medical-input-container">
            <div className="scan-medical-input-wrapper">
              <input type="text" placeholder="Nhập mã khách hàng" className="scan-medical-input"
                onChange={handleChangeCode}
                value={customerCode}
                onKeyPress={handleKeyDown}/>
              <button type="submit" className="scan-medical-input-button" onClick={handleSubmit}><SearchOutlined/></button>
            </div>
          </div>
          {error && (
            <div className="scan-medical-error">{error}</div>
          )}
          <div className="scan-medical-description">
            <span>Mã khách hàng là dãy 16 ký tự in trên thẻ</span>
          </div>
          <div className="scan-medical-description">
            <div>Hotline iCareBase: <a href="tel:19003051">19003051</a></div>
            <div>
              <p>
              <a target="blank" href="https://go.icarebase.com/vn-support">
                Hỗ trợ{" "}
              </a>
              |{" "}
              <a target="blank" href="https://help.icarebase.com">
                {" "}
                Hướng dẫn{" "}
              </a>{" "}
              | Version {VERSION}
            </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
