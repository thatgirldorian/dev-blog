const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  postId: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
  start: { type: Number, required: true },
  end: { type: Number, required: true },
});

// Check if the Comment model already exists before defining it
// export default mongoose.models.Comment ||
//   mongoose.model('Comment', commentSchema);

// Check if the Comment model already exists before defining it
// module.exports =
//   mongoose.models.Comment || mongoose.model('Comment', commentSchema);
if (!mongoose.models.Comment) {
  const Comment = mongoose.model('Comment', commentSchema);
}

module.exports = mongoose.models.Comment;
