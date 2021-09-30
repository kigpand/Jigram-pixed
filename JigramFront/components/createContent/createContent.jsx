import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './createContent.module.css';
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST } from '../../reducers/post';

const CreateContent = () => {

    const { me } = useSelector((state)=>state.user);
    const { imagePaths } = useSelector((state)=>state.post);
    const dispatch = useDispatch();
    
    const imgRef = useRef();
    const tagRef= useRef();
    const tagPlaceRef= useRef();
    
    const [content,setContent] = useState();
    const [tag, setTag] = useState(false);
    const [tagCount, setTagCount] = useState(0);

    const onChangeContent = (e) =>{
        setContent(e.target.value);
    }


    const OnTagOpen = () =>{
        setTag(true);
        setTagCount(0);
    }

    const OnTagClose = () =>{
        const tagPlace = document.querySelector("#tagPlace");
        tagPlace.innerHTML = "";
        setTag(false);
    }

    const setTagPlace = () =>{
        let count = tagCount;
        if(tagCount >=3){
            return alert("태그는 3개까지만 등록 가능합니다");
        }
        if(tagRef.current.value === ""){
            return alert("공백은 입력할 수 없습니다.");
        }
        const tagPlace = document.querySelector("#tagPlace");
        tagPlace.innerHTML = tagPlace.innerHTML + "#" + tagRef.current.value;
        setTagCount(++count);
        tagRef.current.value = "";
    }

    const onSubmit = useCallback(() =>{

        setTag(false);

        if(!content){
            return alert("내용을 작성해주세요");
        }

        const formData = new FormData();
        imagePaths.forEach((data)=>{
            formData.append('image', data);
        });
        formData.append('content',content);
        formData.append('tag',tagPlaceRef.current.innerHTML);
        return dispatch({
            type : ADD_POST_REQUEST,
            data: formData,
        });
    },[content, imagePaths]);

    const onClickImageUpload = useCallback(()=>{
        imgRef.current.click();
    },[imgRef]);

    const changeImages = useCallback((e)=>{
        const imageFormData = new FormData();
        [].forEach.call(e.target.files,(f)=>{
            imageFormData.append('image', f);
        });

        dispatch({
            type : UPLOAD_IMAGES_REQUEST,
            data : imageFormData,
        });
        setContent("");
    },[]);


    return (
        <div className = {styles.createContent}>                
            <div className = {styles.container}>
                <div className = {styles.userInfo}>
                    <img src={me.userImg ? me.userImg : '/profileImg.png'} className = {styles.img}></img>
                    <div className = {styles.nickname}>{me.nickname}</div>
                </div>
                <div className ={styles.uploadImg}>
                    <input type = "file" name="image" hidden multiple ref={imgRef} onChange={changeImages}/>
                    <button className={styles.uploadBtn} onClick = {onClickImageUpload}>이미지 업로드</button>
                    {imagePaths.map((data) => (
                        <img key={data} src = {data} alt = {data} className={styles.pathImg}/>
                    ))}
                </div>
                <div className = {styles.contentBox}>
                    <textarea className = {styles.content} cols ={20} rows ={20} onChange={onChangeContent}></textarea>
                </div>
                <div className = {styles.tag}>
                    <div>
                        { !tag 
                        ? <button className={styles.tagBtn} onClick = {OnTagOpen}>태그 등록</button> 
                        : <div>
                            <input className = {styles.tagText} type="text" ref={tagRef}></input>
                            <button className={styles.tagSubmit} onClick={setTagPlace}>등록</button>
                            <button className={styles.tagCancle} onClick={OnTagClose}>취소</button>
                        </div>
                        }
                    </div>
                    <div className={styles.tagPlace} id="tagPlace" ref={tagPlaceRef}></div>
                </div>
                <div className = {styles.btns}>
                    <button className = {styles.submitBtn} onClick={onSubmit}>등록</button>
                    <button className = {styles.cancleBtn}>취소</button>
                </div>
            </div>
        </div>
    );
};

export default CreateContent;