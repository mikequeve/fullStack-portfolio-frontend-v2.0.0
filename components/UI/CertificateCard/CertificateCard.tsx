import React from 'react';
import './CertificateCard.css';
import { Scan } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { CertificateCardProps } from '@/utils/types.d';

const CertificateCard: React.FC<CertificateCardProps> = ({ imageUrl }) => {
  const { openModal } = useAppContext();
  return (
    <div className='flex-center certificate__card' onClick={() => openModal(imageUrl)}>
      <img src={imageUrl} alt='' />
      <div className='flex-column certificate__card-overlay'>
        <Scan size={40} strokeWidth={3} />
        <h5>Full Mode</h5>
      </div>
    </div>
  );
};

export default CertificateCard;
