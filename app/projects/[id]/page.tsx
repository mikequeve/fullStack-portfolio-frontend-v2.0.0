'use client';

import React, { useEffect, useState } from 'react';
import Background from '@/components/Background/Background';
import './ProjectDetails.css';
import { ArrowLeft, ChevronRight, SquareCode, Github, Globe } from 'lucide-react';
import Loader from '@/components/UI/Loader/Loader';
import { useAppContext } from '@/context/AppContext';
import { Project } from '@/utils/types.d';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const ProjectDetails: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;
  const { getProjectById } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadProject = async () => {
      setLoading(true);
      try {
        const data = await getProjectById(id);
        setProject(data);
      } catch (error) {
        console.error('Error al cargar la información del proyecto');
      } finally {
        setLoading(false);
      }
    };
    loadProject();
  }, [id]);

  const { title, description, imageUrl, demoLink, repoLink, stack } = project || {};
  const stackArray = stack?.split(',').map((item) => item.trim()) || [];

  const t = useTranslations('Projects');
  const translatedTitle = t(`project-${id}.title`, { default: title || '' });
  const translatedDesc = t(`project-${id}.description`, {
    default: description || '',
  });

  return (
    <>
      <Background />
      <section className='flex-center project__details'>
        <article className='container flex-column'>
          <div className='breadcrumbs'>
            <a onClick={() => router.back()} className='flex-center tech__btn'>
              <ArrowLeft size={20} strokeWidth={2} />
              {t('backButton')}
            </a>
            <div className='flex-center'>
              <span>{t('breadCrump')}</span>
              <ChevronRight size={20} strokeWidth={2} className='chevron' />
              <span>{title}</span>
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className='project__details-content flex-center'>
              <div className='flex-column left__side side'>
                <h3>{translatedTitle}</h3>
                <p>{translatedDesc}</p>
                <div className='flex-column stack__container'>
                  <div className='flex-center'>
                    <SquareCode
                      size={26}
                      strokeWidth={2}
                      color='#4c3289'
                      className='code'
                    />
                    <h5>{t('tech')}</h5>
                  </div>
                  <div className='stack__content flex-center'>
                    {stackArray.map((item, index) => (
                      <div key={index} className='flex-center tech__btn'>
                        <img src={`../../logos/${item}.png`} alt={`${item}-logo`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className='flex-column right__side side'>
                <img src={imageUrl} alt='' />
                <div className='flex-center actions__container'>
                  <div className='flex-center tech__btn button'>
                    <Globe />
                    <a href={demoLink} target='_blank' rel='noopener noreferer'>
                      DEMO
                    </a>
                  </div>
                  {repoLink ? (
                    <div className='flex-center tech__btn button'>
                      <Github />
                      <a href={repoLink} target='_blank' rel='noopener noreferer'>
                        GITHUB
                      </a>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          )}
        </article>
      </section>
    </>
  );
};

export default ProjectDetails;
