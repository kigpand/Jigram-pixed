import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_HASHTAG_REQUEST } from '../../reducers/post';
import ContentList from '../contentList/contentList';
import styles from './tagView.module.css';

const TagView = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const { hashposts } = useSelector((state) => state.post);
    useEffect(()=>{
        dispatch({
            type : LOAD_HASHTAG_REQUEST,
            data : router.query.id,
        });
    },[router]);

    return (
        <div className = {styles.tagView}>
            <div className = {styles.title}>#{router.query.id} 검색결과</div>
            <div className = {styles.list}>
                {hashposts.map((post,i) => (
                    <ContentList key={i} post={post} />
                ))}
            </div>
        </div>
    );
};

export default TagView;