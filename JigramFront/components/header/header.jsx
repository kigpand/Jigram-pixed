import React, { useCallback, useState } from 'react';
import HeaderItem from '../headerItems/headerItem';
import styles from './header.module.css';
import Router from 'next/router';

const Header = ({flag}) => {

    const [searchValue, setSearchValue] = useState('');

    const onChangeSearch = (e) =>{
        setSearchValue(e.target.value);
    }

    const onSearchSubmit = useCallback((e) =>{
        if(e.key === "Enter"){
            Router.push(`/hashtag/${searchValue}`);
        }
        setSearchValue('');
    },[searchValue]);

    return (
        <div className = {styles.header}>
            <img src = "/logo.png" className= {styles.logo} alt = "로고"/>
            <input className= {styles.text} type="text" placeholder="검색.." onChange = {onChangeSearch} onKeyPress={onSearchSubmit}/>
            <HeaderItem flag={flag}/>
        </div>
    );
};

export default Header;