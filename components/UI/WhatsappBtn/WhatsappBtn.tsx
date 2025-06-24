import React from 'react';
import './WhatsappBtn.css';
import { useTranslations } from 'next-intl';

const WhatsappBtn: React.FC = () => {
  const t = useTranslations('whatsappBtn');
  return (
    <a
      href='https://api.whatsapp.com/send?phone=50660488396'
      rel='noopener noreferrer'
      target='_blank'
      className='flex-center primary__btn whats-btn'
    >
      <div className='flex-column  whats-message__container'>
        <span>{t('title')}</span>
      </div>
      <img src='./logos/whatsapp.png' alt='' />
    </a>
  );
};

export default WhatsappBtn;
