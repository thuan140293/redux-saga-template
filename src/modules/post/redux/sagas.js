import {all, call, put, takeLatest} from 'redux-saga/effects';
import {get} from 'lodash';
import {ROOT_API_URL} from '../../../commons/constants';
import {GET_MOST_LIKE_POSTS, GET_POST, GET_POST_CATEGORY, GET_POSTS, GET_RELATED_POSTS} from './constants';
import {
  getMostLikeSuccess,
  getPostCategorySuccess,
  getPostsSuccess,
  getPostSuccess,
  getRelatedPostsSuccess,
} from './actions';
import fetchHelper from '../../../helpers/FetchHelper';

function* getPosts({payload}) {
  try {
    const response = yield call(getPostsFromApi, payload);
    if (response && response.data && response.status === 200) {
      const responseData = get(response, 'data.data', {});
      yield put(getPostsSuccess(responseData));
    }
  } catch (error) {
    // yield put(showMessError(ERROR));
  }
}

function* getRelatedPosts({payload}) {
  try {
    const response = yield call(getRelatedPostsFromApi, payload);
    if (response && response.data && response.status === 200) {
      const responseData = get(response, 'data.data', {});
      yield put(getRelatedPostsSuccess(responseData));
    }
  } catch (error) {
    // yield put(showMessError(ERROR));
  }
}

function* getMostLikePosts({payload}) {
  try {
    const response = yield call(getMostLikePostsFromApi, payload);
    if (response && response.data && response.status === 200) {
      const responseData = get(response, 'data.data', {});
      yield put(getMostLikeSuccess(responseData));
    }
  } catch (error) {
    // yield put(showMessError(ERROR));
  }
}

function* getPost({payload}) {
  try {
    const response = yield call(getPostFromApi, payload.id);
    if (response && response.data && response.status === 200) {
      const responseData = get(response, 'data', {});
      yield put(getPostSuccess(responseData));
    }
  } catch (error) {
    // yield put(showMessError(ERROR));
  }
}

function* getPostCategory() {
  try {
    const response = yield call(getPostCategoryFromApi);
    if (response && response.data && response.status === 200) {
      const responseData = get(response, 'data.data.data', {});
      yield put(getPostCategorySuccess(responseData));
    }
  } catch (error) {
    // yield put(showMessError(ERROR));
  }
}


export default function* root() {
  yield all([
    takeLatest(GET_POSTS, getPosts),
    takeLatest(GET_POST, getPost),
    takeLatest(GET_POST_CATEGORY, getPostCategory),
    takeLatest(GET_RELATED_POSTS, getRelatedPosts),
    takeLatest(GET_MOST_LIKE_POSTS, getMostLikePosts),
  ]);
}

const getPostsFromApi = (payload) => {
  return fetchHelper
      .fetch(`${ROOT_API_URL}/post/list?category_id=${payload.category_id}?sort=new`, {
        method: 'GET',
      })
      .then(([resp, status]) => {
        return {
          data: resp,
          status,
        };
      });
};

const getRelatedPostsFromApi = (payload) => {
  return fetchHelper
      .fetch(`${ROOT_API_URL}/post/list?sort=view`, {
        method: 'GET',
      })
      .then(([resp, status]) => {
        return {
          data: resp,
          status,
        };
      });
};

const getMostLikePostsFromApi = (payload) => {
  return fetchHelper
      .fetch(`${ROOT_API_URL}/post/list?sort=like`, {
        method: 'GET',
      })
      .then(([resp, status]) => {
        return {
          data: resp,
          status,
        };
      });
};

const getPostFromApi = (id) => {
  return fetchHelper
      .fetch(`${ROOT_API_URL}/post/detail?id=${id}`, {
        method: 'GET',
      })
      .then(([resp, status]) => {
        return {
          data: resp,
          status,
        };
      });
};

const getPostCategoryFromApi = (id) => {
  return fetchHelper
      .fetch(`${ROOT_API_URL}/post-cate/list`, {
        method: 'GET',
      })
      .then(([resp, status]) => {
        return {
          data: resp,
          status,
        };
      });
};
