
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_POSTS_REQUEST } from '../../reducers/post';

import Header from '../header/header';
import HomeMain from '../homeMain/homeMain';
import Viewer from '../viewer/viewer';

const Home = () =>{

    const { viewPost, viewPostState } = useSelector((state) => state.post);

    return(
        <div>
            <Header flag = {true}/>
            { !viewPostState ? <HomeMain /> : <Viewer viewPost = {viewPost}/>}
        </div>
    );
}

export default Home;