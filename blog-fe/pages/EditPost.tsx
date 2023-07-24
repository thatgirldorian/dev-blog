// EditPost.js (Edit component for editing a blog post)
import { useState, useEffect, useContext } from 'react';
import { fetchBlogPostById, updateBlogPost } from '../pages/api/posts';
import { BlogContext } from './contexts/BlogContext';

const EditPost = ({ postId }) => {
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

      //update the blog data in the context with the edited data
      setBlogData((prevBlogData: { _id: any }[]) => {
        const updaatedBlogData = prevBlogData.map((postItem: { _id: any }) => {
          if (postItem._id === postId) {
            return { ...postItem, ...post };
          }
          return postItem;
        });
        return updaatedBlogData;
      });

      // Handle success, e.g., show a success message or redirect to the post page
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error('Error updating blog post:', error);
    }
  };

  return (
    <div>
      <h1>Edit Blog Post</h1>
      <label>
        Title:
        <input
          type='text'
          name='title'
          value={post.title}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Content:
        <textarea value={post.content} />
      </label>
      <label>
        Author:
        <input type='text' name='title' value={post.author} />
      </label>

      <label>
        Draft:
        <input
          type='checkbox'
          checked={post.draft}
          onChange={handleDraftChange}
        />
      </label>
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
