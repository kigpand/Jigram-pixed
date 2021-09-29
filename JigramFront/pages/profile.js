import Header from '../components/header/header'
import ProfileMain from '../components/profileMain/profileMain'
import axios from 'axios';
import { LOAD_USER_REQUEST } from '../reducers/user';
import { END } from '@redux-saga/core';
import wrapper from '../store/configure';

const Profile = () =>{
    return(
        <div>
            <Header flag={false}/>
            <ProfileMain />
        </div>
    );
}

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

export default Profile;