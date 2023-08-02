import dbConnect from '../../../../../lib/dbConnect';
import Comment from '../../../../../models/commentModel';

export default async function handler(req, res) {
  try {
    const db = await dbConnect();
    if (req.method === 'GET') {
      const { id: postId } = req.query;
      const comments = await Comment.find({ postId });

      res.status(200).json(comments);
    } else if (req.method == 'POST') {
      // Handle the '/api/posts/:id/comments' route to add a new comment to a blog post
      const { id: postId } = req.query;
      const { content, author, date, start, end } = req.body;

      try {
        // Create a new comment using the Comment model
        const newComment = await Comment.create({
          postId,
          content,
          author,
          date,
          start,
          end,
        });

        res.status(201).json(newComment);
      } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    } else {
      // Handle other POST requests using the 'postsRoute' and 'commentsRoute'
      res.status(405).end({
        message: 'Request not resolved',
      });
    }
  } catch (error) {}
}
