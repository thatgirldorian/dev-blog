export interface BlogComment {
  _id: string;
  postId: string;
  author: string;
  content: string;
  start: number;
  end: number;
  date: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  imageFileName: string;
  author: string;
  date: string;
  content: string;
}

export interface BlogContextType {
  blogData: BlogPost[];
  setBlogData: React.Dispatch<React.SetStateAction<BlogPost[]>>;
}
