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
