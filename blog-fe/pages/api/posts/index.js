import Post from '../../../models/postModel';
import mongoose from 'mongoose';
import dbConnect from '../../../lib/dbConnect';
// import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const db = await dbConnect();

    if (req.method === 'GET') {
      try {
        // Fetch all blog posts from the database
        const blogPosts = await Post.find();
        // Return the blog post data as JSON response
        res.status(200).json(blogPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  } catch (error) {
    console.log({ error });
  }
}
