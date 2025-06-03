'use client';

import React, { useEffect, useState } from 'react';
import './Portfolio.css';
import Loader from '../UI/Loader/Loader';
import { useAppContext } from '@/context/AppContext';
import ProjectCard from '../UI/ProjectCard/ProjectCard';
import { useTranslations } from 'next-intl';
import CertificateCard from '../UI/CertificateCard/CertificateCard';
import Modal from '../UI/Modal/Modal';

const Portfolio: React.FC = () => {
  const { projects, certificates, loading, isModalOpen, setIsModalOpen, selectedImg } =
    useAppContext();
  const [content, setContent] = useState<boolean>(true);
  const t = useTranslations('Portfolio');

  return (
    <>
      <section className='flex-center site__portfolio' id='Portfolio'>
        <article className='flex-column container'>
          <div className='flex-column section__subtitle' data-aos='fade-up'>
            <h2 className='subtitle'>{t('title')}</h2>
            <p>{t('text')}</p>
          </div>
          <div className='flex-center filter__container'>
            <button
              onClick={() => setContent(true)}
              className={`${content ? 'active' : ''} filter__btn`}
            >
              {t('projects')}
            </button>
            <button
              onClick={() => setContent(false)}
              className={`${content === false ? 'active' : ''} filter__btn`}
            >
              {t('certificates')}
            </button>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className='flex-center portfolio__content'>
              {content
                ? projects.map((project, index) => (
                    <div
                      key={index}
                      data-aos={
                        index % 3 === 0
                          ? 'fade-up-right'
                          : index % 3 === 1
                          ? 'fade-up'
                          : 'fade-up-left'
                      }
                      data-aos-duration='1000'
                    >
                      <ProjectCard
                        id={project.projectId}
                        img={project.imageUrl}
                        title={project.title}
                        description={project.description}
                        demoLink={project.demoLink}
                        repoLink={project.repoLink}
                      />
                    </div>
                  ))
                : certificates.map((certificate, index) => (
                    <div
                      className='flex-center'
                      key={index}
                      data-aos={
                        index % 3 === 0
                          ? 'fade-up-right'
                          : index % 3 === 1
                          ? 'fade-up'
                          : 'fade-up-left'
                      }
                      data-aos-duration='1000'
                    >
                      <CertificateCard imageUrl={certificate.imageUrl} />
                    </div>
                  ))}
            </div>
          )}
        </article>
      </section>
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        imageUrl={selectedImg || undefined}
      />
    </>
  );
};

export default Portfolio;
