// blog-server/postModel.js
const req = require('express/lib/request');
const mongoose = require('mongoose');
const Comment = require('./commentModel');

const postSchema = new mongoose.Schema({
  _id: { type: String, default: () => mongoose.Types.ObjectId().toString() },
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
  draft: { type: Boolean, required: false },
  updatedAt: { type: Date, default: Date.now },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
