import React, { useEffect } from "react";
import { get } from 'lodash';
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "antd";
import { getReferral } from "../../redux/actions";

import "./styles.scss";
const userRefIcon = require("assets/images/tree/VI_USDT-02-04.png");
const userRefRootIcon = require("assets/images/tree/JSB_logo_100px.png");

const RenderNode = ({ raw }) => {
  if (!raw) {
    return (
      <></>
    )
  } else if (raw.data.length == 1 && raw.data[0].data.length == 0) {
    const child = raw.data[0];
    return (
      <div className={`hv-item-child ${raw.id ? "active" : ""}`}>
        <div className="hv-item">
          <div className={`hv-item-parent ${get(raw, ['data', 0, 'id'], false) ? "active" : ""}`}>
            <div className="person">
              <Tooltip
                title={`${raw.full_name} ${raw.label ? `| ${raw.label}` : ""}`}
              >
                <img src={userRefIcon} alt="Referals" />
              </Tooltip>
            </div>
          </div>
          <div className={`hv-item-child hidding-test ${child.id ? "active" : ""}`}>
            <div className="person">
              <Tooltip
                title={`${child.full_name} ${child.label ? `| ${child.label}` : ""}`}
              >
                <img src={userRefIcon} alt="Referals" />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    )
  }
  else if (raw.data.length == 0) {
    return (
      <div className={`hv-item-child ${raw.id ? "active" : ""}`}>
        <div className="person">
          <Tooltip
            title={`${raw.full_name} ${raw.label ? `| ${raw.label}` : ""}`}
          >
            <img src={raw.root ? userRefRootIcon : userRefIcon} alt="Referals" />
          </Tooltip>
        </div>
      </div>
    )
  }
  return (
    <div className={`hv-item-child ${raw.id ? "active" : ""}`}>
      <div className="hv-item">
        <div className={`hv-item-parent ${get(raw, ['data', 0, 'id'], false) ? "active" : ""}`}>
          <div className="person">
            <Tooltip
              title={`${raw.full_name} ${raw.label ? `| ${raw.label}` : ""}`}
            >
              <img src={raw.root ? userRefRootIcon : userRefIcon} alt="Referals" />
            </Tooltip>
          </div>
        </div>
        <div className="hv-item-children">
          {raw.data.map((item, index) => (
            <RenderNode key={`node-${index}`} raw={item}></RenderNode>
          ))}
        </div>
      </div>
    </div>
  );
};

const TreeReferals = ({ }) => {
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
      list[i].data = []; // initialize the children
    }

    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parent !== 0 && map[node.parent]) {
        // if you have dangling branches check that map[node.parentId] exists
        list[map[node.parent]].data.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  };
  const renderTree = (listRef) =>{
    console.log(listRef);
    const data = listToTree(listRef)[0] || {}
    data.root = true
    return  <RenderNode raw={data}></RenderNode>
  }
  if(listRef && !listRef.length) return <></>
  return (
    <section className="management-hierarchy">
      <div className="hv-container">
        <div className="hv-wrapper">
          <div className="hv-item">
            {renderTree(listRef)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TreeReferals;
