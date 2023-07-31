require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const postsRoute = require('./posts');
const commentsRoute = require('./comments');
const cors = require('cors');

// Import Mongoose models
const Post = require('./models/postModel');
const Comment = require('./models/commentModel');

const app = express();
// Enable CORS
app.use(cors());

// Set up MongoDB connection
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(express.json());

// Register API routes
app.use('/api', postsRoute);
app.use('/api', commentsRoute);

app.get('/api/posts/:id', async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);
    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//Create a new post
app.post('/api/posts', async (req, res) => {
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
});

//Edit a blog post
app.put('/api/posts/:id', async (req, res) => {
  const postId = req.params.id;
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
});

// Start the server
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
