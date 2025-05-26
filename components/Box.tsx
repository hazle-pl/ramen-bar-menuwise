import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  padding?: string;
  background?: string;
  justify?: string;
  display?: string;
}

const Container: React.FC<ContainerProps> = ({ children, padding, background, justify, display }) => {
  const classes = [
    padding ? `p-${padding}` : '',
    background ? `bg-${background}` : '',
    justify ? `${justify}` : '',
    display ? `${display}` : ''
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`box ${classes}`}>
        {children}
    </div>
  );
};

export default Container;
