import React from 'react';
import { useSelector } from 'react-redux';
import styles from './followUserView.module.css';

const FollowUserView = ({setUserView}) => {

    const { findOtherUser } = useSelector((state)=>state.user);

    const onCloseView = () =>{
        setUserView(false);
    }

    return (
        <div className = {styles.container} onClick = {onCloseView}>
            <div className = {styles.back} />
            { findOtherUser && 
            <div className = {styles.main}>
                <div className = {styles.userInfo}>
                    <img src = {findOtherUser.userImg ? findOtherUser.userImg : "/profileImg.png"} className = {styles.userImg}/>
                    <div className = {styles.texts}>
                        <div className ={styles.info}><label className = {styles.label}>닉네임</label><div className = {styles.text}>{findOtherUser.nickname}</div></div>
                        <div className ={styles.info}><label className = {styles.label}>이메일</label><div className = {styles.text}>{findOtherUser.email}</div></div>
                        <div className ={styles.info}><label className = {styles.label}>전화번호</label><div className = {styles.text}>{findOtherUser.phone}</div></div>
                    </div>
                </div>
                <div className = {styles.intro}>
                    <label className = {styles.label}>소개</label>
                    <div className = {styles.introField}>{findOtherUser.intro}</div>
                </div>
            </div>
            }    
        </div>
    );
};

export default FollowUserView;