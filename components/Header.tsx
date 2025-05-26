import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ContainerContent from './ContentWrapper';
import LanguageSelector from '@/atoms/LanguageSelector';
import Image from 'next/image';
import useVisibilityAnimation from '@/lib/useVisibilityAnimation';
import router from 'next/router';

const Header: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);

  const { isVisible, elementRef } = useVisibilityAnimation(0.3);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <header ref={elementRef} className={`${isSticky ? 'sticky' : ''} ${isVisible ? 'visible' : ''}`}>
      <ContainerContent>
        <Link className="logo" href="/" onClick={handleLinkClick}>
          {isSticky ? (
            <Image width={100} height={50} alt="Hazle - logotyp wersja czarna" src="/assets/logo-hazle-black.png" />
          ) : (
            <Image width={100} height={50} alt="Hazle - logotyp wersja biała" src="/assets/logo-hazle-white.png" />
          )}
        </Link>
        <div className="menu">
          <LanguageSelector />
        </div>
      </ContainerContent>
    </header>
  );
};

export default Header;
