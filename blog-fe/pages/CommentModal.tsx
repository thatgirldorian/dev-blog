import React from 'react';

const CommentModal = ({ isOpen, onClose, onSubmit, selectedText }) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = React.useState(false);
  const [comment, setComment] = React.useState('');
  const [modalPosition, setModalPosition] = React.useState({
    top: '0px',
    left: '0px',
  });

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
    if (isOpen) {
      // Calculate the position of the highlighted text
      const selection = window.getSelection();
      if (!selection) return;
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setModalPosition({
        top: `${rect.top + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`,
      });
      setIsCommentModalOpen(true);
    }
  }, [isOpen]);

  return (
    <>
      {/* Initial modal */}
      {isOpen && !isCommentModalOpen && (
        <div
          className='fixed z-10 flex items-center justify-center'
          style={{ top: modalPosition.top, left: modalPosition.left }}
        >
          <div className='bg-white p-2 rounded flex items-center shadow-lg'>
            <button
              className='bg-blue-500 text-white px-2 py-1 rounded'
              onClick={() => setIsCommentModalOpen(true)}
            >
              <i className='fas fa-comment-dots'></i>{' '}
              {/* Use any comment icon here */}
            </button>
            <button
              className='bg-gray-500 text-white px-2 py-1 rounded ml-2'
              onClick={onClose}
            >
              <i className='fas fa-times'></i>{' '}
              {/* Use any cancel/close icon here */}
            </button>
          </div>
        </div>
      )}

      {/* Second modal */}
      {isCommentModalOpen && (
        <div className='fixed top-0 right-0 w-1/3 h-screen bg-white p-6'>
          <p className='text-xl font-bold mb-2'>Add Comment</p>
          <textarea
            className='w-50% h-48 border rounded p-2 mb-4'
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
