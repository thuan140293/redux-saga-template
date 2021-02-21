import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "antd";
import Tree from 'react-d3-tree';
import { ReactComponent as NodeShape } from 'assets/images/tree/ICON _JSB_SCAN_11.svg';
import { ReactComponent as NodeRootShape } from 'assets/images/tree/ICON_JSB_SCAN_12.svg';
import { getReferral } from "../../redux/actions";
import NodeLabel from './NodeLabel'

import "./styles.scss";

const CanvasTree = ({ }) => {
  const treeContainer = useRef(null);
  const [translate, setTranslate] = useState({})

  const { listRef } = useSelector((state) => ({
    listRef: state.referral.listRef
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReferral());
  }, [dispatch]);

  const listToTree = (list) => {
    var map = {},
      node,
      roots = [],
      i;

    for (i = 0; i < list.length; i += 1) {
      map[list[i].id] = i; // initialize the map
      list[i].children = []; // initialize the children
      list[i].name = list[i].full_name;
    }

    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parent !== 0 && map[node.parent]) {
        // if you have dangling branches check that map[node.parentId] exists
        list[map[node.parent]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  };
  
  const treeDataRender = listToTree(listRef)
  const rootNode = treeDataRender[0] || {full_name : '',children: []};
  const children = rootNode.children || [];

  const myTreeData = [
    {
      name: rootNode.full_name,
      nodeSvgShape: {
        shape: NodeRootShape,
        shapeProps: {
          width: 100,
          height: 100,
          x: -50,
          y: -50,
        },
      },
      children
    },
  ];
  
  const d = 60;
  const svgSquare = {
    shape: NodeShape,
    shapeProps: {
      width: d,
      height: d,
      x: d * -0.5,
      y: d * -0.5,
    }
  }

  useLayoutEffect(() => {
    const dimensions = treeContainer.current.getBoundingClientRect();
    if(dimensions) {
      setTranslate({
        x: dimensions.width / 2,
        y: 100
      })
    }
  }, [treeContainer])

  return (
    <section className="your-refs">
      <Row gutter={30}>
          <Col xl={24} lg={24} md={24} xs={24} sm={24}>
            <div className="tree-container your-refs-tree" ref={treeContainer}>
              <Tree 
                allowForeignObjects 
                orientation={'vertical'} 
                data={myTreeData} 
                translate={translate}
                nodeSvgShape={svgSquare}
                nodeLabelComponent={{
                  render: <NodeLabel className='custom-node-label' />,
                  foreignObjectWrapper: {
                    className: 'foreign-object-wrapper',
                    x: -40,
                    y: -40,
                    width: 80,
                    height: 80
                  }
                }}
                pathFunc={"step"}
              />
            </div>
          </Col>
      </Row>
    </section>
  );
};

export default CanvasTree;
