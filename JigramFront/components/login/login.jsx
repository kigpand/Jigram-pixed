import React, { useEffect } from 'react';
import LoginItems from '../loginItems/loginItems';
import styles from './login.module.css';

const Login = () => {

    useEffect(()=>{

        const BG1 = '/LoginBG/BG1.jpg';
        const BG2 = '/LoginBG/BG2.jpg';
        const BG3 = '/LoginBG/BG3.jpg';

        const randomCount = Math.random();
        const ImgCount = Math.floor( randomCount * 3) + 1;

        const loginImg = document.querySelector("#loginImg");

        switch(ImgCount){
            case 1:
                loginImg.src = BG1;
                break;
            case 2:
                loginImg.src = BG2;
                break;
            case 3:
                loginImg.src = BG3;
                break;
            default:
                return;
        }
    },[]);

    return (
        <div className = {styles.login}>
            <img id="loginImg" className = {styles.loginImg}></img>
            <div className = {styles.loginItems}>
                <LoginItems />
            </div>
        </div>
    );
}; 

export default Login;