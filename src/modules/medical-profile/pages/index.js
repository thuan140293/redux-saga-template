import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import ListMedicalProfile from './ListMedicalProfile';
import DetailMedicalProfile from './DetailMedicalProfile';
import * as qs from 'query-string';
import './styles.scss';


const MedicalProfile = ({
  location,
  history
}) => {
  const [idMedicalProfile, setIdMedicalProfile] = useState(null);

  useEffect(() => {
    const queryParams = qs.parse(location.search);
    if(get(queryParams, 'detail')){
      setIdMedicalProfile(queryParams.detail);
      return;
    }
    setIdMedicalProfile('');
  }, [location.search]);

  return (
    <>
      {idMedicalProfile === '' && <ListMedicalProfile history={history} />}
      {idMedicalProfile && <DetailMedicalProfile history={history} idDetail={idMedicalProfile} />}
    </>
  )
}

export default MedicalProfile;
