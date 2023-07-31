// EditPost.js (Edit component for editing a blog post)
import { useState, useEffect, useContext, useRef, useReducer } from 'react';
import { useRouter } from 'next/router';
import { fetchBlogPostById, updateBlogPost } from '../pages/api/posts';
import { BlogContext } from './contexts/BlogContext';
const Highlight = require('react-highlighter');

import Toolbar from './Toolbar';
import CommentSidebar from './CommentSidebar';
import axios from 'axios';
import commentsReducer from '../reducers/commentsReducer';
import { Button } from './Button';
import { ArrowBack } from 'react-ionicons';

const EditPost = ({ postId, postData }) => {
  const router = useRouter();

  const [comments, dispatch] = useReducer(commentsReducer, []);

  const { blogData, setBlogData } = useContext(BlogContext);
  const [post, setPost] = useState(postData);
  const [previewMode, setPreviewMode] = useState(false);
  const [highlightedText, setHighlightedText] = useState([]);

  const [isToolbarOpen, setIsToolbarOpen] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });

  const [selectedText, setSelectedText] = useState('');
  const [highlightedComment, setHighlightedComment] = useState(null);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  const contentRef = useRef();

  useEffect(() => {
    // Fetch the blog post data by its ID when the component mounts
    async function fetchPost() {
      const postData = await fetchBlogPostById(postId);
      setPost({
        title: postData.title,
        content: postData.content,
        author: postData.author,
        draft: postData.draft,
        comments: postData.comments || [],
      });
    }
    fetchPost();
  }, [postId]);

  useEffect(() => {
    // Fetch the comments for the post by its ID when the component mounts
    async function fetchComments() {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/posts/${postId}/comments`
        );
        dispatch({
          type: 'SET_COMMENTS',
          payload: response.data,
        });
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }
    fetchComments();
  }, [postId, comments]);

  const highlightText = (start, end) => {
    const contentEl = contentRef.current;
    const selection = window.getSelection();

    if (contentEl && selection) {
      const range = document.createRange();
      const startNode = getNodeAtOffset(contentEl, start);
      const endNode = getNodeAtOffset(contentEl, end);

      if (startNode && endNode) {
        range.setStart(startNode.node, startNode.offset);
        range.setEnd(endNode.node, endNode.offset);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  const getNodeAtOffset = (rootNode, offset) => {
    const walker = document.createTreeWalker(
      rootNode,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    let currentNode = walker.nextNode();
    let currentOffset = 0;

    while (currentNode) {
      const nodeLength = currentNode.length;

      if (currentOffset + nodeLength >= offset) {
        return {
          node: currentNode,
          offset: offset - currentOffset,
        };
      }

      currentOffset += nodeLength;
      currentNode = walker.nextNode();
    }

    return null;
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      const range = selection.getRangeAt(0);
      const contentEl = contentRef.current;

      // Calculate the top and left positions of the toolbar to position it near the selected text
      const contentRect = contentEl.getBoundingClientRect();
      const rect = range.getBoundingClientRect();
      const mouseX = rect.left + rect.width / 2;
      const mouseY = rect.top;
      const toolbarTop = mouseY - contentRect.top - 40;
      const toolbarLeft = mouseX - contentRect.left - 75;

      // Use range's startOffset and endOffset directly to get the offsets
      const start = range.startOffset;
      const end = range.endOffset;

      console.log('Start Offset:', start);
      console.log('End Offset:', end);
      // Set the start and end state with the calculated offsets
      setStart(start);
      setEnd(end);

      // Set the toolbar position after the state is updated
      setToolbarPosition({
        top: toolbarTop,
        left: toolbarLeft,
      });

      // Set the highlightedText state with the array of a single range
      setHighlightedText([{ start, end }]);

      // Open the toolbar when text is highlighted
      setIsToolbarOpen(true);
    } else {
      // If nothing is selected, reset the highlightedText state and close the toolbar
      setHighlightedText([]);
      setIsToolbarOpen(false);
    }
  };

  const handleContentChange = (event) => {
    const contentValue = event.target.value;
    setPost({ ...post, content: contentValue });
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      setPost({ ...post, [name]: checked });
    } else {
      setPost({ ...post, [name]: value });
    }
  };

  const handleDraftChange = (event) => {
    setPost({ ...post, draft: event.target.checked });
  };

  const handleSave = async () => {
    try {
      // Send the updated post data, including draft status, to the backend
      await updateBlogPost(postId, {
        title: post.title,
        content: post.content,
        author: post.author,
        draft: post.draft,
      });

      if (!post) {
        // If post is null (still loading data), show a loading message or spinner
        return <div>Loading...</div>;
      }

      router.push('/');

      //update the blog data in the context with the edited data
      setBlogData((prevBlogData: { _id: any }[]) => {
        const updatedBlogData = prevBlogData.map((postItem: { _id: any }) => {
          if (postItem._id === postId) {
            return { ...postItem, ...post };
          }
          return postItem;
        });
        return updatedBlogData;
      });

      // Handle success, e.g., show a success message or redirect to the post page
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error('Error updating blog post:', error);
    }
  };

  const handleRedirect = () => {
    router.push('/');
  };

  const handleSaveAsDraft = async () => {
    try {
      // Send the draft post data to the backend
      await updateBlogPost(postId, {
        title: post.title,
        content: post.content,
        author: post.author,
        draft: true, // Set the draft status to true for saving as draft
      });
      console.log('Draft has been saved');
      // Handle success, e.g., show a success message or redirect to the post page
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error('Error saving blog post as draft:', error);
    }
  };

  const handlePreviewToggle = () => {
    setPreviewMode((prevPreviewMode) => !prevPreviewMode);
  };

  const handleCloseToolbars = () => {
    setIsToolbarOpen(false);
  };

  const handleAddComment = async (commentContent, authorName, start, end) => {
    const commentData = {
      content: commentContent,
      author: authorName,
      start: start,
      end: end,
    };

    // Handle the comment submission here (e.g., save it to the server)
    console.log('Adding comment:', commentData, start, end);

    try {
      // Save the comment to the server
      const response = await axios.post(
        `http://localhost:5001/api/posts/${postId}/comments`,
        {
          ...commentData,
          start: start,
          end: end,
        }
      );

      // Get the newly added comment from the server response
      const newComment = response.data;

      // Update the comments state with the new comment
      dispatch({
        type: 'ADD_COMMENT',
        comment: {
          ...newComment,
          start,
          end,
        },
      });

      setHighlightedText((prevHighlightedText) => {
        const updatedHighlightedText = prevHighlightedText.map((segment) => {
          if (
            segment.start === selectedText.start &&
            segment.end === selectedText.end
          ) {
            // If the segment matches the selected text, update its comments
            return { ...segment, comments: [...segment.comments, newComment] };
          }
          return segment;
        });
        return updatedHighlightedText;
      });

      // Close the toolbar after a comment has been added
      setIsToolbarOpen(false);
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error('Error adding comment:', error);
    }
  };

  const handleCommentSidebarClick = async (comment, start, end) => {
    console.log('Clicked on comment:', comment);
    highlightText(start, end);
    // Highlight the corresponding text based on the clicked comment
    setHighlightedComment(comment);

    setStart(start);
    setEnd(end);

    try {
      // Fetch the comments for the highlighted section
      const response = await axios.get(
        `http://localhost:5001/api/posts/${postId}/highlight/${start}/${end}`
      );

      const highlightedComments = response.data;
      // Set the highlighted comments state to update the UI
      setHighlightedText((prevHighlightedText) => {
        const updatedHighlightedText = prevHighlightedText.map((segment) => {
          if (segment.start === comment.start && segment.end === comment.end) {
            // If the segment matches the selected text, update its comments
            return { ...segment, comments: highlightedComments };
          }
          return segment;
        });
        return updatedHighlightedText;
      });
    } catch (error) {
      console.error('Error fetching highlighted comments:', error);
    }
  };

  const calculateToolbarPosition = (mouseX, mouseY) => {
    const contentRect = contentRef.current.getBoundingClientRect();
    const containerTop = contentRef.current.offsetTop;
    const containerLeft = contentRef.current.offsetLeft;
    const containerWidth = contentRect.width;
    const containerHeight = contentRect.height;

    const toolbarWidth = 150; // Set the desired width of the toolbar
    const toolbarHeight = 50; // Set the desired height of the toolbar

    // Calculate the top and left positions of the toolbar to position it near the selected text
    let top = mouseY - containerTop - toolbarHeight - 4; // Adjust this value to position the toolbar above the selected text
    let left = mouseX - containerLeft - toolbarWidth / 2;

    // Ensure the toolbar is within the container bounds horizontally
    if (left < 0) {
      left = 0;
    } else if (left + toolbarWidth > containerWidth) {
      left = containerWidth - toolbarWidth;
    }

    // Ensure the toolbar is within the container bounds vertically
    if (top < 0) {
      top = 0;
    } else if (top + toolbarHeight > containerHeight) {
      top = containerHeight - toolbarHeight;
    }

    setToolbarPosition({
      top: top,
      left: left,
    });
  };

  useEffect(() => {
    // Add event listeners for mouseup and mousedown events
    contentRef.current?.addEventListener('mouseup', handleTextSelection);

    // Clean up the event listeners when the component unmounts
    return () => {
      contentRef.current?.removeEventListener('mouseup', handleTextSelection);
    };
  }, []);

  return (
    <div className='max-w-[950px] mx-auto my-auto sm:my-0 mt-12 px-4 sm:px-16 relative'>
      <div className='flex items-center  justify-between'>
        <Button
          icon={<ArrowBack />}
          text={'Blog Home'}
          className={`text-black -ml-6 py-4`}
          onClick={handleRedirect}
        />

        <div className='flex items-center gap-2'>
          <Button
            text='Save draft'
            className='border border-slate-200 rounded py-2 px-4'
            onClick={handleSaveAsDraft}
          />
          <Button
            text={previewMode ? 'Edit' : 'Preview'}
            className='border border-slate-200 rounded py-2 px-4 hover:bg-slate-200'
            onClick={handlePreviewToggle}
          />
        </div>
      </div>

      <h1 className='text-2xl font-bold py-4'>Edit Blog Post</h1>

      {previewMode ? (
        <div className='mr-48'>
          <h2 className='text-[30px] font-bold my-2'>{post.title}</h2>
          <p className='text-[18px] text-gray-600 font-medium my-2'>
            {post.author}
          </p>
          <p className='my-4' ref={contentRef} onMouseUp={handleTextSelection}>
            <Highlight
              matchStyle={{ backgroundColor: '#b8e2f6' }}
              search={highlightedText
                .map((segment) =>
                  post.content.slice(segment.start, segment.end)
                )
                .join(' ')}
            >
              {post.content}
            </Highlight>
          </p>
        </div>
      ) : (
        <div>
          <div className='my-2'>
            <label className='block my-2 font-medium' htmlFor='title'>
              Title
            </label>
            <input
              className='w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500'
              type='text'
              id='title'
              name='title'
              value={post.title}
              onChange={handleInputChange}
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2 my-2 font-medium' htmlFor='content'>
              Content
            </label>
            <textarea
              className='textarea-input w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500'
              id='content'
              value={post.content}
              onChange={handleContentChange}
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2 my-2 font-medium' htmlFor='author'>
              Author
            </label>
            <input
              className='w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500'
              type='text'
              id='author'
              name='author'
              value={post.author}
              onChange={handleInputChange}
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2 my-2 font-medium' htmlFor='draft'>
              Draft
            </label>
            <input
              type='checkbox'
              id='draft'
              checked={post.draft}
              onChange={handleDraftChange}
            />
          </div>

          <Button
            text='Publish'
            className='text-white border-rounded bg-blue-500'
            onClick={handleSave}
          />
        </div>
      )}

      {/* Conditionally render the comment sidebars only in preview mode */}
      {previewMode && (
        <div className='comment-sidebar-container'>
          {comments.map((comment) => (
            <CommentSidebar
              key={comment._id}
              comment={comment}
              onClick={handleCommentSidebarClick}
              isSelected={highlightedComment === comment}
              start={comment.start}
              end={comment.end}
            />
          ))}
        </div>
      )}

      <div style={{ position: 'absolute' }}>
        {isToolbarOpen && (
          <Toolbar
            postId={postId}
            handleAddComment={handleAddComment}
            start={start}
            end={end}
            isOpen={isToolbarOpen}
            onSubmit={handleAddComment} // Handle adding comments in the Toolbar
            highlightedText={highlightedText}
            highlightText={highlightText}
            style={{
              position: 'absolute',
              top: toolbarPosition.top,
              left: toolbarPosition.left,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default EditPost;
