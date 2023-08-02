import mongoose from 'mongoose';
import Post from '../../../models/postModel';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const postId = req.query.id;
    const { title, author, content, draft } = req.body;

    try {
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
          title,
          content,
          author,
          draft,
          updatedAt: new Date(),
        },
        { new: true } // Return the updated post
      );

      if (!updatedPost) {
        return res.status(404).json({ message: 'No blog post found.' });
      }

      res.json(updatedPost);
    } catch (error) {
      console.log('There was an error updating this blog post.', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    // Return a 405 Method Not Allowed status code for unsupported methods
    res.status(405).end();
  }
}
