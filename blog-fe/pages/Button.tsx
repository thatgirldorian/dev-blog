import { PencilOutline } from 'react-ionicons';

export const Button = ({ icon, text, className }) => {
  return (
    <button
      className={`flex items-center mt-4 rounded-full text-black px-6 py-2 font-medium ${className}`}
    >
      {icon && <span className='mr-2'>{icon}</span>}
      {text}
    </button>
  );
};
