import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListCommissions } from "../../redux/actions";
import { Row, Col, Card } from "antd";
import { pickBy } from "lodash";
import * as qs from "query-string";
import { List, Search, Revenue } from "../../components";
import WalletPage from "modules/dashboard/pages/Wallet";
import { getWallet, getDashboardInfo } from "modules/dashboard/redux/actions";
import Referral from "modules/dashboard/pages/Referals";
import "./style.scss";
import { FormattedMessage } from "react-intl";
const PageList = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState({
    type: "earn",
  });

  const { dashboardInfo } = useSelector((state) => state.dashboard);
  useEffect(() => {
    const queryString = qs.stringify(pickBy(search));
    dispatch(getListCommissions(queryString));
  }, [dispatch, search]);

  useEffect(() => {
    dispatch(getWallet());
    dispatch(getDashboardInfo());
  }, [dispatch]);

  return (
    <div className="main-header">
      <Row gutter={30}>
        <Col xl={12} lg={12} md={12} xs={24} sm={24} className="mb-20">
          <Card className="bg-card">
            <WalletPage />
          </Card>
        </Col>
        <Col xl={7} lg={12} md={12} xs={24} sm={24} className="mb-20">
          <Revenue
            reGetDashboard={() => dispatch(getDashboardInfo())}
            dashboardInfo={dashboardInfo}
          />
        </Col>
        <Col xl={5} lg={12} md={12} xs={24} sm={24} className="mb-20">
          <Referral />
        </Col>
      </Row>
      <Row className="table-header">
        <Col sm={24} xs={24} md={19} lg={19} xl={19}>
          <h1><FormattedMessage id="commissions.pageList.header"/></h1>
        </Col>
        <Col className="" sm={24} xs={24} md={5} lg={5} xl={5}>
          <Search search={search} setSearch={setSearch} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <List />
        </Col>
      </Row>
    </div>
  );
};
export default PageList;
