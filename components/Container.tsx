import React from 'react';
import ContentWrapper from './ContentWrapper';
import useVisibilityAnimation from '@/lib/useVisibilityAnimation';

interface ContainerProps {
  children: React.ReactNode;
  paddingBottom?: string;
  paddingTop?: string;
  background?: string;
  anchor?: string;
}

const Container: React.FC<ContainerProps> = ({ children, paddingBottom, paddingTop, background, anchor }) => {
  const classes = [
    paddingBottom ? `pb-${paddingBottom}` : '',
    paddingTop ? `pt-${paddingTop}` : '',
    background ? `bg-${background}` : '',
  ]
    .filter(Boolean)
    .join(' ');

  const { isVisible, elementRef } = useVisibilityAnimation(0.3);

  return (
    <div id={anchor} ref={elementRef} className={`container ${classes} ${isVisible ? 'visible' : ''}`}>
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </div>
  );
};

export default Container;
