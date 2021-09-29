import React from 'react';
import styles from './tagList.module.css';

const TagList = ({ tag }) => {

    return (
        <div className = {styles.list}>
            {tag.split(/(#[^\s#]+)/g).map((v, i)=>{
                if(v.match(/(#[^\s#]+)/)){
                    return <div key={i} className = {styles.tag}>{v}</div>
                }
            })}
        </div>
    );
};

export default TagList;