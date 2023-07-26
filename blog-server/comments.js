// blog-server/comments.js
const express = require('express');
const router = express.Router();

// Import Mongoose model for comments
const Comment = require('./models/commentModel');

// Route for fetching comments for a specific blog post
router.get('/posts/:id/comments', async (req, res) => {
  const postId = req.params.id;

  try {
    // Use your Mongoose model to find the comments for the given postId in the database
    const comments = await Comment.find({ postId });

    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route for adding a new comment to a specific blog post
router.post('/posts/:id/comments', async (req, res) => {
  const postId = req.params.id;
  const { content, author, date } = req.body;

  try {
    // Create a new comment document using the Comment model
    const newComment = await Comment.create({
      postId,
      content,
      author,
      date,
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.log('There was an error adding the comment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
