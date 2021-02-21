import React from 'react';
import {get} from 'lodash';
import medicalHaveFile from '../../../assets/images/medical-file.png';
import medicalNotHaveFile from '../../../assets/images/medical-file-gray.png';

const MedicalFile = ({files}) => {
  const fileCount = files.length;
  return (
    <>
      {fileCount ? (
          <div>
            <span>{`Có ${fileCount} hồ sơ`}</span>
            <img src={medicalHaveFile} className="medical-file" alt="medicalFile"/>
          </div>

      ): (
          <>
            <span>Không có hồ sơ nào</span>
            <img src={medicalNotHaveFile} className="medical-file" alt="medicalFile"/>
          </>
        )
      }
    </>
  );
};

export default function MedicalProfile(props) {
  const {date, hospital, note, files, handleViewFile, is_public } = props;
  const dateInfo = new Date(date);
  let invalid = false;
  if (!(dateInfo instanceof Date && !isNaN(dateInfo.valueOf()))) {
    invalid = true;
  }

  const getDate = () => {
    if (invalid) {
      return '';
    }
    return `${dateInfo.getDate()}/${dateInfo.getMonth() + 1}`;
  };

  const getYear = () => {
    if (invalid) {
      return '';
    }
    return dateInfo.getFullYear();
  };

  const onViewFile = () =>{
    if(files.length){
      handleViewFile(files, true);
    }
  }

  return (
    <div className="hospital-info" style={{cursor: files.length? 'pointer': null}} onClick={onViewFile}>
      <div className="hospital-info-header">
        <div className="date">
          <div className="date-day">
            {getDate()}
          </div>
          <div className="date-year">
            {getYear()}
          </div>
        </div>
        <div className="detail-wrapper">
          <div className="base">
                        Cơ sở y tế, khám chữa bệnh:
          </div>
          <div className="hospital">
            {get(hospital, 'title', '')}
          </div>
          <div className="detail">
            {note}
          </div>
        </div>
      </div>
      <hr/>
      <div className={is_public ? "hospital-info-detail" : "hospital-info-detail un-public"}>
        <MedicalFile {...{files}} />
      </div>
    </div>
  );
}
