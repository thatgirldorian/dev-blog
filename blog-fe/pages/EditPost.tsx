// EditPost.js (Edit component for editing a blog post)
import { useState, useEffect, useContext, useRef } from 'react';
import { useRouter } from 'next/router';
import { fetchBlogPostById, updateBlogPost } from '../pages/api/posts';
import { BlogContext } from './contexts/BlogContext';

const Highlight = require('react-highlighter');

const EditPost = ({ postId, postData }) => {
  const router = useRouter();

  const { blogData, setBlogData } = useContext(BlogContext);
  const [post, setPost] = useState(postData);
  const [previewMode, setPreviewMode] = useState(false);
  const [highlightedText, setHighlightedText] = useState([]);

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
      });
    }
    fetchPost();
  }, [postId]);

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

  const handleHighlight = (start, end) => {
    setHighlightedText([...highlightedText, { start, end }]);
  };

  useEffect(() => {
    // Function to handle text selection & determine which text is selected
    const handleTextSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString()) {
        // Get the start and end positions of the selected text
        const range = selection.getRangeAt(0);
        const start = range.startOffset;
        const end = range.endOffset;

        // Call the handleHighlight function with start and end positions
        setHighlightedText([{ start, end }]);
      }
    };

    // Add event listeners for mouseup and mousedown events
    contentRef.current?.addEventListener('mouseup', handleTextSelection);
    contentRef.current?.addEventListener('mousedown', handleTextSelection);

    // Clean up the event listeners when the component unmounts
    return () => {
      contentRef.current?.removeEventListener('mouseup', handleTextSelection);
      contentRef.current?.removeEventListener('mousedown', handleTextSelection);
    };
  }, [handleHighlight]);

  return (
    <div className='max-w-xl mx-12 mt-12'>
      <button onClick={handleRedirect}>Home</button>
      <h1 className='text-2xl font-bold mb-4'>Edit Blog Post</h1>
      <button
        onClick={handleSaveAsDraft}
        className='bg-blue-500 text-white px-4 py-2 rounded'
      >
        Save as draft
      </button>
      <button
        className='bg-yellow-500 text-white px-4 py-2 rounded ml-4'
        onClick={handlePreviewToggle}
      >
        {previewMode ? 'Edit' : 'Preview'}
      </button>

      {previewMode ? (
        <div>
          {/* Add your preview view here */}
          <h2 className='text-[24px] font-bold my-2'>{post.title}</h2>
          <p className='text-[18px] text-gray-600 font-medium my-2'>
            {post.author}
          </p>
          <p className=' my-4' ref={contentRef}>
            <Highlight
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
          <div className='my-8'>
            <label className='block mb-2' htmlFor='title'>
              Title:
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
            <label className='block mb-2' htmlFor='content'>
              Content:
            </label>
            <textarea
              className='textarea-input w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500'
              id='content'
              value={post.content}
              onChange={handleContentChange}
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2' htmlFor='author'>
              Author:
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
            <label className='block mb-2' htmlFor='draft'>
              Draft:
            </label>
            <input
              type='checkbox'
              id='draft'
              checked={post.draft}
              onChange={handleDraftChange}
            />
          </div>

          <button
            className='bg-green-500 text-white px-4 py-2 rounded'
            onClick={handleSave}
          >
            Publish
          </button>
        </div>
      )}
    </div>
  );
};

export default EditPost;
