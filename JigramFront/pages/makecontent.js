import React from 'react';
import CreateContent from '../components/createContent/createContent';
import Header from '../components/header/header';
import wrapper from '../store/configure';
import axios from 'axios';
import { LOAD_USER_REQUEST } from '../reducers/user';
import { END } from 'redux-saga';


const MakeContent = () => {

    return (
        <div>
            <Header flag={false}/>
            <CreateContent />
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

export default MakeContent;