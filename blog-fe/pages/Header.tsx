import { LogoTwitter } from 'react-ionicons';
import { LogoGithub } from 'react-ionicons';
import { LogoRss } from 'react-ionicons';
import { Newspaper } from 'react-ionicons';

export const Header = () => {
  return (
    <header className='px-16 fixed top-0 left-0 w-full z-10 header flex justify-between items-center h-[104px]'>
      <div className='flex items-center'>
        <img
          src='/images/Debbie_pfp.jpeg'
          alt='a photo of debbie'
          className='rounded-full'
          width={40}
          height={40}
        />

        <h1 className='font-bold text-2xl ml-4'>Code Chunks</h1>
      </div>
      <div className='flex items-center px-2'>
        <LogoTwitter style={{ color: 'white', fill: 'white' }} />
        <LogoGithub style={{ color: 'white', fill: 'white' }} />
        <Newspaper style={{ color: 'white', fill: 'white' }} />
        <LogoRss style={{ color: 'white', fill: 'white' }} />
      </div>
    </header>
  );
};
