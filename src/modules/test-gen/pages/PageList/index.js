import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Modal } from 'antd';
import { ROUTE } from 'commons/constants';
import { TestGenItem, BeneficiaryInfo } from '../../components';
import * as actions from '../../redux/actions';
import './style.scss';
import { injectIntl } from 'react-intl';

const PageList = ({ history, intl}) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);
  const [showModalAddToCart, setShowModalAddToCart] = useState(false);
  const [packageSelected, setPackageSelected] = useState({});

  const data = useSelector((state) => state.testGen.testGenList);

  useEffect(() => {
    dispatch(actions.getListTestGen());
    dispatch(actions.getGeneralKeyList({ type: 'relationship' }, 'listRelation'));
  }, [dispatch]);

  const onGetListCity = payload => {
    dispatch(actions.getListCity(payload));
  }

  const handleReadMore = (id) => {
    history.push(`${ROUTE.TEST_GEN}/${id}`);
  };

  const onShowModalAddToCart = detail => {
    setPackageSelected(detail);
    setShowModalAddToCart(true);
  };

  const onCloseModalAddToCart = () => {
    setShowModalAddToCart(false);
    setPackageSelected({});
  }

  const handleData = (data) => {
    let result = null;
    if (data) {
      result = data.map((item, index) => (
        <Col key={index} xl={6} lg={12} md={12} xs={24}>
          <TestGenItem
            handleReadMore={handleReadMore}
            detail={item}
            showModalAddToCart={onShowModalAddToCart}
            history={history}
          />
        </Col>
      ));
    }
    return result;
  };

  return (
    <Row gutter={[16, 16]}>
      {handleData(data)}
      <Modal
        visible={showModalAddToCart}
        onCancel={onCloseModalAddToCart}
        title={intl.formatMessage({ id: 'testGen.pageList.title' })}
        footer={null}
        width={600}
      >
        {showModalAddToCart &&
          <BeneficiaryInfo
            packageData={packageSelected}
            onShowModalAddToCart={onShowModalAddToCart}
            onGetListCity={onGetListCity}
            userInfo={userInfo}
          />
        }
      </Modal>
    </Row>
  );
};

export default injectIntl(PageList);
