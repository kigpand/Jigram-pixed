import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_COMMENT_REQUEST, CLOSE_VIEW_POST, POSTS_RESET, REMOVE_POST_REQUEST } from '../../reducers/post';
import ViewerComments from '../viewerComments/viewerComments';
import styles from './viewer.module.css';
import shortid from 'shortid';
import FollowBtn from '../followBtn/followBtn';
import TagList from '../tagList/tagList';


const Viewer = ({ viewPost }) => {

    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const [comment, setComment] = useState();
    const textarea = useRef();

    const commentText = (e) =>{
        setComment(e.target.value);
    }

    const onCommentSubmit = () =>{
        const data = {
            userid : me.userid,
            comment : comment,
            postid : viewPost.id,
        }
        dispatch({
            type : ADD_COMMENT_REQUEST,
            data : data,
        });

        textarea.current.value = "";
        setComment("");
    }

    const onCloseView = () =>{
        dispatch({
            type : CLOSE_VIEW_POST,
        });
    }

    const onDeletePost = () =>{
        dispatch({
            type : REMOVE_POST_REQUEST,
            data : viewPost.id,
        });
        dispatch({
            type : CLOSE_VIEW_POST
        });
    }
    
    return (
        <div className = {styles.viewPost}>
            <div className = {styles.back} onClick = {onCloseView}></div>
            <div className={styles.front}>
                <img src = {viewPost.Images.length>0 ? `${viewPost.Images[0].src}` : '/noimg.png'} className = {styles.contentImg}/>
                <div className = {styles.contentTexts}>
                    <div className = {styles.title}>
                        <img src = {viewPost.User.userImg ? `${viewPost.User.userImg}` : '/profileImg.png'} className  = {styles.titleImg}></img>
                        <div className = {styles.userNickname}>{viewPost.User.nickname}님의 게시글</div>
                        { me.id === viewPost.User.id ? <button onClick = {onDeletePost}>삭제</button> : <FollowBtn post = {viewPost}/>}
                    </div>
                    <div className = {styles.main}>
                        <div className = {styles.mainTitle}>
                            <img src = {viewPost.User.userImg ? `${viewPost.User.userImg}` : '/profileImg.png'} className  = {styles.titleImg}></img>
                            <div className = {styles.userNickname}>{viewPost.User.nickname}</div>
                        </div>
                        <TagList tag = {viewPost.tag}></TagList>
                        <div className = {styles.userContent}>{viewPost.content}</div>
                    </div>
                    {viewPost.Comments && 
                        <div className = {styles.comments}>
                        {viewPost.Comments.map((data) => (
                            <ViewerComments key={shortid.generate()} comments = {data}/>
                        ))}
                    </div>}
                    <div className = {styles.addComment}>
                        <textarea ref={textarea} className ={styles.addCommentText} onChange={commentText}/>
                        <button className = {styles.addCommentBtn} onClick = {onCommentSubmit}>등록</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Viewer;