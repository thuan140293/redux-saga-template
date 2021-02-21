import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Modal } from 'antd';
import { MembershipItem, RegisterMembership } from '../../components';
import * as actions from '../../redux/actions';
import './style.scss';
import { FormattedMessage } from 'react-intl';

const PageList = ({
  history
}) => {
  const dispatch = useDispatch();
  const { membershipPlanList } = useSelector(state => state.membershipPlan);
  const [membershipSelected, setMembershipSelected] = useState(null);
  const [isShowModal, setTsShowModal] = useState(false);

  useEffect(() => {
    dispatch(actions.getListMembershipPlan());
    dispatch(actions.geMyMembership());
    dispatch(actions.masterGetByType({ type: 'pay_method' }));
  }, [dispatch]);

  const showModalAddItem = detail => {
    setMembershipSelected(detail);
    setTsShowModal(true)
  }

  const closeModalAddItem = () => {
    setMembershipSelected(null);
    setTsShowModal(false)
  }

  const handleData = () => {
    let result = null;
    result = membershipPlanList.map((item, index) => (
      <Col key={index} xl={6} lg={12} xxl={6} md={12} xm={24} sm={24}>
        <MembershipItem
          history={history}
          detail={item}
          showModalAddItem={showModalAddItem}
        />
      </Col>
    ));

    return result;
  };

  return (
    <Row gutter={10}>
       <Modal
        title={<FormattedMessage id="membershipPlan.pageList.title"/>}
        visible={isShowModal}
        footer={false}
        onCancel={closeModalAddItem}
        destroyOnClose
        width='80vw'
      >
        <RegisterMembership 
          history={history}
          membership={membershipSelected}
        />
      </Modal>

      {handleData()}
    </Row>
  );
};

export default PageList;
