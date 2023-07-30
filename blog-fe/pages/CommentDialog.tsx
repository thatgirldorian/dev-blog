import React, { useState } from 'react';
import axios from 'axios';

const CommentDialog = ({ onClose, postId, onSubmit, start, end }) => {
  const [commentContent, setCommentContent] = useState('');
  const [authorName, setAuthorName] = useState('');

  const handleCommentSubmit = async () => {
    if (!commentContent || !authorName || !start || !end) {
      console.error('Comment data is incomplete');
      return;
    }

    try {
      // Prepare the comment data to send in the request
      const commentData = {
        postId: postId,
        content: commentContent,
        author: authorName,
        date: new Date().toISOString(),
        start: start,
        end: end,
      };

      // Send the HTTP POST request to the backend API
      const response = await axios.post(
        `http://localhost:5001/api/posts/${postId}/comments`,
        commentData
      );

      // Handle the response, e.g., show a success message or refresh the comments
      console.log('Comment added:', response.data);

      // Reset the commentContent & authorName state after submission
      setCommentContent('');
      setAuthorName('');

      // Close the dialog after the comment is successfully submitted
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
      <textarea
        rows={4}
        placeholder='Enter your comment'
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
      ></textarea>

      {/* Add your comment input field and submit button here */}
      <input
        type='text'
        placeholder='Your Name'
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
      />

      <button onClick={handleCommentSubmit}>Submit</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default CommentDialog;
