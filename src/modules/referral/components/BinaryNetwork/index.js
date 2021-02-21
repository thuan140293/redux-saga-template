import React, { useRef } from "react";
import { Row, Col } from "antd";
// import { FormattedMessage } from "react-intl";
import "./styles.scss";
import TreeVanilla from "../TreeVanilla";

const BinaryNetwork = ({ }) => {
  const treeEl = useRef(null);

  return (
    <section className="your-refs">
      <Row gutter={30}>
          <Col xl={24} lg={24} md={24} xs={24} sm={24}>
            <div className="tree-container your-refs-tree" ref={treeEl}>
                <TreeVanilla />
            </div>
          </Col>
      </Row>
    </section>
  );
};

export default BinaryNetwork;
