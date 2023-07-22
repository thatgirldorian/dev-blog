import { BlogPage } from './BlogPage';

export default function Home() {
  return (
    <div>
      <header className='bg-red-300 px-12'>
        <h1>Debbie's Dev blog</h1>
        <p>
          Hi! I'm writing about front-end development and learning in public.
        </p>
      </header>
      <div>
        <h2 className='px-12 mt-12'>Blog</h2>
        <BlogPage />
      </div>
    </div>
  );
}
