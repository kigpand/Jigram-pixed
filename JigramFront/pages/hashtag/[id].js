import React from 'react';
import Header from '../../components/header/header';
import TagView from '../../components/tagView/tagView';
import Viewer from '../../components/viewer/viewer';
import { LOAD_USER_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configure';
import axios from 'axios';
import { END } from 'redux-saga';
import { useSelector } from 'react-redux';
import { LOAD_POSTS_REQUEST } from '../../reducers/post';

const Tag = () => {

    const { viewPost, viewPostState } = useSelector((state)=>state.post);

    return (
        <div>
            <Header flag={false}/>
            { !viewPostState ? <TagView /> : <Viewer viewPost = {viewPost}/>}
        </div>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context)=>{
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if(context.req && cookie){
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
        type : LOAD_USER_REQUEST,
    });
    context.store.dispatch({
        type: LOAD_POSTS_REQUEST,
    });
    context.store.dispatch(END);
    await context. store.sagaTask.toPromise();
});

export default Tag;