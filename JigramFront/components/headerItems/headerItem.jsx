import React from 'react';
import styles from './headerItems.module.css';
import Router from 'next/router';
import { CLOSE_VIEW_POST, IMAGE_PATHS_RESET } from '../../reducers/post';
import { useDispatch} from 'react-redux';
import { logoutRequestAction } from '../../reducers/user';

const HeaderItems = ({flag}) => {

    const dispatch = useDispatch();

    const homeBtn = () =>{
        Router.push('/');
        dispatch({
            type: IMAGE_PATHS_RESET
        });
        dispatch({
            type: CLOSE_VIEW_POST
        });
    }

    const profileBtn = () =>{
        dispatch({
            type: IMAGE_PATHS_RESET
        });
        Router.push('/profile');
    }

    const followBtn = () =>{
        dispatch({
            type: IMAGE_PATHS_RESET
        });
        Router.push('/follows');
    }

    const contentBtn = () =>{
       
        dispatch({
            type: IMAGE_PATHS_RESET
        });
        Router.push('/makecontent');
    }

    const logoutBtn = () =>{
        dispatch({
            type: IMAGE_PATHS_RESET
        });
        dispatch(logoutRequestAction());
    }

    return (
        <div className = {styles.headerItems}>
            <img src = '/friendBtn.png' className = {styles.friendBtn} onClick={followBtn}></img>
            <img src = '/contentBtn.png' className = {styles.contentBtn} onClick={contentBtn}></img>
            <img src = '/profileBtn.png' className = {styles.profileBtn} onClick={profileBtn}></img>
            { !flag ? <img src = '/homeBtn.png' className ={styles.homeBtn} onClick={homeBtn}></img>
             : <img src = "/logout.png" className = {styles.logOutBtn} onClick = {logoutBtn}></img>}
        </div>
    );
};

export default HeaderItems;