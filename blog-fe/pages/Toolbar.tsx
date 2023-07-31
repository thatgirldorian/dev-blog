import React, { useState } from 'react';
import CommentDialog from './CommentDialog';

interface ToolbarProps {
  postId: string;
  handleAddComment: (
    content: string,
    author: string,
    start: number,
    end: number
  ) => void;
  start: number;
  end: number;
}

const Toolbar: React.FC<ToolbarProps> = ({
  postId,
  handleAddComment,
  start,
  end,
}) => {
  const [showCommentDialog, setShowCommentDialog] = useState(false);

  const [commentContent, setCommentContent] = useState(''); // State to store the comment content
  const [authorName, setAuthorName] = useState(''); // State to store the author name

  const handleSubmit = () => {
    handleAddComment(commentContent, authorName, start, end);

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
    <div className='toolbar bg-white rounded border border-gray-200 mx-4'>
      <button className='px-3 py-2 border-r border-gray-200'>Save</button>

      <button className='px-3 py-2 border-r border-gray-200'>
        Toggle Preview
      </button>
      <button onClick={() => handleAddCommentClick()} className='px-3 py-2'>
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
