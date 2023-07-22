import { useState, useEffect } from 'react';
import { fetchBlogPosts } from '../pages/api/posts';

export const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    // Fetch the blog post data when the component mounts
    async function fetchData() {
      const data = await fetchBlogPosts();
      setBlogPosts(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>
      {/* <ul>
        {blogPosts.map((post) => (
          <li key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>Author: {post.author}</p>
            <p>Date: {post.date}</p>
          </li>
        ))}
      </ul> */}
    </div>
  );
};
