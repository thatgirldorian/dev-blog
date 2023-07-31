const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  postId: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
  start: { type: Number, required: true },
  end: { type: Number, required: true },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
