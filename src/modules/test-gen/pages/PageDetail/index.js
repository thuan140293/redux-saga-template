import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col, Card} from 'antd';
import * as actions from '../../redux/actions';
import {get} from 'lodash';
import './style.scss';
import { injectIntl } from 'react-intl';

const PageDetail = ({match,intl}) => {
  const [detail, setDetail] = useState({});
  const paramID = get(match, 'params.id');
  const dispatch = useDispatch();
  const listTestGen = useSelector((state) => state.testGen.testGenList);

  useEffect(() => {
    dispatch(actions.getListTestGen());
  }, [dispatch]);
  useEffect(() => {
    if (listTestGen) {
      setDetail(listTestGen.filter((item) => item.id === parseInt(paramID))[0]);
    }
  }, [listTestGen, setDetail, paramID]);

  function createMarkup(item) {
    return {__html: get(item, 'content')};
  }

  return (
    <Row>
      <Col span={24}>
        <Card title={`${intl.formatMessage({ id: 'testGen.pageDetail.title' })} ${get(detail, 'title')}`}>
          <div className="detail-gen">
            <img
              className="detail-img"
              src={get(detail, 'imageUrl')}
              onError={(e) =>
                (e.target.src = require('assets/images/card-default.png'))
              }
              alt="card"
            />
            <div className="detail-info">
              <h1>{get(detail, 'description')}</h1>
              <p>{`${get(detail, 'price') ? get(detail, 'price').toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : null} ${get(detail, 'currency')} ` } </p>
            </div>
          </div>

          <div dangerouslySetInnerHTML={createMarkup(detail)}></div>
        </Card>
      </Col>
    </Row>
  );
};

export default injectIntl(PageDetail);
