import produce from 'immer';
import Router from 'next/router';

export const initialState = {
    posts: [],
    loadPostLoading : false,
    loadPostsDone : false,
    loadPostsError : null,
    viewPostState: false,
    viewPost:{},
    hasMorePosts : false,

    addCommentLoading : false,

    removePostError : null,

    uploadImagesLoading : false,
    uploadImagesError : null,
    imagePaths : [],

    hashposts: [],
}

const addComment = (data) =>(
  {
    User: {
      id: data.UserId,
      nickname: data.nickname,
    },
    content: data.content,
  }
);


const reHome = () =>{
  Router.push('/');
}

const reducer = (state = initialState, action) =>produce(state, (draft)=>{
    switch(action.type){
        case LOAD_HASHTAG_REQUEST:
        case LOAD_POSTS_REQUEST:
            draft.loadPostLoading = true;
            draft.loadPostsDone = false;
            draft.loadPostsError = null;
            break;
        case LOAD_HASHTAG_SUCCESS:
            draft.hashposts = action.data;
            break;
        case LOAD_POSTS_SUCCESS:
            draft.loadPostLoading = false;
            draft.loadPostsDone = true;
            draft.posts = draft.posts.concat(action.data);
            draft.hasMorePosts = action.data.length === 9;
            break;
        case LOAD_HASHTAG_FAILURE:
        case LOAD_POSTS_FAILURE:
            draft.loadPostLoading = false;
            draft.loadPostsError = action.error;
            break;
        case ON_VIEW_POST:
            draft.viewPost = action.data;
            draft.viewPostState = true;
            break;
        case CLOSE_VIEW_POST:
            draft.viewPost = null;
            draft.viewPostState = false;
            break;
        case POST_REMOVE:
            draft.posts = [];
            break;
        case ADD_POST_SUCCESS:
            draft.imagePaths = [];
            alert("게시글이 등록되었습니다.");
            reHome();
            break;
        case ADD_COMMENT_REQUEST:
            draft.addCommentLoading = true;
            break;
        case ADD_COMMENT_SUCCESS:
            const post = draft.posts.find((v) => v.id === action.data.PostId);
            post.Comments.unshift(addComment(action.data));
            draft.viewPost = post;
            draft.addCommentLoading = false;
            break;
        case REMOVE_POST_SUCCESS:
            draft.posts = draft.posts.filter((v) => v.id !== action.data.postid);
            break;
        case REMOVE_POST_FAILURE:
            draft.removePostError = action.error;
            break;
        case UPLOAD_IMAGES_REQUEST:
            draft.uploadImagesLoading = true;
            draft.uploadImagesError = null;
            break;
        case UPLOAD_IMAGES_SUCCESS:
            draft.imagePaths = action.data;
            draft.uploadImagesLoading = false;
            draft.uploadImagesError = null;
            alert("이미지가 업로드 되었습니다.");
            break;
        case UPLOAD_IMAGES_FAILURE:
            draft.uploadImagesError = action.error;
            draft.uploadImagesLoading = false;
            break;
        case IMAGE_PATHS_RESET:
            draft.imagePaths = [];
            break;
    }
});

export default reducer;


export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const ON_VIEW_POST = 'ON_VIEW_POST';
export const CLOSE_VIEW_POST = 'CLOSE_VIEW_POST';
export const POST_REMOVE = 'POST_REMOVE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const IMAGE_PATHS_RESET = 'IMAGE_PATHS_RESET';

export const POSTS_RESET = 'POSTS_RESET';

export const LOAD_HASHTAG_REQUEST = 'LOAD_HASHTAG_REQUEST';
export const LOAD_HASHTAG_SUCCESS = 'LOAD_HASHTAG_SUCCESS';
export const LOAD_HASHTAG_FAILURE = 'LOAD_HASHTAG_FAILURE';
