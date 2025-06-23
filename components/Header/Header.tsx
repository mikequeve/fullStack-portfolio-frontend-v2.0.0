'use client';

import React, { useEffect, useState } from 'react';
import './Header.css';
import { AlignJustify, X } from 'lucide-react';
import { NavItem } from '@/utils/types.d';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [locale, setLocale] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const cookieLocale = document.cookie
      .split('; ')
      .find((row) => row.startsWith('MYNEXTPORTF_LOCALE='))
      ?.split('=')[1];
    if (cookieLocale) {
      setLocale(cookieLocale);
    } else {
      const browserLocate = navigator.language.slice(0, 2);
      setLocale(browserLocate);
      document.cookie = `MYNEXTPORTF_LOCALE=${browserLocate}`;
      router.refresh();
    }
  }, [router]);

  const changeLocale = (newLocale: string) => {
    document.location.reload();
    setLocale(newLocale);
    document.cookie = `MYNEXTPORTF_LOCALE=${newLocale}`;
    router.refresh();
  };

  const t = useTranslations('MenuItems');

  const navItems: NavItem[] = [
    { href: '#Home', label: t('home') },
    { href: '#About', label: t('about') },
    { href: '#Portfolio', label: t('portfolio') },
    { href: '#Contact', label: t('contact') },
  ];

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ): void => {
    e.preventDefault();
    const section = document.querySelector(href) as HTMLElement;
    if (section) {
      const top = section.offsetTop - 100;
      window.scrollTo({
        top: top,
        behavior: 'smooth',
      });
      setIsOpen(false);
    }
  };

  return (
    <>
      <header className='flex-center navbar'>
        <article className='flex-center container'>
          <a href='/' className='navbar__logo'>
            <img src='./logo-white.svg' alt='mike.vega logo' />
          </a>
          <nav className={`flex-column navbar__nav ${isOpen ? 'active' : ''}`}>
            <div className='flex-column navbar__nav-wrapper'>
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className='navbar__nav-item'
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className='flex-center translate__container'>
              <a
                onClick={() => changeLocale('es')}
                className={`${locale === 'es' ? 'locale__active' : ''}`}
              >
                ES
              </a>
              <div className='separator'></div>
              <a
                onClick={() => changeLocale('en')}
                className={`${locale === 'en' ? 'locale__active' : ''}`}
              >
                EN
              </a>
            </div>
          </nav>
          <div
            className='flex-center menu__btn-container'
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X color='#8a8a8a' size='2rem' />
            ) : (
              <AlignJustify color='#8a8a8a' size='2rem' />
            )}
          </div>
        </article>
      </header>
    </>
  );
};

export default Header;
