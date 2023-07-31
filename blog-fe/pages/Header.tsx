import { LogoTwitter } from 'react-ionicons';
import { LogoGithub } from 'react-ionicons';
import { LogoRss } from 'react-ionicons';
import { Newspaper } from 'react-ionicons';

export const Header = () => {
  return (
    <header className='flex px-32 header flex-col md:flex-row justify-between items-center py-[16px]  z-50 w-full border-b relative border-transparent md:border-none'>
      <div className='flex items-center md:pb-0 pb-4'>
        <img
          src='/images/Debbie_pfp.jpeg'
          alt='a photo of debbie'
          className='rounded-full'
          width={40}
          height={40}
        />
        <h1 className='font-semibold text-2xl ml-4 sm:pl-3 whitespace-nowrap'>
          Code Chunks
        </h1>
      </div>
      <div className='flex items-center gap-4 justify-center sm:justify-between ml-8'>
        <a
          href='https://twitter.com/tbrmonster'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:bg-white/20 rounded-full p-2'
        >
          <LogoTwitter
            style={{
              color: 'white',
              fill: 'white',
            }}
          />
        </a>
        <a
          href='https://github.com/thatgirldorian'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:bg-white/20 rounded-full p-2'
        >
          <LogoGithub style={{ color: 'white', fill: 'white' }} />
        </a>
        <a
          href='https://codechunks.hashnode.dev/'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:bg-white/20 rounded-full p-2'
        >
          <Newspaper style={{ color: 'white', fill: 'white' }} />
        </a>
        <a
          href='https://codechunks.hashnode.dev/rss.xml'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:bg-white/20 rounded-full p-2'
        >
          <LogoRss style={{ color: 'white', fill: 'white' }} />
        </a>
      </div>
    </header>
  );
};
