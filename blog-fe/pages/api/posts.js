export async function fetchBlogPosts() {
  const response = await fetch('/api/posts'); // Replace with your actual API route URL
  const data = await response.json();
  return data;
}
