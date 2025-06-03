'use client';
import React, { FormEvent, useRef, useState } from 'react';
import { Share2, User, AtSign, MessageSquareMore, Mail, Smartphone } from 'lucide-react';
import './Contact.css';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import { ContactFormElement, FormData, FormErrors } from '@/utils/types.d';
import { useTranslations } from 'next-intl';

const Contact: React.FC = () => {
  const form = useRef<ContactFormElement>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const t = useTranslations('Contact');

  const validateForm = (data: FormData): boolean => {
    const newErrors: FormErrors = {};

    if (!data.user_name.trim()) {
      newErrors.user_name = t('formErrors.nameReq');
    } else if (data.user_name.length < 3) {
      newErrors.user_name = t('formErrors.nameLength');
    } else if (/\d/.test(data.user_name) || !/^[a-zA-Z\s]+$/.test(data.user_name)) {
      newErrors.user_name = t('formErrors.nameValid');
    }

    if (!data.user_email.trim()) {
      newErrors.user_email = t('formErrors.emailReq');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.user_email)) {
      newErrors.user_email = t('formErrors.emailValid');
    }

    if (!data.message.trim()) {
      newErrors.message = t('formErrors.messageReq');
    } else if (data.message.length > 255) {
      newErrors.message = t('formErrors.messageLength');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmail = async (e: FormEvent<ContactFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    const formData: FormData = {
      user_name: form.current.elements.user_name.value,
      user_email: form.current.elements.user_email.value,
      message: form.current.elements.message.value,
    };

    if (!validateForm(formData)) {
      return;
    }

    try {
      Swal.fire({
        title: t('formProcess.sendingFormTitle'),
        html: t('formProcess.sendingFormText'),
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await emailjs.sendForm('service_272gaat', 'template_i3z4bv3', form.current, {
        publicKey: 'buOi1Jgl7vKM4jKdE',
      });
      Swal.fire({
        title: t('formProcess.messageSent'),
        icon: 'success',
        text: t('formProcess.messageSentText'),
        timer: 2000,
        timerProgressBar: true,
      });
      form.current.reset();
    } catch (error) {
      Swal.fire({
        title: 'Error!!!',
        icon: 'error',
        text: t('formProcess.messageErrorText'),
        timer: 2000,
        timerProgressBar: true,
      });
      console.log('Email error: ', error);
    }
  };
  return (
    <section className='flex-center site__contact' id='Contact'>
      <article className='flex-column container'>
        <div
          className='flex-column section__subtitle'
          data-aos='fade-up'
          data-aos-duration='700'
        >
          <h2 className='subtitle'>{t('title')}</h2>
          <p>{t('subtitle')}</p>
        </div>
        <div className='flex-column contact__content' data-aos='fade-up'>
          <div
            className='flex-center contact__title'
            data-aos='fade-up'
            data-aos-delay='50'
            data-aos-duration='900'
          >
            <h3>{t('formTitle')}</h3>
            <Share2 className='contact__title-icon' />
          </div>
          <div className='flex-center form__content'>
            <div className='flex-center form__container'>
              <form ref={form} onSubmit={sendEmail} className='flex-column form'>
                <div
                  className='flex-center input-field'
                  data-aos='fade-up'
                  data-aos-duration='900'
                >
                  <User className='input__icon' />
                  <input
                    type='text'
                    name='user_name'
                    placeholder={t('formName')}
                    autoComplete='off'
                  />
                </div>
                {errors.user_name && (
                  <span className='form__error'>{errors.user_name}</span>
                )}
                <div
                  className='flex-center input-field'
                  data-aos='fade-up'
                  data-aos-duration='900'
                >
                  <AtSign className='input__icon' />
                  <input
                    type='text'
                    name='user_email'
                    placeholder={t('formEmail')}
                    autoComplete='off'
                  />
                </div>
                {errors.user_email && (
                  <span className='form__error'>{errors.user_email}</span>
                )}
                <div
                  className='flex-center input-field'
                  data-aos='fade-up'
                  data-aos-duration='900'
                >
                  <MessageSquareMore className='input__icon' />
                  <textarea
                    placeholder={t('formMessage')}
                    rows={6}
                    name='message'
                  ></textarea>
                </div>
                {errors.message && <span className='form__error'>{errors.message}</span>}

                <button
                  type='submit'
                  className='form__btn'
                  data-aos='fade-up'
                  data-aos-duration='900'
                  data-aos-anchor='bottom-bottom'
                >
                  {t('formButton')}
                </button>
              </form>
            </div>
            <div className='separator'></div>
            <div className='social__container'>
              <h5>{t('connectTitle')}</h5>
              <div
                className='flex-center input-field'
                data-aos='fade-up'
                data-aos-duration='900'
              >
                <Mail className='social__icon' />
                <h6>michaelvega46@gmail.com</h6>
              </div>
              <div className='flex-center social__content'>
                <a
                  href='https://api.whatsapp.com/send?phone=50660488396'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex-center input-field'
                  data-aos='fade-up'
                  data-aos-duration='900'
                >
                  <Smartphone className='social__icon' />
                  <span>+50660488396</span>
                </a>
                <a
                  href='https://www.behance.net/michaelvega12'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex-center input-field'
                  data-aos='fade-up'
                  data-aos-duration='900'
                >
                  <img src='./Benhance.png' alt='' className='social__icon' />
                  <span>Behance</span>
                </a>
                <a
                  href='https://www.linkedin.com/in/mikequeve/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex-center input-field'
                  data-aos='fade-up'
                  data-aos-duration='900'
                >
                  <img src='./Linkedin.png' alt='' className='social__icon' />
                  <span>Linkedin</span>
                </a>
                <a
                  href='https://github.com/mikequeve'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex-center input-field'
                  data-aos='fade-up'
                  data-aos-duration='900'
                >
                  <img src='./Github.png' alt='' className='social__icon' />
                  <span>Github</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Contact;
