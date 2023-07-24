// EditPost.js (Edit component for editing a blog post)
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { fetchBlogPostById, updateBlogPost } from '../pages/api/posts';
import { BlogContext } from './contexts/BlogContext';

const EditPost = ({ postId }) => {
  const router = useRouter();
  const { blogData, setBlogData } = useContext(BlogContext);
  const [post, setPost] = useState({
    title: '',
    content: '',
    author: '',
    draft: false, // Default value for draft status
  });

  useEffect(() => {
    // Fetch the blog post data by its ID when the component mounts
    async function fetchPost() {
      const postData = await fetchBlogPostById(postId);
      setPost(postData);
    }
    fetchPost();
  }, [postId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
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

  return (
    <div className='max-w-xl mx-12 mt-12'>
      <h1 className='text-2xl font-bold mb-4'>Edit Blog Post</h1>
      <div className='mb-4'>
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
          className='w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500'
          id='content'
          value={post.content}
          onChange={handleInputChange}
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
        Save
      </button>
    </div>
  );
};

export default EditPost;
