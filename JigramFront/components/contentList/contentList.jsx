import React, { useCallback, useEffect } from 'react';
import styles from './contentList.module.css';
import { useDispatch } from 'react-redux';
import { ON_VIEW_POST } from '../../reducers/post';


const ContentList = ({ post }) => {

    const dispatch = useDispatch();
    
    const onView = useCallback(()=>{
        dispatch({
            type: ON_VIEW_POST,
            data : post,
          });
    },[post]);
    return (
        <div className = {styles.contentList} onClick = {onView}>
            <div className = {styles.card}>
            <img src = {post.Images.length>0 ? `/${post.Images[0].src}` : '/noimg.png'} className = {styles.front}/>
                <div className = {styles.back}>
                    <div><img className = {styles.commentImg} src = "/comment.png" alt ="코멘트"></img>{post.Comments.length}</div>
                </div>
            </div>
        </div>
    );
};

export default ContentList;