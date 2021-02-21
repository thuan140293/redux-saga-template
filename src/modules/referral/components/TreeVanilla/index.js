import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "antd";
import Tree from "react-d3-tree";
import { ReactComponent as NodeShape } from "assets/images/tree/ICON _JSB_SCAN_11.svg";
import { ReactComponent as NodeRootShape } from "assets/images/tree/ICON_JSB_SCAN_12.svg";
import { ReactComponent as NodeWhiteShape } from "assets/images/tree/ICON_JSB SCAN_10.svg";
import { getYourNetwork } from "../../redux/actions";
import NodeLabel from "../CanvasTree/NodeLabel";

import "./styles.scss";

export const mapit = (node = { data: [] }) => {
  if (!node.data || !node.data.length) return { data: [] };
  if (node.data.length > 0) {
    node.data.map((item, i) => {
      let child = node.data[i];
      item.children = child.data;
      item.name = item.full_name ? item.full_name : "Empty";
      item.nodeSvgShape = {
        shape: item.id ? NodeShape : NodeWhiteShape,
        shapeProps: {
          width: 100,
          height: 100,
          x: -50,
          y: -50,
        },
      };
      return mapit(child);
    });
  }
};
const TreeVanilla = ({}) => {
  const treeContainer = useRef(null);
  const [translate, setTranslate] = useState({});

  const { binaryTreeData, auth } = useSelector((state) => ({
    binaryTreeData: state.referral.binaryTreeData || { data: [] },
    auth: state.auth,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    const { userInfo } = auth;
    dispatch(getYourNetwork(userInfo.id));
  }, [auth, dispatch]);

  useEffect(() => {
    if (!binaryTreeData) return;
    mapit(binaryTreeData);
  }, [binaryTreeData]);

  const myTreeData = [
    {
      name: "",
      nodeSvgShape: {
        shape: NodeRootShape,
        shapeProps: {
          width: 100,
          height: 100,
          x: -50,
          y: -50,
        },
      },
      children: binaryTreeData.data,
    },
  ];

  const d = 60;
  const svgSquare = {
    shape: NodeWhiteShape,
    shapeProps: {
      width: d,
      height: d,
      x: d * -0.5,
      y: d * -0.5,
    },
  };
  useLayoutEffect(() => {
    const dimensions = treeContainer.current.getBoundingClientRect();
    if (dimensions) {
      setTranslate({
        x: dimensions.width / 2,
        y: 100,
      });
    }
  }, [treeContainer]);

  return (
    <section className="your-refs binary-tree">
      <Row gutter={30}>
        <Col xl={24} lg={24} md={24} xs={24} sm={24}>
          <div className="tree-container your-refs-tree" ref={treeContainer}>
            <Tree
              allowForeignObjects
              orientation={"vertical"}
              data={myTreeData}
              translate={translate}
              nodeSvgShape={svgSquare}
              nodeLabelComponent={{
                render: <NodeLabel className="custom-node-label" />,
                foreignObjectWrapper: {
                  className: "foreign-object-wrapper",
                  x: -40,
                  y: -40,
                  width: 80,
                  height: 80,
                },
              }}
              pathFunc={"step"}
            />
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default TreeVanilla;
