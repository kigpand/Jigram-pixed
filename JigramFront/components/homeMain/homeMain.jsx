import React, { useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_POSTS_REQUEST} from '../../reducers/post';
import ContentList from '../contentList/contentList';
import styles from './homeMain.module.css';

const HomeMain = () => {
    
    const { posts, hasMorePosts, loadPostLoading } = useSelector((state) => state.post);

    const dispatch = useDispatch();

    useEffect(()=>{
        function onScroll(){
            if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300){
                if(hasMorePosts && !loadPostLoading){
                    const lastId = posts[posts.length - 1] && posts[posts.length - 1].id;
                    dispatch({
                        type : LOAD_POSTS_REQUEST,
                        lastId,
                    });
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return()=>{
            window.removeEventListener('scroll', onScroll);
        }
    },[hasMorePosts, posts, loadPostLoading]);

    return (
        <div className = {styles.homeMain}>
            <div className={styles.contents}>
                {posts.map((post,i) => (
                    <ContentList key={i} post={post} />
                ))}
            </div>
          </div>
    );
};

export default HomeMain;