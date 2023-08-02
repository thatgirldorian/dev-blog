//add a handler that gets posts by id for a get request
import mongoose from 'mongoose';
import Post from '../../../../models/postModel';

//gget the post by id and return it in the response
// import dbConnect from '../../../../lib/dbConnect';

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     const postId = req.query.id;

//     if (!postId) {
//       return res
//         .status(400)
//         .json({ message: 'Post ID is missing in the request' });
//     }

//     try {
//       const { db } = await dbConnect();

//       const post = await db.collection('posts').findOne({ _id: postId });

//       if (!post) {
//         return res.status(404).json({ message: 'Post not found' });
//       }

//       res.status(200).json(post);
//     } catch (error) {
//       console.error('Error fetching blog post:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   } else {
//     res.status(405).end();
//   }
// }

//Handle fetching posts by Id
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const postId = req.query.id;

    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'No blog post found.' });
      }

      res.status(200).json(post);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'PUT') {
    const postId = req.query.id;
    const { title, author, content, draft } = req.body;

    try {
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
          title,
          content,
          author,
          draft,
          updatedAt: new Date(),
        },
        { new: true } // Return the updated post
      );

      if (!updatedPost) {
        return res.status(404).json({ message: 'No blog post found.' });
      }

      res.json(updatedPost);
    } catch (error) {
      console.log('There was an error updating this blog post.', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    // Return a 405 Method Not Allowed status code for unsupported methods
    res.status(405).end();
  }
}
