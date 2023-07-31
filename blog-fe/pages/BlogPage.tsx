import { useEffect, useContext, useState } from 'react';
import { BlogContext } from './contexts/BlogContext';
import { fetchBlogPosts } from './api/posts';
import EditPost from './EditPost';
import { Header } from './Header';
import { AuthorCard } from './AuthorCard';

import Link from 'next/link';

export const BlogPage = () => {
  const { blogData, setBlogData } = useContext(BlogContext);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    // Fetch the blog post data when the component mounts
    async function fetchData() {
      const data = await fetchBlogPosts();
      console.log(data);
      setBlogData(data); // Update the blogData in the context with the fetched data
    }
    fetchData();
  }, []);

  if (!blogData.length) {
    return <div>Loading...</div>;
  }

  const truncateContent = (content, wordLimit) => {
    const words = content.split(' ');
    const truncatedContent = words.slice(0, wordLimit).join(' ');

    if (words.length > wordLimit) {
      return truncatedContent + '...';
    }

    return truncatedContent;
  };

  return (
    <div className='mt-12'>
      <Header />
      <AuthorCard />
      <div className='p-4'>
        <ul className='flex flex-wrap -mx-4'>
          {blogData.map((post) => (
            <li
              key={post._id}
              className='border rounded border-gray-500 w-full sm:w-1/2 sm:mb-0 sm:px-4 p-4 mt-4 ml-4 max-w-[550px]'
            >
              <h2 className='text-lg font-bold mb-2'>{post.title}</h2>
              <p className='mb-4'>{truncateContent(post.content, 25)}</p>
              <p>Author: {post.author}</p>
              <p>Date: {post.date}</p>
              <div className='flex gap-8 mt-4'>
                <Link
                  href={`/edit/${post._id}`}
                  passHref
                  className='bg-blue-500 text-white px-4 py-2 rounded'
                >
                  Edit
                </Link>
                <button className='bg-red-500 text-white px-4 py-2 rounded'>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Render the EditPost component with the selected blog post data */}
      {selectedPost && <EditPost postData={selectedPost} />}
      <footer>
        <p>2023 Debbie's Blog</p>
        <p>Built with &#10084; and &#128293; </p>
      </footer>
    </div>
  );
};
