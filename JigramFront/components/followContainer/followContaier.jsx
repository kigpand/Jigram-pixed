import React from 'react';
import {  useSelector } from 'react-redux';
import FollowerList from '../followerList/followerList';
import FollowingList from '../followingList/followingList';
import styles from './followContainer.module.css';

const FollowContaier = () => {

    const { me } = useSelector((state)=>state.user);

    return (
        <div className = {styles.container}>
            <div className = {styles.list}>
                <div className = {styles.title}>팔로워 리스트</div>
                {me.Followers.map((data) => (
                    <FollowerList data ={data} key={data.id} />
                ))}
            </div>
            <div className = {styles.line}></div>
            <div className = {styles.list}>
                <div className = {styles.title}>팔로잉 리스트</div>
                {me.Followings.map((data)=>(
                    <FollowingList data={data} key={data.id}/>
                ))}
            </div>
        </div>
    );
};

export default FollowContaier;