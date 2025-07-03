'use client';

import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';
import { SquareArrowOutUpRight, MailIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

const Hero: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(true);
  const t = useTranslations('Hero');
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = (): void => {
      const homeSection = document.getElementById('Home');
      if (!homeSection) return;

      const rect = homeSection.getBoundingClientRect();
      const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;
      const isAtTop = rect.top > -50;

      if (isVisible && isAtTop) {
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
        scrollTimeout.current = setTimeout(() => {
          setScrolled(false);
        }, 4000);
      } else {
        setScrolled(true);
      }
    };

    scrollTimeout.current = setTimeout(() => {
      setScrolled(false);
    }, 4000);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return (
    <section className='flex-center hero__section' id='Home'>
      <article className='flex-center container'>
        <div className='flex-column hero__text-container'>
          <h1 className='hero__title' data-aos='fade-down' data-aos-duration='600'>
            {t.rich('title', {
              span: (chunks) => <span>{chunks}</span>,
              img: () => (
                <img src='./banner-img.png' alt='hero image' className='profile__img' />
              ),
              br: () => <br />,
              div: () => <div className='hero__separator'></div>,
            })}
          </h1>
          <p className='hero__paragraph' data-aos='fade-up' data-aos-duration='1000'>
            {t('heroText')}
          </p>
          <aside
            className='flex-center hero__btns-container'
            data-aos='fade-up'
            data-aos-duration='1200'
          >
            <a href='#Portfolio' className='primary__btn'>
              {t('primaryBtn')} <SquareArrowOutUpRight className='icon' />
            </a>
            <a href='#Contact' className='flex-center primary__btn'>
              {t('secondaryBtn')} <MailIcon className='icon' />
            </a>
          </aside>
          <div className={`flex-column scroll__down ${scrolled ? 'disable' : ''}`}>
            <img src='./scroll-down.gif' alt='' />
            <p>{t('scrollDown')}</p>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Hero;
