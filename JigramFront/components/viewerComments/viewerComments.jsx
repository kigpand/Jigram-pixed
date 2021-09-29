import React from 'react';
import styles from './viewerComments.module.css';

const ViewerComments = ({ comments }) => {

    return (
         <div className = {styles.viewerComments}>
            {comments && 
            <div>
                <div className = {styles.id}>{comments.User.nickname}</div>
                <div className = {styles.comments}>{comments.content}</div>
            </div>}
        </div>
    );
};

export default ViewerComments;