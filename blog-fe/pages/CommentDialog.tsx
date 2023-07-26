import React, { useState } from 'react';
import { addComment } from './api/comments';

const CommentDialog = ({ onClose, onSubmit }) => {
  const [commentContent, setCommentContent] = useState('');

  const handleCommentSubmit = async () => {
    try {
      // Prepare the comment data to send in the request
      const commentData = {
        content: commentContent,
        author: 'User', // Replace with the actual author's name or user ID
        date: new Date().toISOString(),
      };

      // Send the HTTP POST request to add the comment
      const newComment = await addComment(postId, commentData);

      // Handle the response, e.g., show a success message or refresh the comments
      console.log('Comment added:', newComment);

      // Reset the commentContent state after submission
      setCommentContent('');

      // Close the comment dialog
      onClose();
    } catch (error) {
      console.error('Error adding comment:', error);
      // Handle the error, e.g., show an error message
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        right: 0,
        transform: 'translateY(-50%)',
        background: '#fff',
        padding: '16px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
      }}
    >
      {/* Add your comment input field and submit button here */}
      <textarea rows={4} placeholder='Enter your comment'></textarea>
      <button onClick={handleCommentSubmit}>Submit</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default CommentDialog;
