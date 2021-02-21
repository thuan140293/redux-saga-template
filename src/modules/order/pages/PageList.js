import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Row, Col, Modal} from 'antd';
import * as actions from '../redux/actions';
import './style.scss';
import {pickBy} from 'lodash';
import * as qs from 'query-string';
import {ROUTE} from 'commons/constants';
import {List, BeneficiaryInfo} from '../components';
import { FormattedMessage } from 'react-intl';

const PageList = ({history}) => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    const queryString = qs.stringify(pickBy(search));
    dispatch(actions.getListOrder(queryString));
  }, [dispatch, search]);

  const pageDetail = (id) => {
    history.push(`${ROUTE.ORDER}/${id}`);
  };
  return (
    <>
      <Row className="mt-20">
        <Col className='header-custom' span={24}>
          <h1><FormattedMessage id="order.pageList.header"/></h1>
        </Col>
        <Col span={24}>
          <List search={search} setSearch={setSearch} pageDetail={pageDetail}/>
        </Col>
      </Row>
    </>
  );
};

export default PageList;
