import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Widget} from 'commons/components';
import {Radio} from 'antd';
import {CryptoNewsItem} from '../../components';
import * as actions from '../../redux/actions';
import './style.scss';
import {get} from 'lodash';
import { FormattedMessage } from 'react-intl';

const News = () => {
  const dispatch = useDispatch();
  const [news, setNews] = useState(0);
  const postData = useSelector((state) => state.dashboard.postData);

  useEffect(() => {
    switch (news) {
      case 0:
        dispatch(actions.getListPostDashboard());
        break;
      case 1:
        dispatch(actions.getListPostCateDashboard());
        break;
      default:
        break;
    }
  }, [news, dispatch]);

  const handleChange = (e) => {
    const value = e.target.value;
    setNews(value);
  };

  return (
    <Widget styleName="shadow">
      <div className=" wrapper-header-custom">
        <h2 className="title "><FormattedMessage id="dashboard.news.notification"/></h2>
        <div className="item ">
          <Radio.Group
            defaultValue={0}
            onChange={handleChange}
            optionType="button"
            buttonStyle="solid"
          >
            <Radio.Button className="radio-cus" value={0}>
            <FormattedMessage id="dashboard.news.post"/>
            </Radio.Button>
            <Radio.Button className="radio-cus" value={1}>
            <FormattedMessage id="dashboard.news.postCate"/>
            </Radio.Button>
          </Radio.Group>
        </div>
        <div></div>
      </div>
      {(get(postData, 'data') || []).map((item) => (
        <CryptoNewsItem item={item} key={item.id} />
      ))}
    </Widget>
  );
};

export default News;
