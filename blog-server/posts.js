const express = require('express');
const router = express.Router();

// Import your Mongoose model (assuming you named it Blog)
const Blog = require('./blogModel');

// Define the API route to fetch blog post data
router.get('/posts', async (req, res) => {
  try {
    // Fetch all blog posts from the database
    const blogPosts = await Blog.find();

    // Return the blog post data as JSON response
    res.json(blogPosts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
