import {
  GET_MOST_LIKE_POSTS,
  GET_MOST_LIKE_POSTS_SUCCESS,
  GET_POST,
  GET_POST_CATEGORY,
  GET_POST_CATEGORY_SUCCESS,
  GET_POST_SUCCESS,
  GET_POSTS,
  GET_POSTS_SUCCESS,
  GET_RELATED_POSTS,
  GET_RELATED_POSTS_SUCCESS,
} from './constants';


export const getPosts = (data) => {
  return {
    type: GET_POSTS,
    payload: data,
  };
};

export const getPostsSuccess = (data) => {
  return {
    type: GET_POSTS_SUCCESS,
    payload: data,
  };
};

export const getRelatedPosts = (data) => {
  return {
    type: GET_RELATED_POSTS,
    payload: data,
  };
};

export const getRelatedPostsSuccess = (data) => {
  return {
    type: GET_RELATED_POSTS_SUCCESS,
    payload: data,
  };
};


export const getMostLikePosts = (data) => {
  return {
    type: GET_MOST_LIKE_POSTS,
    payload: data,
  };
};

export const getMostLikeSuccess = (data) => {
  return {
    type: GET_MOST_LIKE_POSTS_SUCCESS,
    payload: data,
  };
};


export const getPost = (data) => {
  return {
    type: GET_POST,
    payload: data,
  };
};

export const getPostSuccess = (data) => {
  return {
    type: GET_POST_SUCCESS,
    payload: data,
  };
};


export const getPostCategory = (data) => {
  return {
    type: GET_POST_CATEGORY,
    payload: data,
  };
};

export const getPostCategorySuccess = (data) => {
  return {
    type: GET_POST_CATEGORY_SUCCESS,
    payload: data,
  };
};


