export const AuthorCard = () => {
  return (
    <div className='author-card flex flex-col items-center pt-32 pb-16 md:py-24 '>
      <img
        src='/images/Debbie_pfp.jpeg'
        alt='a photo of debbie'
        height='112px'
        width='112px'
        className='rounded-full'
      />
      <p className='font-bold text-[30px]'>Debbie Otuagomah</p>
      <p className='font-bold'>8 followers</p>
      <p className='text-center px-4 text-[#111111]'>
        {' '}
        Hi! I'm Debbie, a web developer writing about development and learning
        in public.
      </p>
    </div>
  );
};
