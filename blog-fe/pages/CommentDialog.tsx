import React from 'react';

const CommentDialog = ({ onClose, onSubmit }) => {
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
      <button onClick={onSubmit}>Submit</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default CommentDialog;
