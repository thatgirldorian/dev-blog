import React from 'react';
import TimeAgo from 'timeago-react';

const CommentSidebar = ({ comment, onClick, isSelected, start, end }) => {
  return (
    <div
      className={`comment-sidebar ${isSelected ? 'selected' : ''}`}
      onClick={() => onClick(comment, start, end)}
    >
      <p className='comment-author'>{comment.author}</p>
      <p className='comment-time'>
        <TimeAgo datetime={comment.date} />
      </p>
      <p className='comment-content'>{comment.content}</p>
    </div>
  );
};

export default CommentSidebar;
