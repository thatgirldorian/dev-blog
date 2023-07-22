// blog-server/postModel.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  _id: { type: String, default: () => mongoose.Types.ObjectId().toString() },
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
