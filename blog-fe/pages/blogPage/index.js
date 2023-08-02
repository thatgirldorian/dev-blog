// @ts-nocheck

import { useEffect, useContext, useState } from 'react';
import BlogContext from '../../contexts/BlogContext';
import { BlogPost, BlogContextType } from '../../contexts/BlogTypes';
import { DateTimeFormatOptions } from 'intl';

import EditPost from '../../components/EditPost';
import Header from '../../components/Header';
import AuthorCard from '../../components/AuthorCard';
import { PencilOutline } from 'react-ionicons';
import Button from '../../components/Button';

import Link from 'next/link';
import Footer from '../../components/Footer';
import { useRouter } from 'next/router';

const BlogPage = () => {
  const router = useRouter();
  const { blogData, setBlogData } = useContext(BlogContext);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleEditPost = (postId) => {
    // Set the selectedPost state when the "Edit Post" button is clicked
    const selectedPost = blogData.find((post) => post._id === postId);
    setSelectedPost(selectedPost);
  };

  useEffect(() => {
    // Fetch the blog post data when the component mounts
    fetchBlogPost();
  }, []);

  const fetchBlogPost = async () => {
    try {
      const data = await fetch(`/api/posts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());
      setBlogData(data);
    } catch (error) {
      console.error('Error fetching blog post:', error);
    }
  };

  if (!blogData.length) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
  };

  const truncateContent = (content, wordLimit) => {
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
                  src={
                    post.imageFileName ? `/images/${post.imageFileName}` : ''
                  }
                  alt='Blog Post'
                  className='rounded-md'
                />
                <h2 className='text-[30px] font-bold my-4 leading-[1.2]'>
                  {post?.title}
                </h2>
                <div className='blog-post-info flex gap-4 my-4'>
                  <p className='text-[14px] text-[#64748b] font-semibold '>
                    {post?.author}
                  </p>
                  <p className='text-[14px] text-[#64748b] font-medium flex items-center'>
                    <span className='mr-2'>&#8226;</span>
                    {formatDate(post?.date)}
                  </p>
                </div>

                <p className=' text-[18px] mb-4'>
                  {truncateContent(post?.content, 25)}
                </p>

                <div className='flex gap-8 mt-4'>
                  <Button
                    icon={
                      <PencilOutline
                        height='16px'
                        width='16px'
                        style={{ color: 'white' }}
                      />
                    }
                    onClick={() => {
                      router.push(`/blogPage/${post?._id}`);
                    }}
                    text='Edit Post'
                    className='text-white border-rounded bg-blue-500'
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {selectedPost && (
          <EditPost postId={selectedPost._id} postData={selectedPost} />
        )}
        <Footer />
      </main>
    </>
  );
};

export default BlogPage;
