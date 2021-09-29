import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import Home from '../components/home/home';
import Login from '../components/login/login';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_USER_REQUEST } from '../reducers/user';
import wrapper from '../store/configure';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const LoginHome = () => {

    const { me } = useSelector((state)=>state.user);

    return (
        <div>
            { !me ? <Login /> : <Home />}
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

export default LoginHome;