import { useState, useEffect } from 'react';
import { fetchBlogPosts } from '../pages/api/posts';

export const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    // Fetch the blog post data when the component mounts
    async function fetchData() {
      const data = await fetchBlogPosts();
      console.log(data);
      setBlogPosts(data);
    }
    fetchData();
  }, []);

  return (
    <div className='p-4 mt-12'>
      <div className='flex gap-32'>
        <h1 className='text-2xl font-bold'>Read our blog</h1>
        <button className='bg-green-500 text-white px-4 py-2 rounded'>
          Create post
        </button>
      </div>

      <ul className='flex flex-wrap -mx-4'>
        {blogPosts.map((post) => (
          <li
            key={post._id}
            className='border rounded border-gray-500 w-full sm:w-1/2 sm:mb-0 sm:px-4 p-4 mt-4 ml-4 max-w-[550px]'
          >
            <h2 className='text-lg font-bold mb-2'>{post.title}</h2>
            <p className='mb-4'>{post.content}</p>
            <p>Author: {post.author}</p>
            <p>Date: {post.date}</p>
            <div className='flex gap-8 mt-4'>
              <button className='bg-blue-500 text-white px-4 py-2 rounded'>
                Edit
              </button>
              <button className='bg-red-500 text-white px-4 py-2 rounded'>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
