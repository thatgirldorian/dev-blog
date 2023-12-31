// @ts-nocheck

import React from 'react';
import TimeAgo from 'timeago-react';
import { BlogComment } from '../contexts/BlogTypes';

interface CommentSidebarProps {
  comment: BlogComment;
  onClick: (comment: BlogComment, start: number, end: number) => void;
  isSelected: boolean;
  start: number;
  end: number;
}

const CommentSidebar: React.FC<CommentSidebarProps> = ({
  comment,
  onClick,
  isSelected,
  start,
  end,
}) => {
  const handleCommentClick = (event) => {
    // Prevent the event from propagating to the parent elements
    event.stopPropagation();

    onClick(comment, start, end);
  };

  return (
    <div
      className={`comment-sidebar ${isSelected ? 'selected' : ''}`}
      onClick={handleCommentClick}
    >
      <div className='flex gap-4'>
        <p className='comment-author'>{comment?.author}</p>
        <p className='comment-time'>
          <TimeAgo datetime={comment?.date} />
        </p>
      </div>
      <p className='comment-content'>{comment?.content}</p>
    </div>
  );
};

export default CommentSidebar;
