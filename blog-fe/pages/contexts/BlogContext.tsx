import { createContext, useState } from 'react';

const BlogContext = createContext();

const BlogProvider = ({ children }) => {
  const [blogData, setBlogData] = useState([]);

  return (
    <BlogContext.Provider value={{ blogData, setBlogData }}>
      {children}
    </BlogContext.Provider>
  );
};

export { BlogContext, BlogProvider };
