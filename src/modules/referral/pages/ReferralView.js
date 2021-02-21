import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useRouteMatch, Switch, Route } from 'react-router-dom';
import { Row, Col } from 'antd';
import { FormattedMessage } from "react-intl";

import { ROUTE } from 'commons/constants';
import { getReferral } from '../redux/actions';
import './index.scss';

import CanvasTree from '../components/CanvasTree'
import BinaryNetwork from '../components/BinaryNetwork'
import YourReferals from '../components/YourReferals'

export default function ReferralView() {
  const { path, url } = useRouteMatch();
  const { listRef } = useSelector((state) => ({
    listRef: state.referral.listRef,
  }));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReferral());
  }, [dispatch]);

  return (
    <section className="management-ref">
        <Row className="user-ref-container" gutter={30}>
            <Col className="user-ref-actions" xl={18} lg={16} md={24} sm={24} xs={24}>
                <img
                  className="logo"
                  src={require("assets/images/JSB_logo.png")}
                  alt="logo"
                />
                <div className="tools">
                  <NavLink to={`${url}${ROUTE.REFERRAL_NETWORK}`} className="btn" activeClassName="btn-rev" >
                      <FormattedMessage id="dashboard.referals.yourReferals" />
                  </NavLink>
                  <NavLink to={`${url}${ROUTE.REFERRAL_BINARY_NETWORK}`} className="btn" activeClassName="btn-rev">
                      <FormattedMessage id="dashboard.referals.yourNetwork" />
                  </NavLink>
                </div>
            </Col>
            <Col className="user-ref-actions" xl={6} lg={8} md={24} sm={24} xs={24}>     
                <div className="unblock">
                    <FormattedMessage id="dashboard.referals.unlimitNetwork" />
                </div>
            </Col>
        </Row>
        <Row gutter={30}>
            <Col xl={24} lg={24} md={24} xs={24} sm={24}>
            <Switch>
              <Route exact path={`${path}${ROUTE.REFERRAL_NETWORK}`}>
                <YourReferals />
              </Route>
              <Route exact path={`${path}${ROUTE.REFERRAL_BINARY_NETWORK}`}>
                <BinaryNetwork />
              </Route>
              <Route exact path={`${path}${ROUTE.REFERRAL_NETWORK}/test`}>
                <CanvasTree />
              </Route>
            </Switch>
            </Col>
        </Row>
    </section>
  );
}
