import React from 'react';
import './public.scss';
import {Layout} from 'antd';

const PublicLayout = (props) => {
  return <Layout className="public-layout-container">{props.children}</Layout>;
};

export default PublicLayout;
