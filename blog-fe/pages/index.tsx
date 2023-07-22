import { BlogPage } from './BlogPage';

export default function Home() {
  return (
    <div>
      <header className='bg-red-300 px-16'>
        <h1>Debbie's Dev blog</h1>
        <p>
          Hi! I'm writing about front-end development and learning in public.
        </p>
      </header>
      <div className='px-12'>
        <BlogPage />
      </div>
    </div>
  );
}
