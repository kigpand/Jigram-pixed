import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './profileMain.module.css';
import Router from 'next/router';
import { CHANGE_INFO_REQUEST, PROFILE_USER_IMAGE } from '../../reducers/user';
import { UPLOAD_MYIMG_REQUEST } from '../../reducers/user';

const ProfileMain = () => {

    const imgRef = useRef();
    const { me, myImgPath } = useSelector((state)=>(state.user));
    const profile = {...me};
    const dispatch = useDispatch();


    useEffect(()=>{
        dispatch({
            type : PROFILE_USER_IMAGE,
        })
    },[me]);

    const onClickImageUpload = useCallback(()=>{
        imgRef.current.click();
    },[imgRef]);

    const changeImages = useCallback((e)=>{

        const img = e.target.files[0];
        const imageFormData = new FormData();
        imageFormData.append('image', img);

        dispatch({
            type : UPLOAD_MYIMG_REQUEST,
            data : imageFormData,
        });
    },[me]);

    const onNickChange = (e) =>{
        profile.nickname = e.target.value;
    }

    const onEmailChange = (e) =>{
        profile.email = e.target.value;
    }

    const onPhoneChange = (e) =>{
        profile.phone = e.target.value;
    }

    const onIntroChange = (e) =>{
        profile.intro = e.target.value;
    }

    const onSubmit = () =>{
        profile.userImg = myImgPath;
        dispatch({
            type: CHANGE_INFO_REQUEST,
            data : profile
        })
        Router.push('/');
    }

    return (
        <div className = {styles.profileMain}>
            <div className = {styles.freeView}>
                <div className = {styles.viewNick}>{me.nickname}</div>
                <img src = { myImgPath ? `${myImgPath}` : "/profileImg.png"} className = {styles.viewImg}/>
                <div className = {styles.viewEmail}><label>이메일 : </label>{me.email}</div>
                <div className = {styles.viewPhone}><label>전화 번호 : </label>{me.phone}</div>
            </div>
            <div className = {styles.profile}>
                <div className = {styles.imgText}>
                    <div clasName = {styles.imgProfile}>
                        <img src = { myImgPath ? `${myImgPath}` : "/profileImg.png"} className = {styles.profileImage} onClick = {onClickImageUpload}></img>
                        <input type = "file" name='image' hidden ref={imgRef} onChange={changeImages}/>
                    </div>
                    <div className = {styles.texts}>
                        <div className = {styles.idContainer}>
                            <label className = {styles.idLabel}>아이디</label>
                            <input type = "text" className = {styles.id} value={me.userid} disabled></input>
                        </div>
                        <div className = {styles.nicknameContainer}>
                            <div className = {styles.nicknameLabel}>닉네임</div>
                            <input type = "text" className = {styles.nickname} defaultValue={me.nickname} onChange={onNickChange}></input>
                        </div>
                        <div className = {styles.emailContainer}>
                            <label className = {styles.emailLabel}>이메일</label>
                            <input type = "text" className = {styles.email} defaultValue={me.email} onChange={onEmailChange}></input>
                        </div>
                        <div className = {styles.phoneContainer}>
                            <label className ={styles.phoneLabel}>전화 번호</label>
                            <input type = "text" className = {styles.phone} defaultValue={me.phone} onChange = {onPhoneChange}></input>
                        </div>
                    </div>
                </div>
                <div className = {styles.introContainer}>
                    <label className = {styles.introLabel}>소개</label>
                    <textarea className = {styles.intro} cols ={10} rows ={10} defaultValue={me.intro} onChange ={onIntroChange}></textarea>
                </div>
                <button className = {styles.editBtn} onClick = {onSubmit}>편집</button>
        </div>
    </div>
    );
};

export default ProfileMain;