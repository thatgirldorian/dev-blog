import { AppProps } from 'next/app';
import '../styles/globals.css';

import { BlogProvider } from '../contexts/BlogContext';

function App({ Component, pageProps }: AppProps) {
  return (
    <BlogProvider>
      <Component {...pageProps} />;
    </BlogProvider>
  );
}

export default App;
