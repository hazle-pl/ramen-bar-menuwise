import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  paddingBottom?: string;
  paddingTop?: string;
  background?: string;
  anchor?: string;
}

const ContainerNoWrapper: React.FC<ContainerProps> = ({ children, paddingBottom, paddingTop, background, anchor }) => {
  const classes = [
    paddingBottom ? `pb-${paddingBottom}` : '',
    paddingTop ? `pt-${paddingTop}` : '',
    background ? `bg-${background}` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div id={anchor} className={`container ${classes}`}>
        {children}
    </div>
  );
};

export default ContainerNoWrapper;
