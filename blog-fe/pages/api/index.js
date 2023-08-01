import mongoose from 'mongoose';
import Post from '../../models/postModel';
import Comment from '../../models/commentModel';

const cors = require('cors');

// Enable CORS
const corsHandler = cors({ origin: '*' });

// Set up MongoDB connection
const mongoURI = process.env.MONGODB_URI;

const connectToDatabase = async () => {
  try {
    return await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

// Define your Next.js API route handler
const nextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    // Handle GET requests
    if (req.url === '/api') {
      // Handle the root route '/api'
      res.json('Hello world');
    } else if (req.url === '/api/posts/:id') {
      // Handle the '/api/posts/:id' route to fetch a specific blog post
      const postId = req.query.id;

      try {
        const post = await Post.findById(postId);
        res.status(200).json(post);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    } else {
      // Handle other GET requests using the 'postsRoute' and 'commentsRoute'
      return handle(req, res);
    }
  } else if (req.method === 'POST') {
    // Handle POST requests
    if (req.url === '/api/posts') {
      // Handle the '/api/posts' route to create a new blog post
      const { title, content, author, draft } = req.body;

      try {
        const newPost = await Post.create({
          title,
          content,
          author,
          draft,
          date: Date.now(),
        });
        res.status(201).json(newPost);
      } catch (error) {
        console.log('There was an error creating this blog post', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    } else if (req.url === '/api/posts/:id/comments') {
      // Handle the '/api/posts/:id/comments' route to add a new comment to a blog post
      const postId = req.query.id;
      const { content, author, date, start, end } = req.body;

      try {
        // Create a new comment using the Comment model
        const newComment = await Comment.create({
          postId,
          content,
          author,
          date,
          start,
          end,
        });

        res.status(201).json(newComment);
      } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    } else {
      // Handle other POST requests using the 'postsRoute' and 'commentsRoute'
      return handle(req, res);
    }
  } else if (req.method === 'PUT') {
    // Handle PUT requests
    if (req.url === '/api/posts/:id') {
      // Handle the '/api/posts/:id' route to edit a blog post
      const postId = req.query.id;
      const { title, author, content, draft } = req.body;

      try {
        const updatedPost = await Post.findByIdAndUpdate(postId, {
          title,
          content,
          author,
          draft,
          updatedAt: new Date(),
        });

        if (!updatedPost) {
          return res.status(404).json({ message: 'No blog post found.' });
        }

        res.json(updatedPost);
      } catch (error) {
        console.log('There was an error updating this blog post.', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    } else {
      // Handle other PUT requests using the 'postsRoute' and 'commentsRoute'
      return handle(req, res);
    }
  } else {
    // Return a 405 Method Not Allowed status code for unsupported methods
    res.status(405).end();
  }
};

export default nextApiHandler;
