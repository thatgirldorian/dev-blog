const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  _id: { type: String, default: () => mongoose.Types.ObjectId().toString() },
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
  draft: { type: Boolean, required: false },
  updatedAt: { type: Date, default: Date.now },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  highlightedText: [
    {
      start: { type: Number, required: true },
      end: { type: Number, required: true },
      comments: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
    },
  ],
});

export default mongoose.models?.Post || mongoose.model('Post', postSchema);
