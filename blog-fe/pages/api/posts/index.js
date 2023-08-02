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
        console.log({ blogPosts });
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

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     const postId = req.query.id;

//     try {
//       // Ensure database connection
//       await dbConnect();

//       // Fetch the blog post from the database based on the provided ID
//       const blogPost = await Post.findById(postId);

//       if (!blogPost) {
//         return res.status(404).json({ message: 'No blog post found.' });
//       }

//       // Return the blog post data as JSON response
//       res.status(200).json(blogPost);
//     } catch (error) {
//       console.error('Error fetching blog post:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   } else {
//     res.status(405).end(); // Method Not Allowed
//   }
// }
