// @ts-nocheck

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import { fetchBlogPostById } from './api/blogPosts';
import EditPost from '../../../components/EditPost';

const EditPostPage = () => {
  const router = useRouter();
  const { blogPageId } = router.query;
  const [postData, setPostData] = useState(null);

  const fetchPost = async () => {
    try {
      const data = await fetch(`/api/posts/${blogPageId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());
      setPostData(data);
    } catch (error) {
      console.error('Error fetching blog post:', error);
    }
  };

  useEffect(() => {
    if (blogPageId) {
      fetchPost();
    }
  }, [blogPageId]);

  useEffect(() => {
    console.log({ postData, blogPageId });
  }, [blogPageId, postData]);

  if (!blogPageId || !postData) {
    return <div>Loading...</div>;
  }

  return <EditPost postId={blogPageId} postData={postData} />;
};

export default EditPostPage;
