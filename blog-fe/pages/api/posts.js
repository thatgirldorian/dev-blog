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
    const response = await fetch('http://localhost:5001/api/posts');
    const data = await response.json();

    // Update the data to include the imageFileName for each post
    const blogDataWithImages = data.map((post, index) => ({
      ...post,
      imageFileName: imageFileNames[index % imageFileNames.length], // Use modulo to loop through the imageFileNames array
    }));

    console.log(data);
    return blogDataWithImages;
    // return data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function fetchBlogPostById(postId) {
  const response = await fetch(`http://localhost:5001/api/posts/${postId}`);
  const data = await response.json();
  return data;
}

export async function updateBlogPost(postId, postData) {
  try {
    const response = await fetch(`http://localhost:5001/api/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
}

// This function fetches comments for a specific post by its postId
export const fetchCommentsByPostId = async (postId) => {
  try {
    const response = await axios.get(
      `http://localhost:5001/api/posts/${postId}/comments`
    );
    return response.data;
    console.log(data); // Assuming the API returns an array of comments
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};
