import { useEffect, useContext, useState } from 'react';
import { BlogContext } from './contexts/BlogContext';
import { BlogPost, BlogContextType } from './contexts/BlogTypes';
import { DateTimeFormatOptions } from 'node:intl';

import { fetchBlogPosts } from './api/posts';
import EditPost from './EditPost';
import { Header } from './Header';
import { AuthorCard } from './AuthorCard';
import { PencilOutline } from 'react-ionicons';
import { Button } from './Button';

import Link from 'next/link';
import { Footer } from './Footer';

export const BlogPage = () => {
  const { blogData, setBlogData } = useContext(BlogContext);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    // Fetch the blog post data when the component mounts
    async function fetchData() {
      const data = await fetchBlogPosts();

      setBlogData(data);
    }
    fetchData();
  }, []);

  if (!blogData.length) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString: string | number | Date) => {
    const options: DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
  };

  const truncateContent = (content: string, wordLimit: number) => {
    const words = content.split(' ');
    const truncatedContent = words.slice(0, wordLimit).join(' ');

    if (words.length > wordLimit) {
      return truncatedContent + '...';
    }

    return truncatedContent;
  };

  return (
    <>
      <Header />
      <main className='min-h-screen'>
        <AuthorCard />
        <div className='mt-10 mx-4 sm:mx-64 '>
          <ul className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {blogData.map((post) => (
              <li
                key={post._id}
                className='border-gray-500 sm:w-full sm:mb-0 sm:px-4 p-4 max-w-[550px] my-2'
              >
                <img
                  src={`/images/${post.imageFileName}`}
                  alt='Blog Post'
                  className='rounded-md'
                />
                <h2 className='text-[30px] font-bold my-4 leading-[1.2]'>
                  {post.title}
                </h2>
                <div className='blog-post-info flex gap-4 my-4'>
                  <p className='text-[14px] text-[#64748b] font-semibold '>
                    {post.author}
                  </p>
                  <p className='text-[14px] text-[#64748b] font-medium flex items-center'>
                    <span className='mr-2'>&#8226;</span>
                    {formatDate(post.date)}
                  </p>
                </div>

                <p className=' text-[18px] mb-4'>
                  {truncateContent(post.content, 25)}
                </p>

                <div className='flex gap-8 mt-4'>
                  <Link href={`/edit/${post._id}`} passHref>
                    <Button
                      icon={
                        <PencilOutline
                          height='16px'
                          width='16px'
                          style={{ color: 'white' }}
                        />
                      }
                      text='Edit Post'
                      className='text-white border-rounded bg-blue-500'
                    />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {selectedPost && <EditPost postData={selectedPost} />}
        <Footer />
      </main>
    </>
  );
};
