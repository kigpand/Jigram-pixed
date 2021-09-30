import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FIND_OTHER_REQUEST } from '../../reducers/user';
import FollowUserView from '../followUserView/followUserView';
import styles from './followerList.module.css';

const FollowerList = ({ data, id}) => {

    const dispatch = useDispatch();
    const [userView, setUserView] = useState(false);

    const onNickClick = useCallback(()=>{
        dispatch({
            type : FIND_OTHER_REQUEST,
            data : data.id
        });
        setUserView(true);
    },[data]);
    
    return (
        <div className = {styles.list}>
            <img src = {data.userImg ? `/${data.userImg}` : '/profileImg.png'} className  = {styles.profileImg}></img>
            <div className = {styles.nickname} onClick ={onNickClick}>{data.nickname}</div>
            { userView && <FollowUserView setUserView = {setUserView}/>}
        </div>
    );
};

export default FollowerList;