import React, { useState } from 'react';
import axios from 'axios';

interface CommentDialogProps {
  onClose: () => void;
  onSubmit: () => void;
  postId: string;
  start: number;
  end: number;
}

const CommentDialog: React.FC<CommentDialogProps> = ({
  onClose,
  onSubmit,
  postId,
  start,
  end,
}) => {
  const [commentContent, setCommentContent] = useState('');
  const [authorName, setAuthorName] = useState('');

  const handleCommentSubmit = async () => {
    if (!commentContent || !authorName || !start || !end) {
      console.error('Comment data is incomplete');
      return;
    }

    try {
      const commentData = {
        postId: postId,
        content: commentContent,
        author: authorName,
        date: new Date().toISOString(),
        start: start,
        end: end,
      };

      const response = await axios.post(
        `http://localhost:5001/api/posts/${postId}/comments`,
        commentData
      );

      // Reset the commentContent & authorName state after submission
      setCommentContent('');
      setAuthorName('');

      onClose();
    } catch (error) {
      console.error('Error adding comment:', error);
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
        border: '1px solid #e2e8f0',
        boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
        width: '280px',
        height: '150px',
        marginRight: '24px',
      }}
    >
      <textarea
        rows={4}
        placeholder='Add a comment..'
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        style={{ outline: 'none', border: 'none', resize: 'none' }}
      ></textarea>

      <input
        type='text'
        placeholder='Add your name...'
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        style={{ outline: 'none', border: 'none' }}
      />

      <div>
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}
        >
          <button onClick={onClose}>Cancel</button>
          <button
            className='border border-slate-200 rounded-full py-2 px-4'
            onClick={handleCommentSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentDialog;
