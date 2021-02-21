import React from 'react';
import './index.scss';
import HeartFilled from '@ant-design/icons/lib/icons/HeartFilled';
import moment from 'moment';
import {get} from 'lodash';
import {ROUTE} from '../../../commons/constants';
import {useDispatch} from 'react-redux';
import {getPost} from '../redux/actions';
import MetaTags from 'react-meta-tags';

export default function Post({
  image,
  category,
  title,
  is_like,
  created_at,
  like,
  description,
  writer,
  id,
  history,
  // post
  status_code,
  data,
  postsData,
}) {
  const dispatch = useDispatch();

  const createdDate = () => {
    return moment(created_at).endOf('day').fromNow();
  };

  const handleViewDetail = () =>{
    // single view mode
    if (id && postsData) {
      history.push(`${ROUTE.POST}/${id}`);
      dispatch(getPost(id));
    }
  };

  return (
    <>
      <div className="post-wrapper">
        {
          !postsData && (
            <MetaTags>
              <title>{title}</title>
              <meta name="description" content={description} />
              <meta property="og:title" content={title} />
              <meta property="og:image" content={image} />
            </MetaTags>
          )
        }
        {!status_code && (
          <>
            <div className="post-banner" onClick={handleViewDetail}>
              <div className="post-category" style={{backgroundColor: `${get(category, 'color')}`}}>{get(category, 'title')}</div>
              <img src={image} className="post-banner-img" alt="post-banner"/>
            </div>
            <div className="post-content-wrapper">
              <a className="post-title" onClick={handleViewDetail}>
                {title}
              </a>
              <div className="post-time">
                {createdDate()} / by {`${get(writer, 'first_name')} ${get(writer, 'last_name')}`}
              </div>
              <div className="content-preview">
                {description}
              </div>
              <div className="post-like">
                <HeartFilled className={is_like ? 'like': null}/> {like}
              </div>
            </div>
          </>
        )}

        {status_code && (
          <div>
            {data}
          </div>
        )}
      </div>
    </>
  );
}
