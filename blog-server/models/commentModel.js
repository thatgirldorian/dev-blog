// blog-server/commentModel.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  postId: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
