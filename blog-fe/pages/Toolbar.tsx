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

  const [commentContent, setCommentContent] = useState(''); // State to store the comment content
  const [authorName, setAuthorName] = useState(''); // State to store the author name

  const openDialog = () => {
    setShowCommentDialog(true);
  };

  const handleSubmit = () => {
    // Call the handleAddComment function with the correct arguments
    handleAddComment(commentContent, authorName, start, end);
    // Call the onSubmit callback prop with the comment as an argument
    // onSubmit(commentContent, authorName);

    // Clear the comment input after submission
    setCommentContent('');
    setAuthorName('');
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
        onClick={() => handleAddCommentClick()} // Call the handleAddCommentClick function
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
