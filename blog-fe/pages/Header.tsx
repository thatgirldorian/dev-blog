import { LogoTwitter } from 'react-ionicons';
import { LogoGithub } from 'react-ionicons';
import { LogoRss } from 'react-ionicons';
import { Newspaper } from 'react-ionicons';

export const Header = () => {
  return (
    // <header className='px-32 fixed top-0 left-0 w-full z-10 header flex justify-between items-center h-[104px]'>
    //   <div className='flex items-center'>
    //     <img
    //       src='/images/Debbie_pfp.jpeg'
    //       alt='a photo of debbie'
    //       className='rounded-full'
    //       width={40}
    //       height={40}
    //     />

    //     <h1 className='font-semibold text-2xl ml-4'>Code Chunks</h1>
    //   </div>
    //   <div className='flex items-center px-2 gap-4'>
    //     <LogoTwitter
    //       style={{ color: 'white', fill: 'white' }}
    //       height='24px'
    //       width='24px'
    //     />
    //     <LogoGithub style={{ color: 'white', fill: 'white' }} />
    //     <Newspaper style={{ color: 'white', fill: 'white' }} />
    //     <LogoRss style={{ color: 'white', fill: 'white' }} />
    //   </div>
    // </header>

    <header className='px-32 fixed top-0 left-0 w-full z-10 header flex flex-col md:flex-row justify-between items-center min-h-[104px] py-[16px] md:py-0'>
      <div className='flex items-center md:pb-0 pb-4 '>
        <img
          src='/images/Debbie_pfp.jpeg'
          alt='a photo of debbie'
          className='rounded-full'
          width={40}
          height={40}
        />
        <h1 className='font-semibold text-2xl ml-4 sm:pl-3 '>Code Chunks</h1>
      </div>
      <div className='flex items-center gap-4 md:ml-4 md:gap-8'>
        <LogoTwitter
          style={{ color: 'white', fill: 'white' }}
          height='24px'
          width='24px'
        />
        <LogoGithub style={{ color: 'white', fill: 'white' }} />
        <Newspaper style={{ color: 'white', fill: 'white' }} />
        <LogoRss style={{ color: 'white', fill: 'white' }} />
      </div>
    </header>
  );
};
