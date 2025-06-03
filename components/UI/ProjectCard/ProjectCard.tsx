import React from 'react';
import './ProjectCard.css';
import { Globe, ArrowRight } from 'lucide-react';
import { ProjectCardProps } from '@/utils/types.d';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  img,
  title,
  description,
  demoLink,
}) => {
  const t = useTranslations('Projects');
  const translatedTitle = t(`project-${id}.title`, { default: title });
  const translatedDesc = t(`project-${id}.description`, {
    default: description,
  });

  return (
    <div className='project__card'>
      <img src={img} alt={`${title} - project image`} />
      <div className='project__card-content'>
        <h4>{translatedTitle}</h4>
        <p>{translatedDesc}</p>
        <div className='flex-center project__card-footer'>
          <a
            href={demoLink}
            target='_blank'
            rel='noopener noreferer'
            className='flex-center project__link'
          >
            Demo <Globe className='project__icon' />
          </a>
          <Link href={`/projects/${id}`} className='flex-center project__link details'>
            {t('details')} <ArrowRight className='project__icon' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
