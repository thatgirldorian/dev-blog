// @ts-nocheck

import React, { ReactNode, MouseEventHandler } from 'react';

interface ButtonProps {
  icon?: ReactNode;
  text: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({
  icon,
  text,
  className = '',
  onClick,
}) => {
  return (
    <button
      className={`flex items-center mt-4 rounded-full text-black px-6 py-2 font-medium ${className}`}
      onClick={onClick}
    >
      {icon && <span className='mr-2'>{icon}</span>}
      {text}
    </button>
  );
};

export default Button;
