import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './joinMain.module.css';
import Router from 'next/router';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { JOIN_REQUEST } from '../../reducers/user';
import { backUrl } from '../../config/config';


const JoinMain = () => {

    const idRef = useRef();
    const pwRef = useRef();
    const pwCheckRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();

    const dispatch = useDispatch();
    const [pwFlag,setPwFlag] = useState(true);
    const [idFlag, setIdFlag] = useState(true);

    const { joinLoading, joinDone } = useSelector((state)=>state.user);

    const idCheck = () =>{
        const id = idRef.current.value;
        axios.post(`${backUrl}/user/check`, { data : id})
        .then((data)=>{
            if(data.data){
                alert("사용 가능한 아이디 입니다");
                setIdFlag(true);
            }
            else{
                alert("중복된 아이디입니다.");
                setIdFlag(false);
            }
        })
        .catch((err)=>{
            console.error(err);
        });
    }

    const pwCheck = (e) =>{
        if(pwRef.current.value !== pwCheckRef.current.value){
            setPwFlag(false);
        }
        else{
            setPwFlag(true);
        }
    }

    const onSubmit = ()=>{
        const id = idRef.current.value;
        const pw = pwRef.current.value;
        const email = emailRef.current.value;
        const phone = phoneRef.current.value;

        if(pwFlag && idFlag){
            dispatch({
                type: JOIN_REQUEST,
                data : { id, pw, email, phone },
            })
        }
        else{
            if(!idFlag){
                alert("아이디 중복체크 해주세요");
            }
            else if(!pwFlag){
                alert("비밀번호를 확인해주세요");
            }
            else{
                alert("아이디, 비밀번호를 다시 확인해주세요.");
            }
        }
    }

    const onCancle = () =>{
        Router.push('/');
    }

    useEffect(()=>{
        if(joinDone){
            alert("회원가입이 완료되었습니다.");
            setIdFlag(false);
            Router.push('/');
        }
    },[joinDone]);

    return (
        <div className = {styles.join}>
            <div className = {styles.main}>
                <img src = "/logo.png" alt="로고" className = {styles.logo}></img>
                <div className = {styles.id}>
                    <div className = {styles.idTitle}>아이디</div>
                    <input ref = {idRef} type = "text" className = {styles.idText}></input>
                    <button onClick={idCheck} className = {styles.idCheck}>check</button>
                </div>
                <div className = {styles.pw}>
                    <div className = {styles.pwTitle}>비밀 번호</div>
                    <input ref={pwRef} type = "password" className = {styles.pwText} onChange={pwCheck}></input>
                </div>
                <div className = {styles.pwCheck}>
                    <div className = {styles.pwCheckTitle}>비밀 번호 확인</div>
                    <input ref={pwCheckRef} type = "password" className = {styles.pwCheckText} onChange = {pwCheck}></input>
                </div>
                { !pwFlag && <div className = {styles.pwDif}>비밀 번호가 다릅니다.</div>}
                <div className = {styles.email}>
                    <div className = {styles.emailTitle}>이메일</div>
                    <input ref={emailRef} type = "email" className = {styles.emailText}></input>
                </div>
                <div className = {styles.phone}>
                    <div className = {styles.phoneTitle}>전화 번호</div>
                    <input ref={phoneRef} type = "text" className = {styles.phoneText}></input>
                </div>
                <div className = {styles.btns}>
                    <button className = {styles.joinBtn} onClick={onSubmit}>회원 가입</button>
                    <button className = {styles.cancleBtn} onClick={onCancle}>취소</button>
                </div>
            </div>
        </div>
    );
};

export default JoinMain;