import React from 'react';

const CommentModal = ({ isOpen, onClose, onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Get the comment input value and submit it
    const comment = event.target.comment.value;
    onSubmit(comment);
    // Close the modal after submitting
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-8 rounded'>
        <h2 className='text-xl font-bold mb-4'>Add Comment</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className='textarea-input w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500'
            id='comment'
            placeholder='Enter your comment...'
          />
          <div className='flex justify-end mt-4'>
            <button
              className='bg-blue-500 text-white px-4 py-2 rounded'
              type='submit'
            >
              Add
            </button>
            <button
              className='bg-gray-500 text-white px-4 py-2 rounded ml-4'
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentModal;
