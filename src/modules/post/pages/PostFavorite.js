import React from 'react';
import {Divider} from 'antd';
import {map} from 'lodash';
import {getPost} from '../redux/actions';
import moment from 'moment';
import {ROUTE} from '../../../commons/constants';

function PostFavorite({title, history, dispatch, data={}}) {
  const handleViewDetail = (id) => () =>{
    history.push(`${ROUTE.POST}/${id}`);
    dispatch(getPost(id));
  };

  const createdDate = (data) => {
    return moment(data.created_at).endOf('day').fromNow();
  };
  return (
    <>
      <div className="post-favorite-wrapper">
        <div className="post-favorite-header">{title}</div>
        <Divider className="m-10"/>
        {map(data, (item) =>(
          <div className="post-favorite-item" key={item.id} onClick={handleViewDetail(item.id)}>
            <div className="post-favorite-img">
              <img src={item.image} alt="fav-img"/>
            </div>
            <div className="post-favorite-content">
              <div className="post-favorite-title">
                {item.title}
              </div>
              <div className="post-favorite-time">
                {createdDate(item)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default React.memo(PostFavorite);
