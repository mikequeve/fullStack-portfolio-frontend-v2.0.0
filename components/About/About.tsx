'use client';

import React from 'react';
import './About.css';
import { FileText, CodeXml, Award, Waypoints, SquareArrowOutUpRight } from 'lucide-react';
import { Stack, StatItem } from '@/utils/types.d';
import { useAppContext } from '@/context/AppContext';
import { useTranslations } from 'next-intl';

const stack: Stack[] = [
  { name: 'react', img: './logos/react.png' },
  { name: 'javaScript', img: './logos/javascript.png' },
  { name: 'tailwind', img: './logos/tailwind.png' },
  { name: 'figma', img: './logos/figma.png' },
  { name: 'wordpress', img: './logos/wordpress.png' },
  { name: 'photoshop', img: './logos/photoshop.png' },
  { name: 'illustrator', img: './logos/illustrator.png' },
  { name: 'java', img: './logos/java.png' },
  { name: 'sql databases', img: './logos/sql.png' },
  { name: 'typescript', img: './logos/typescript.png' },
];

const About = () => {
  const { projects } = useAppContext();
  const t = useTranslations('About');

  const statsData: StatItem[] = [
    { icon: CodeXml, label: t('projectStats'), value: `0${projects.length}` },
    { icon: Award, label: t('certificateStats'), value: '06' },
    { icon: Waypoints, label: t('experienceStats'), value: '01' },
  ];

  return (
    <section className='flex-center site__about' id='About'>
      <article className='flex-column container'>
        <div className='flex-column section__subtitle'>
          <h2 className='subtitle' data-aos='fade-up' data-aos-duration='800'>
            {t('title')}
          </h2>
        </div>
        <div className='flex-center about__content'>
          <div
            className='flex-column about__text-container'
            data-aos='fade-right'
            data-aos-duration='800'
          >
            <h3>{t('greeting')}</h3>
            <span>{t('name')}</span>
            <p>{t('text')}</p>
            <div className='tech__container flex-center'>
              {stack.map((item, index) => (
                <div className='tech__btn flex-center' key={index}>
                  <img src={item.img} alt={`${item.img} logo`} />
                </div>
              ))}
            </div>
            <a
              href='https://drive.google.com/file/d/1qBGzqZcRNcBa9PosYOLx0LRv6e1VRINn/view?usp=sharing'
              rel='noopenner noreferrer'
              target='_blank'
              className='secondary__btn'
            >
              {t('button')} <FileText />
            </a>
          </div>
          <div className='flex-column stats__container'>
            {statsData.map((item, index) => {
              return (
                <div
                  className='flex-column stat__card'
                  key={index}
                  data-aos='fade-left'
                  data-aos-duration='1000'
                >
                  <div className='flex-center stat__card-header'>
                    <span className='flex-center stat__icon'>
                      <item.icon />
                    </span>
                    <h3 className='stat__value'>{item.value}</h3>
                  </div>
                  <div className='flex-center stat__card-footer'>
                    <p>{item.label}</p>
                    <SquareArrowOutUpRight className='stat__card-arrow' />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </article>
    </section>
  );
};

export default About;
