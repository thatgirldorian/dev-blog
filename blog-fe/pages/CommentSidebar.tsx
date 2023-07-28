import React from 'react';
import TimeAgo from 'timeago-react';

const CommentSidebar = ({ comment }) => {
  return (
    <div className='comment-sidebar'>
      <p className='comment-author'>{comment.author}</p>
      <p className='comment-time'>
        <TimeAgo datetime={comment.date} />
      </p>
      <p className='comment-content'>{comment.content}</p>
    </div>
  );
};

export default CommentSidebar;
