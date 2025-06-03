import './Modal.css';
import { ModalProps } from '@/utils/types.d';
import { X } from 'lucide-react';
import React from 'react';

const Modal: React.FC<ModalProps> = ({ isModalOpen, setIsModalOpen, imageUrl }) => {
  return (
    <>
      {isModalOpen && (
        <article className='flex-center modal__overlay '>
          <div className='flex-center modal'>
            <img src={imageUrl} alt='' />
            <button className='flex-center' onClick={() => setIsModalOpen(!isModalOpen)}>
              <X />
            </button>
          </div>
        </article>
      )}
    </>
  );
};

export default Modal;
