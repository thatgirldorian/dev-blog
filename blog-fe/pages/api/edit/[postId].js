// @ts-nocheck

import { fetchBlogPostById } from '../../pages/api/blogPosts';

export default async function handler(req, res) {
  const { postId } = req.query;

  try {
    const postData = await fetchBlogPostById(postId);
    if (!postData) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(postData);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ message: 'Error fetching blog post' });
  }
}
