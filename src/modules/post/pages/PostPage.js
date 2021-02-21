import React, {useEffect} from 'react';
import PostCategory from './PostCategory';
import {Col, Row} from 'antd';
import './index.scss';
import Post from './Post';
import PostFavorite from './PostFavorite';
import {useDispatch, useSelector} from 'react-redux';
import {getMostLikePosts, getPost, getPostCategory, getPosts, getRelatedPosts} from '../redux/actions';
import {isEmpty, map} from 'lodash';
import {isLogin} from '../../../App';
import {ROUTE} from '../../../commons/constants';
import MetaTags from 'react-meta-tags';
import logo from '../../../assets/images/logo/logoApp.png';

export default function PostPage({history, match}) {
  const {posts, categories, post, relatedPosts, mostLikePosts} = useSelector((state) =>({
    posts: state.post.posts,
    categories: state.post.categories,
    post: state.post.post,
    relatedPosts: state.post.relatedPosts,
    mostLikePosts: state.post.mostLikePosts,
  }));

  const {data: postsData} = posts;
  const {data: postData} = post;
  const {data: relatedPostsData} = relatedPosts;
  const {data: mostLikePostsData} = mostLikePosts;

  const dispatch = useDispatch();

  const isLoggedIn = isLogin();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getPostCategory());
      if (match.params.id) {
        dispatch(getPost({id: match.params.id}));
      } else {
        dispatch(getPosts({}));
        dispatch(getRelatedPosts({sort: 'view'}));
        dispatch(getMostLikePosts({sort: 'like'}));
      }
    } else {
      if (match.params.id) {
        dispatch(getPost({id: match.params.id}));
      } else {
        history.push(ROUTE.LOGIN);
      }
    }
  }, [dispatch, isLoggedIn, match.params.id, history]);

  return (
    <>
      <div className="post-container">
        {
          isEmpty(post) && (
            <MetaTags>
              <title>iCareBase</title>
              <meta name="description" content='iCareBase' />
              <meta property="og:title" content='iCareBase' />
              <meta property="og:image" content={logo} />
            </MetaTags>
          )
        }
        <div className="post-header">
          <div className="post-header-wrapper">
            <div className="logo"></div>
            <div className="menu">
              <ul>
                <li><a href="">Trang chủ</a></li>
                <li><a href="">Về iCareBase</a></li>
                <li><a href="">Chăm Sóc Sức Khỏe Chủ Động</a></li>
                <li><a href="">Liên hệ</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="post-body">
          <div className="post-body-wrapper">
            <Row>
              <Col xl={5} lg={5} xxl={5} md={5} xm={24} sm={24}>
                {isLoggedIn && (
                  <PostCategory
                    categories={categories}
                  />
                )}
              </Col>
              <Col xl={14} lg={14} xxl={14} md={14} xm={24} sm={24}>
                {postsData && !match.params.id && map(postsData, (item) =>
                  <Post key={item.id} {...{...item, history, postsData}}/>,
                )}

                {post && match.params.id && (
                  <Post {...{...postData, history, postsData}}/>
                )}
              </Col>
              <Col xl={5} lg={5} xxl={5} md={5} xm={24} sm={24}>
                {isLoggedIn && (
                  <>
                    <PostFavorite title="Bạn cũng sẽ quan tâm" data={relatedPostsData} history={history} dispatch={dispatch}/>
                    <PostFavorite title="Top yêu thích nhất" data={mostLikePostsData} history={history} dispatch={dispatch}/>
                  </>
                )}
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}
