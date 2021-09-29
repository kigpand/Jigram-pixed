import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import FollowContaier from '../components/followContainer/followContaier';
import Header from '../components/header/header';
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, LOAD_USER_REQUEST } from '../reducers/user';
import axios from 'axios';
import { END } from 'redux-saga';
import wrapper from '../store/configure';

const Follows = () => {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({
            type : LOAD_FOLLOWERS_REQUEST,
        });
        dispatch({
            type : LOAD_FOLLOWINGS_REQUEST,
        });
    }, []);

    return (
        <div>
            <Header flag={false}/>
            <FollowContaier />
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
    context.store.dispatch(END);
    await context. store.sagaTask.toPromise();
});

export default Follows;