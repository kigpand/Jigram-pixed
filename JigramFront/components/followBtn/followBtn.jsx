import styles from './followBtn.module.css';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../../reducers/user';

const FollowBtn = ({ post }) => {

    const { me } = useSelector((state)=>state.user);
    const isFollowing = me.Followings.find((v)=>v.id === post.User.id);
    const dispatch = useDispatch();

    const onFollowBtn = useCallback(()=>{
        if(isFollowing){
            dispatch({
                type : UNFOLLOW_REQUEST,
                data : post.User.id,
            })
        }else{
            dispatch({
                type : FOLLOW_REQUEST,
                data : post.User.id
            })
        }
    }, [isFollowing]);

    return (
        <button className = {styles.follow} onClick = {onFollowBtn}>
            { isFollowing ? '언팔로우' : '팔로우' }
        </button>
    );
};

export default FollowBtn;