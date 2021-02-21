import React from "react";
import { Card, Table } from "antd";

import "./styles.scss";

const ReportTable = ({ title, extra, columns, dataSource, customClass = "", pagination = false, ...tableProps }) => {

  return (
    <div className={`report-content ${customClass}`}>
      <Card className="report-card" title={title} extra={extra}>
        <Table className="report-table" dataSource={dataSource} columns={columns} pagination={pagination} {...tableProps} />
      </Card>
    </div>
  );
};

export default ReportTable;