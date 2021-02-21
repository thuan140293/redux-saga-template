import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../redux/actions';
import {DetailInfo, DetailTotal, BeneficiaryInfo} from '../components';
import {Row, Col, Card, Modal} from 'antd';
import {getListCity, getGeneralKeyList} from 'modules/test-gen/redux/actions';
import {isEmpty, get} from 'lodash';
import { FormattedMessage } from 'react-intl';
const PageDetail = (props) => {
  const paramID = props.match.params.id;
  const data = useSelector((state) => state.order.orderDetail);
  const dispatch = useDispatch();
  const [checkPackage, setCheckPackage] = useState(false);


  const onGetListCity = (payload) => {
    dispatch(getListCity(payload));
  };
  const onGetListRelation = () => {
    dispatch(getGeneralKeyList({type: 'relationship'}, 'listRelation'));
  };
  const [showModalAddToCart, setShowModalAddToCart] = useState(false);
  useEffect(() => {
    dispatch(actions.getDetailOrder(paramID));
  }, [dispatch]);
  useEffect(() => {
    if (get(data, 'order_details[0].type') === 'package') {
      setCheckPackage(true);
    } else {
      setCheckPackage(false);
    }
  }, [data]);
  return (
    <>
      {
        checkPackage && (
          <Modal
            visible={showModalAddToCart}
            onCancel={() => setShowModalAddToCart(false)}
            title={<FormattedMessage id="order.pageDetail.beneficiaryInfo"/>}
            footer={null}
            width={600}
          >
            {showModalAddToCart && (
              <BeneficiaryInfo
                onCloseModal={() => setShowModalAddToCart(false)}
                onGetListCity={onGetListCity}
                onGetListRelation={onGetListRelation}
                userInfo={data ? data.order_details[0] : null}
              />
            )}
          </Modal>
        )
      }

      <Card title={<FormattedMessage id="order.pageDetail.infoItem"/>}>
        <Row>
          <Col xl={16} xxl={16} lg={16} md={16} xs={24} sm={24}>
            <DetailInfo detail={data} setShowModalAddToCart={setShowModalAddToCart} checkPackage={checkPackage} />
          </Col>
          <Col xl={8} xxl={8} lg={8} md={8} xs={24} sm={24}>
            <DetailTotal detail={data} checkPackage={checkPackage} />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default PageDetail;
