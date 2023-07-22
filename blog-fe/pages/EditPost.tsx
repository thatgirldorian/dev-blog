// EditPost.js (Edit component for editing a blog post)
import { useState, useEffect } from 'react';
import { fetchBlogPostById, updateBlogPost } from '../pages/api/posts';

const EditPost = ({ postId }) => {
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
      {/* Add other input fields for content and author */}
      <label>
        Draft:
        <input
          type='checkbox'
          checked={post.draft}
          onChange={handleDraftChange}
        />
      </label>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditPost;
