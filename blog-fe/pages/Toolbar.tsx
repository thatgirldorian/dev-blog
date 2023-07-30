import React, { useState } from 'react';
import CommentDialog from './CommentDialog';

const Toolbar = ({
  postId,
  onSubmit,
  onClose,
  handleAddComment,
  start,
  end,
}) => {
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [comment, setComment] = useState('');

  const openDialog = () => {
    setShowCommentDialog(true);
  };

  const handleSubmit = () => {
    // Call the onSubmit callback prop with the comment as an argument
    onSubmit(comment);

    // Clear the comment input after submission
    setComment('');

    //close the toolbar afterwards
    setShowCommentDialog(false);
  };

  const handleAddCommentClick = () => {
    setShowCommentDialog(true);
  };

  return (
    <div className='toolbar bg-white rounded border border-gray-200 shadow-md mx-4'>
      <button className='px-3 py-2 border-r border-gray-200'>Save</button>
      <button className='px-3 py-2 border-r border-gray-200'>
        Save as Draft
      </button>
      <button className='px-3 py-2 border-r border-gray-200'>
        Toggle Preview
      </button>
      <button
        onClick={() => handleAddComment(comment, start, end)} // Call the handleAddCommentClick function
        className='px-3 py-2 border-r border-gray-200'
      >
        Add Comment
      </button>
      {showCommentDialog && (
        <CommentDialog
          postId={postId}
          onSubmit={handleSubmit}
          onClose={() => setShowCommentDialog(false)}
          start={start}
          end={end}
        />
      )}
    </div>
  );
};

export default Toolbar;
