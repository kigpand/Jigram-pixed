import { all, call, fork, put, takeLatest } from '@redux-saga/core/effects';
import axios from 'axios';
import { 
    LOG_IN_SUCCESS, 
    LOG_IN_FAILURE, 
    LOG_IN_REQUEST,
    JOIN_REQUEST,
    JOIN_SUCCESS,
    JOIN_FAILURE,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE,
    LOG_OUT_REQUEST,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILURE,
    CHANGE_INFO_FAILURE,
    CHANGE_INFO_SUCCESS,
    CHANGE_INFO_REQUEST,
    FOLLOW_REQUEST,
    UNFOLLOW_REQUEST,
    FOLLOW_SUCCESS,
    FOLLOW_FAILURE,
    UNFOLLOW_SUCCESS,
    UNFOLLOW_FAILURE,
    LOAD_FOLLOWERS_REQUEST,
    LOAD_FOLLOWINGS_REQUEST,
    LOAD_FOLLOWERS_SUCCESS,
    LOAD_FOLLOWERS_FAILURE,
    LOAD_FOLLOWINGS_SUCCESS,
    LOAD_FOLLOWINGS_FAILURE,
    FIND_OTHER_REQUEST,
    FIND_OTHER_SUCCESS,
    FIND_OTHER_FAILURE,
    UPLOAD_MYIMG_REQUEST,
    UPLOAD_MYIMG_SUCCESS
} from '../reducers/user';

function logInAPI(data){
    return axios.post('/user/login',data);
}

function* logIn(action){
    try{
        const result = yield call(logInAPI, action.data);
        yield put({
            type: LOG_IN_SUCCESS,
            data: result.data,
        });
    }catch(err){
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data,
        })
    }
}

function profileChangeAPI(data){
    return axios.patch('/user/edit', data);
}

function* profileChange(action){
    try{
        const result = yield call(profileChangeAPI, action.data);
        yield put({
            type : CHANGE_INFO_SUCCESS,
            data: result.data,
        })
    }catch(err){
        console.error(err);
        yield put({
            type: CHANGE_INFO_FAILURE,
            error : err.response.data,
        })
    }
}

function joinAPI(data){
    return axios.post('/user', data);
}

function* join(action){
    try{
        const result = yield call(joinAPI, action.data);
        yield put({
            type: JOIN_SUCCESS,
            data : action.data,
        })
    }catch(err){
        yield put({
            type:JOIN_FAILURE,
            error: err.response.data,
        })
    }
}

function logOutAPI() {
    return axios.post('/user/logout');
}

function* logOut(){
    try{
         yield call(logOutAPI);
        yield put({
            type: LOG_OUT_SUCCESS,
        });
    }catch(err){
        yield put({
            type: LOG_OUT_FAILURE,
            error : err.response.data,
        });
    }
}

function loadUserAPI(data){
    return axios.get('/user');
}

function* loadUser(action){
    try{
        const result = yield call(loadUserAPI, action.data);
        yield put({
            type : LOAD_USER_SUCCESS,
            data : result.data,
        });
    }catch (err){
        yield put({
            type : LOAD_USER_FAILURE,
            error : err.response.data,
        })
    }
}

function followAPI(data){
    return axios.patch(`/user/${data}/follow`);
}

function* follow(action){
    try{
        const result = yield call(followAPI, action.data);
        yield put({
            type : FOLLOW_SUCCESS,
            data : result.data,
        });
    }catch (err){
        yield put({
            type : FOLLOW_FAILURE,
            error : err.response.data,
        })
    }
}

function unfollowAPI(data){
    return axios.delete(`/user/${data}/follow`);
}

function* unfollow(action){
    try{
        const result = yield call(unfollowAPI, action.data);
        yield put({
            type : UNFOLLOW_SUCCESS,
            data : result.data,
        });
    }catch (err){
        yield put({
            type : UNFOLLOW_FAILURE,
            error : err.response.data,
        })
    }
}

function loadFollowersAPI(data){
    return axios.get('/user/followers', data);
}

function* loadFollowers(action){
    try{
        const result = yield call(loadFollowersAPI, action.data);
        yield put({
            type :LOAD_FOLLOWERS_SUCCESS,
            data :result.data,
        });
    }catch(err){
        console.error(err);
        yield put({
            type:LOAD_FOLLOWERS_FAILURE,
            error : err.response.data,
        })
    }
}

function loadFollowingsAPI(data){
    return axios.get('/user/followings',data);
}

function* loadFollowings(action){
    try{
        const result = yield call(loadFollowingsAPI, action.data);
        yield put({
            type :LOAD_FOLLOWINGS_SUCCESS,
            data :result.data,
        });
    }catch(err){
        console.error(err);
        yield put({
            type:LOAD_FOLLOWINGS_FAILURE,
            error : err.response.data,
        })
    }
}

function findOtherAPI(data){
    return axios.post('/user/find', data);
}

function* findOther(action){
    try{
        const result = yield call(findOtherAPI, {userid : action.data});
        yield put({
            type: FIND_OTHER_SUCCESS,
            data: result.data,
        });
    }catch (err){
        yield put({
            type : FIND_OTHER_FAILURE,
            error : err.response.data,
        })
    }
}

function uploadMyImgAPI(data){
    return axios.post('/user/image', data);
}

function* uploadMyImg(action){
    try{
        const result = yield call(uploadMyImgAPI, action.data);
        yield put({
            type : UPLOAD_MYIMG_SUCCESS,
            data : result.data,
        })
    }catch(err){
        console.error(err);
    };
}


function* watchLogIn(){
    yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchChangeProfile(){
    yield takeLatest(CHANGE_INFO_REQUEST, profileChange);
}

function* watchJoin(){
    yield takeLatest(JOIN_REQUEST, join);
}

function* watchLogOut(){
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchLoadUser(){
    yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

function* watchFollow(){
    yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnFollow(){
    yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function* watchLoadFollowers(){
    yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function* watchLoadFollowings(){
    yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

function* watchFindOther(){
    yield takeLatest(FIND_OTHER_REQUEST, findOther);
}

function* watchMyImg(){
    yield takeLatest(UPLOAD_MYIMG_REQUEST, uploadMyImg);
}

export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchChangeProfile),
        fork(watchJoin),
        fork(watchLogOut),
        fork(watchLoadUser),
        fork(watchFollow),
        fork(watchUnFollow),
        fork(watchLoadFollowers),
        fork(watchLoadFollowings),
        fork(watchFindOther),
        fork(watchMyImg),
    ]);
}