import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FIND_OTHER_REQUEST, UNFOLLOW_REQUEST } from '../../reducers/user';
import FollowUserView from '../followUserView/followUserView';
import styles from './followingList.module.css';

const FollowingList = ({ data, id}) => {

    const dispatch = useDispatch();
    const [userView, setUserView] = useState(false);

    const OnUnFollow = () =>{
        dispatch({
            type : UNFOLLOW_REQUEST,
            data : data.id,
        })
    }

    const onNickClick = useCallback(()=>{
        dispatch({
            type : FIND_OTHER_REQUEST,
            data : data.id
        });
        setUserView(true);
    },[data]);

    return (
        <div className = {styles.list}>
            <img src = {data.userImg ? data.userImg : '/profileImg.png'} className  = {styles.profileImg}></img>
            <div className = {styles.nickname} onClick ={onNickClick}>{data.nickname}</div>
            <img src = '/unfollowBtn.png' className = {styles.removeBtn} onClick={OnUnFollow}></img>
            { userView && <FollowUserView setUserView = {setUserView}/>}
        </div>
    );
};

export default FollowingList;