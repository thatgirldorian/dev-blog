const express = require('express');
const router = express.Router();
const Comment = require('./models/commentModel');

// Route for adding a comment to a blog post
router.post('/posts/:id/comments', async (req, res) => {
  const postId = req.params.id;
  const { content, author, date } = req.body;

  try {
    // Create a new comment using the Comment model
    const newComment = await Comment.create({
      postId,
      content,
      author,
      date,
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route for fetching comments for a specific blog post
router.get('/posts/:id/comments', async (req, res) => {
  const postId = req.params.id;

  try {
    // Find all comments that belong to the specified post ID
    const comments = await Comment.find({ postId });

    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
