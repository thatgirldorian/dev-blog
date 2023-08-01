import Comment from '../../models/commentModel';

export default async function handler(req, res) {
  const { method, body, query } = req;

  switch (method) {
    case 'POST':
      try {
        const { id } = query;
        const { content, author, date, start, end } = body;

        // Create a new comment using the Comment model
        const newComment = await Comment.create({
          postId: id,
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
      break;

    case 'GET':
      try {
        const { id, start, end } = query;

        if (start && end) {
          // Route for fetching comments for a specific highlighted section in a blog post
          // Convert start and end to integers as they come as strings from the query
          const postId = id;
          const startInt = parseInt(start);
          const endInt = parseInt(end);

          // Find all comments that belong to the specified post ID and fall within the highlighted range
          const comments = await Comment.find({
            postId,
            start: { $gte: startInt },
            end: { $lte: endInt },
          });

          res.status(200).json(comments);
        } else {
          // Route for fetching comments for a specific blog post
          const postId = id;

          // Find all comments that belong to the specified post ID
          const comments = await Comment.find({ postId });

          res.status(200).json(comments);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
      break;

    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}

// //adding a comment to a blog post
// router.post('/posts/:id/comments', async (req, res) => {
//   const postId = req.params.id;
//   const { content, author, date, start, end } = req.body;

//   try {
//     // Create a new comment using the Comment model
//     const newComment = await Comment.create({
//       postId,
//       content,
//       author,
//       date,
//       start,
//       end,
//     });

//     res.status(201).json(newComment);
//   } catch (error) {
//     console.error('Error adding comment:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// //fetching comments for a specific blog post
// router.get('/posts/:id/comments', async (req, res) => {
//   const postId = req.params.id;

//   try {
//     // Find all comments that belong to the specified post ID
//     const comments = await Comment.find({ postId });

//     res.status(200).json(comments);
//   } catch (error) {
//     console.error('Error fetching comments:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // Route for fetching comments for a specific highlighted section in a blog post
// router.get('/posts/:postId/highlight/:start/:end', async (req, res) => {
//   const postId = req.params.postId;
//   const start = parseInt(req.params.start);
//   const end = parseInt(req.params.end);

//   try {
//     // Find all comments that belong to the specified post ID and fall within the highlighted range
//     const comments = await Comment.find({
//       postId,
//       start: { $gte: start },
//       end: { $lte: end },
//     });

//     res.status(200).json(comments);
//   } catch (error) {
//     console.error('Error fetching comments:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// module.exports = router;
