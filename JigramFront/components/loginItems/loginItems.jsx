import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './loginItems.module.css';
import Router from 'next/router';
import { loginRequestAction } from '../../reducers/user';

const LoginItems = () => {

    const dispatch = useDispatch();
    const [id, setId] = useState();
    const [pw, setPw] = useState();

    const { logInError } = useSelector((state)=>state.user);
    const onChangeId = (data) =>{
        setId(data.target.value);
    }

    const onChangePw = (data) =>{
        setPw(data.target.value);
    }

    const MoveToJoin = () =>{
        Router.push('/join');
    }

    const onSubmit = () =>{
        dispatch(loginRequestAction({ id, pw }));
    };

    useEffect(()=>{
        if(logInError){
            alert(logInError);
        }
    },[logInError]);

    return (
        <div className = {styles.loginItems}>
            <img src = "/login.png" className = {styles.img} />
            <div className = {styles.title}>Sign in</div>
            <input className = {styles.inputText} type = "text" placeholder = "아이디" onChange = {onChangeId}></input>
            <input className = {styles.inputText} type = "password" placeholder = "비밀번호" onChange = {onChangePw}></input>
            <button className = {styles.loginBtn} onClick={onSubmit}>Sign in</button>
            <div className = {styles.others}>
                <div className = {styles.join} onClick = {MoveToJoin}>회원가입</div>
            </div>
        </div>
    );
};

export default LoginItems;