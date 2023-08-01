// @ts-nocheck

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchBlogPostById } from './api/posts';
import EditPost from './EditPost';

const EditPostPage = () => {
  const router = useRouter();
  const { postId } = router.query;
  const [postData, setPostData] = useState(null);

  const fetchPost = async () => {
    try {
      const postData = await fetchBlogPostById(postId);
      setPostData(postData);
    } catch (error) {
      console.error('Error fetching blog post:', error);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchPost();
    }
  }, [postId]);

  if (!postId || !postData) {
    return <div>Loading...</div>;
  }

  return <EditPost postId={postId} postData={postData} />;
};

export default EditPostPage;
