import axios from 'axios';

const imageFileNames = [
  'Post_1_img.jpg',
  'Post_2_img.jpg',
  'Post_3_img.jpg',
  'Post_4_img.jpg',
  'Post_5_img.jpg',
  'Post_6_img.jpg',
];

export async function fetchBlogPosts() {
  try {
    const response = await axios.get('/api/posts');
    const data = response.data;

    // Update the data to include the imageFileName for each post
    const blogDataWithImages = data.map((post, index) => ({
      ...post,
      imageFileName: imageFileNames[index % imageFileNames.length],
    }));

    return blogDataWithImages;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function fetchBlogPostById(postId) {
  const response = await axios.get(`/api/posts/${postId}`);
  const data = response.data;
  return data;
}

export async function updateBlogPost(postId, postData) {
  try {
    const response = await axios.put(`/api/posts/${postId}`, postData);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
}

// Fetches comment for a specific post by its postId
export const fetchCommentsByPostId = async (postId) => {
  try {
    const response = await axios.get(`/api/posts/${postId}/comments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

// import axios from 'axios';

// const imageFileNames = [
//   'Post_1_img.jpg',
//   'Post_2_img.jpg',
//   'Post_3_img.jpg',
//   'Post_4_img.jpg',
//   'Post_5_img.jpg',
//   'Post_6_img.jpg',
// ];

// export async function fetchBlogPosts() {
//   try {
//     const response = await fetch('/api/posts');
//     const data = await response.json();

//     // Update the data to include the imageFileName for each post
//     const blogDataWithImages = data.map((post, index) => ({
//       ...post,
//       imageFileName: imageFileNames[index % imageFileNames.length],
//     }));

//     return blogDataWithImages;
//   } catch (error) {
//     console.error('Error fetching blog posts:', error);
//     return [];
//   }
// }

// export async function fetchBlogPostById(postId) {
//   const response = await fetch(`/api/posts/${postId}`);
//   const data = await response.json();
//   return data;
// }

// export async function updateBlogPost(postId, postData) {
//   try {
//     const response = await fetch(`/api/posts/${postId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(postData),
//     });
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error updating blog post:', error);
//     throw error;
//   }
// }

// // Fetches comment for a specific post by its postId
// export const fetchCommentsByPostId = async (postId) => {
//   try {
//     const response = await axios.get(`/api/posts/${postId}/comments`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching comments:', error);
//     throw error;
//   }
// };
