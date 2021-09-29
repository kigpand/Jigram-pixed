import produce from 'immer';
import Router from 'next/router';

const initialState = {
    logInLoading : false,
    logInDone : false,
    logInError : null,

    logOutLoading : false,

    joinDone: false,
    joinLoading : false,
    joinError : null,

    loadUserError : null,

    changeInfoError : null,

    followError : null,
    unfollowError : null,

    loadfollowingsError : null,
    loadfollowersError : null,

    findOtherUser : {},
    findOtherError : null,

    myImgPath : null,
    myImgError : null,

    me : null,
}

export const loginRequestAction = (data) =>{
    return {
        type : LOG_IN_REQUEST,
        data,
    }
}

export const logoutRequestAction = (data) =>{
    return{
        type : LOG_OUT_REQUEST,
        data,
    }
}

const reducer = (state = initialState, action)=>{
    return produce(state,(draft)=>{
        switch(action.type){
            case LOG_IN_REQUEST:
                draft.logInLoading = true;
                draft.logInError = null;
                draft.logInDone = false;
                break;
            case LOG_IN_SUCCESS:
                draft.logInLoading = false;
                draft.logInError = null;
                draft.logInDone = true;
                draft.me = action.data;
                Router.push('/');
                break;
            case LOG_IN_FAILURE:
                draft.logInLoading = false;
                draft.logInError = action.error;
                break;
            case JOIN_REQUEST:
                draft.joinLoading = true;
                draft.joinDone = false;
                draft.joinError = null;
                break;
            case JOIN_SUCCESS:
                draft.joinLoading = false;
                draft.joinDone = true;
                break;
            case LOG_OUT_REQUEST:
                draft.logOutLoading = true;
                break;
            case LOG_OUT_SUCCESS:
                draft.logOutLoading = false;
                draft.me = null;
                alert("로그아웃되었습니다.");
                Router.push('/');
                break;
            case LOAD_USER_REQUEST:
                draft.loadUserError = null;
                break;
            case LOAD_USER_SUCCESS:
                draft.loadUserError = null;
                draft.me = action.data;
                break;
            case LOAD_USER_FAILURE:
                draft.loadUserError = action.error;
                break;
            case CHANGE_INFO_REQUEST:
                draft.changeInfoError = null;
                break;
            case CHANGE_INFO_SUCCESS:
                draft.changeInfoError = null;
                alert("유저 정보 변경이 완료되었습니다.");
                break;
            case CHANGE_INFO_FAILURE:
                draft.changeInfoError = action.error;
                break;
            case FOLLOW_REQUEST:
                draft.followError = null;
                break;
            case FOLLOW_SUCCESS:
                draft.me.Followings.push({ id : action.data.userid});
                break;
            case FOLLOW_FAILURE:
                draft.followError = action.error;
                break;
            case UNFOLLOW_REQUEST:
                draft.unfollowError = null;
                break;
            case UNFOLLOW_SUCCESS:
                draft.me.Followings = draft.me.Followings.filter((v)=>v.id !==action.data.userid);
                break;
            case UNFOLLOW_FAILURE:
                draft.unfollowError = action.error;
                break;
            case LOAD_FOLLOWINGS_REQUEST:
                draft.loadfollowingsError = null;
                break;
            case LOAD_FOLLOWINGS_SUCCESS:
                draft.loadfollowingsError = null;
                draft.me.Followings = action.data;
                break;
            case LOAD_FOLLOWINGS_FAILURE:
                draft.loadfollowingsError = action.error;
                break;
            case LOAD_FOLLOWERS_REQUEST:
                draft.loadfollowersError = null;
                break;
            case LOAD_FOLLOWERS_SUCCESS:
                draft.loadfollowersError = null;
                draft.me.Followers = action.data;
                break;
            case LOAD_FOLLOWERS_FAILURE:
                draft.loadfollowersError = action.error;
                break;
            case FIND_OTHER_REQUEST:
                draft.findOtherUser = {};
                draft.findOtherError = null;
                break;
            case FIND_OTHER_SUCCESS:
                draft.findOtherUser = action.data;
                draft.findOtherError = null;
                break;
            case FIND_OTHER_FAILURE:
                draft.findOtherError = action.error;
                break;
            case UPLOAD_MYIMG_REQUEST:
                draft.myImgPath = null;
                draft.myImgError = null;
                break;
            case UPLOAD_MYIMG_SUCCESS:
                draft.myImgPath = action.data;
                draft.myImgError = null;
                break;
            case UPLOAD_MYIMG_FAILURE:
                draft.myImgError = action.error;
                break;
            case PROFILE_USER_IMAGE:
                draft.myImgPath = draft.me.userImg;
                break;
        }
    })
}

export default reducer;


export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const JOIN_REQUEST = 'JOIN_REQUEST';
export const JOIN_SUCCESS = 'JOIN_SUCCESS';
export const JOIN_FAILURE = 'JOIN_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const CHANGE_INFO_REQUEST = 'CHANGE_INFO_REQUEST';
export const CHANGE_INFO_SUCCESS = 'CHANGE_INFO_SUCCESS';
export const CHANGE_INFO_FAILURE = 'CHANGE_INFO_FAILURE';

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';

export const FIND_OTHER_REQUEST = 'FIND_OTHER_REQUEST';
export const FIND_OTHER_SUCCESS = 'FIND_OTHER_SUCCESS';
export const FIND_OTHER_FAILURE = 'FIND_OTHER_FAILURE';

export const UPLOAD_MYIMG_REQUEST = 'UPLOAD_MYIMG_REQUEST';
export const UPLOAD_MYIMG_SUCCESS = 'UPLOAD_MYIMG_SUCCESS';
export const UPLOAD_MYIMG_FAILURE = 'UPLOAD_MYIMG_FAILURE';

export const PROFILE_USER_IMAGE = 'PROFILE_USER_IMAGE';