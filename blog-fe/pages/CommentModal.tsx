import React from 'react';
import { useState } from 'react';

const CommentModal = ({ isOpen, onClose, onSubmit, selectedText }) => {
  const [isInitialModalOpen, setIsInitialModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [comment, setComment] = React.useState('');

  // Clear the comment input and close both modals
  const handleCloseModals = () => {
    setComment('');
    setIsCommentModalOpen(false);
    onClose();
  };

  // Handle the comment submission and close both modals
  const handleSubmit = () => {
    onSubmit(comment);
    handleCloseModals();
  };

  React.useEffect(() => {
    // Open the second modal if "Add Comment" is clicked in the initial modal
    if (isOpen) {
      setIsCommentModalOpen(true);
    }
  }, [isOpen]);

  return (
    <>
      // Render the initial modal (Modal 1)
      {isOpen && (
        <div className='fixed top-0 left-0 w-screen h-screen bg-opacity-60 bg-gray-900 flex justify-center items-center'>
          {/* ... (Initial modal content) */}
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded mt-4'
            onClick={() => setIsCommentModalOpen(true)}
          >
            Add Comment
          </button>
          {/* ... (Other buttons and content) */}
        </div>
      )}
      // Render the second modal (Modal 2)
      {isCommentModalOpen && (
        <div className='fixed top-0 right-0 w-1/3 h-screen bg-white p-6'>
          {/* ... (Second modal content) */}
          <textarea
            className='w-full h-48 border rounded p-2 mb-4'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='Enter your comment here...'
          />
          <div className='flex justify-end'>
            <button
              className='bg-green-500 text-white px-4 py-2 rounded'
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className='bg-gray-500 text-white px-4 py-2 rounded ml-4'
              onClick={handleCloseModals}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentModal;
