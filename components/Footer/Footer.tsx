import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  const socialIcons = [
    {
      name: 'github',
      link: 'https://github.com/mikequeve',
      img: './Github.png',
    },
    {
      name: 'behance',
      link: 'https://www.behance.net/michaelvega12',
      img: './Benhance.png',
    },
    {
      name: 'linkedin',
      link: 'https://linkedin.com/in/mikequeve',
      img: './Linkedin.png',
    },
  ];
  return (
    <footer className='flex-center'>
      <article className='container flex-center'>
        <img src='/logo-white.svg' alt='Mike.Vega logo' className='footer-logo' />
        <div className='flex-center footer__icons'>
          {socialIcons.map((icon, index) => (
            <a
              href={icon.link}
              key={index}
              target='_blank'
              rel='noopener noreferer'
              className='flex-center social__btn'
            >
              <img src={icon.img} alt={icon.name} />
            </a>
          ))}
        </div>
      </article>
    </footer>
  );
};

export default Footer;
