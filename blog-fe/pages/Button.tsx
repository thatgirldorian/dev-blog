import { PencilOutline } from 'react-ionicons';

export const Button = () => {
  return (
    <button className='flex items-center mt-4 bg-white rounded-full text-black px-4 py-2 font-medium'>
      <PencilOutline className='mr-2' />
      <a>Create Post</a>
    </button>
  );
};
