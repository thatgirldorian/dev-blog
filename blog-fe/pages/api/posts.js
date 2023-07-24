export async function fetchBlogPosts() {
  try {
    const response = await fetch('http://localhost:5001/api/posts');
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function fetchBlogPostById(postId) {
  const response = await fetch(`/api/posts/${postId}`);
  const data = await response.json();
  return data;
}

export async function updateBlogPost(postId, postData) {
  try {
    const response = await fetch(`/api/posts/${postId}`, {
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
