import axios from 'axios';
import { all, call, fork, throttle, put, takeLatest} from 'redux-saga/effects';

import {
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_SUCCESS,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  LOAD_HASHTAG_REQUEST,
  LOAD_HASHTAG_SUCCESS,
  LOAD_HASHTAG_FAILURE,
} from '../reducers/post';

function loadPostsAPI(lastId){
  return axios.get(`/posts?lastId=${lastId || 0}`);
}

function* loadPosts(action) {
    try {
      const result = yield call(loadPostsAPI, action.lastId);
      yield put({
        type: LOAD_POSTS_SUCCESS,
        data: result.data,
      });
    } catch (err) {
      console.error(err);
      yield put({
        type: LOAD_POSTS_FAILURE,
        data: err.response.data,
      });
    }
}

function addPostAPI(data){
  return axios.post('/post', data);
}

function* addPost(action){
  try{
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data : result.data,
    });
  }catch(err){
    console.error(err);
    yield put({
      type : ADD_POST_FAILURE,
      data : err.response.data,
    })
  }
}

function addCommentAPI(data){
  return axios.post(`/post/${data.postid}/comment`, data);
}

function* addComment(action){
  try{
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  }catch(err){
    console.error(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      data : err.response.data,
    })
  }
}

function removePostAPI(data){
  return axios.delete(`/post/${data}`);
}

function* removePost(action){
  try{
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data : result.data,
    });
  }catch(err){
    console.error(err);
    yield put({
      type : REMOVE_POST_FAILURE,
      data : err.response.data,
    })
  }
}

function uploadImagesAPI(data){
    return axios.post('/post/images', data);
}

function* uploadImages(action){
  try{
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data : result.data,
    });
  }catch(err){
    console.error(err);
    yield put({
      type : UPLOAD_IMAGES_FAILURE,
      data : err.response.data,
    });
  }
}

function loadHashAPI(data){
  return axios.get(`/hashtag/${data}`);
}

function* loadHash(action){
  try {
    const result = yield call(loadHashAPI, action.data);
    yield put({
      type: LOAD_HASHTAG_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_HASHTAG_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchLoadPosts() {
    yield throttle(3000, LOAD_POSTS_REQUEST, loadPosts);
  }


function* watchAddPost(){
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddCommnet(){
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchDeletePost(){
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchUploadImages(){
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function* watchLoadHashtag(){
  yield throttle(3000, LOAD_HASHTAG_REQUEST, loadHash);
}

export default function* postSaga() {
    yield all([
        fork(watchLoadPosts),
        fork(watchAddPost),
        fork(watchAddCommnet),
        fork(watchDeletePost),
        fork(watchUploadImages),
        fork(watchLoadHashtag),
    ]);
}