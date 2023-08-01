// @ts-nocheck

import { createContext, useState, useEffect } from 'react';
import { fetchBlogPosts } from '../api/posts';
import { BlogPost, BlogContextType } from './BlogTypes';

const BlogContext = createContext<BlogContextType>({
  blogData: [],
  setBlogData: () => {},
});

export const BlogProvider: React.FC = ({ children }) => {
  const [blogData, setBlogData] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchBlogPosts();
      setBlogData(data);
    }
    fetchData();
  }, []);

  return (
    <BlogContext.Provider value={{ blogData, setBlogData }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContext;
