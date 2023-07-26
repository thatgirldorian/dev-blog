import React, { useState } from 'react';
import CommentDialog from './CommentDialog';

const Toolbar = ({ postId }) => {
  const [showCommentDialog, setShowCommentDialog] = useState(false);

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
        onClick={handleAddCommentClick} // Call the handleAddCommentClick function
        className='px-3 py-2 border-r border-gray-200'
      >
        Add Comment
      </button>
      {showCommentDialog && (
        <CommentDialog
          postId={postId}
          onSubmit={handleAddCommentClick}
          onClose={() => setShowCommentDialog(false)}
        />
      )}
    </div>
  );
};

export default Toolbar;
