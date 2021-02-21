import {
  GET_MOST_LIKE_POSTS_SUCCESS,
  GET_POST_CATEGORY_SUCCESS,
  GET_POST_SUCCESS,
  GET_POSTS_SUCCESS, GET_RELATED_POSTS_SUCCESS,

} from './constants';

const initialState = {
  posts: {},
  categories: [],
  post: {},
  relatedPosts: [],
  mostLikePosts: [],
};
export default (state = initialState, action) => {
  const {payload} = action;
  switch (action.type) {
    case GET_POSTS_SUCCESS: {
      return {
        ...state,
        posts: payload,
        post: {},
      };
    }

    case GET_RELATED_POSTS_SUCCESS: {
      return {
        ...state,
        relatedPosts: payload,
      };
    }

    case GET_MOST_LIKE_POSTS_SUCCESS: {
      return {
        ...state,
        mostLikePosts: payload,
      };
    }

    case GET_POST_SUCCESS: {
      return {
        ...state,
        posts: [],
        post: payload,
      };
    }

    case GET_POST_CATEGORY_SUCCESS: {
      return {
        ...state,
        categories: payload,
      };
    }

    default:
      return {...state};
  }
};
