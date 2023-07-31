export async function fetchComments(postId) {
  try {
    const response = await fetch(
      `http://localhost:5001/api/posts/${postId}/comments`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
}

export async function addComment(postId, commentData) {
  try {
    const response = await fetch(
      `http://localhost:5001/api/posts/${postId}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
}
