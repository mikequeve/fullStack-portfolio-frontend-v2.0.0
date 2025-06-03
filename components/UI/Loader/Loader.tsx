import React from 'react';
import { NewtonsCradle } from 'ldrs/react';
import 'ldrs/react/NewtonsCradle.css';
import './Loader.css';

const Loader = () => {
  return (
    <>
      <div className='flex-center loader'>
        <article className='container flex-column'>
          <NewtonsCradle size='120' speed='1.4' color='white' />
          <p>Cargando Contenido...</p>
        </article>
      </div>
    </>
  );
};

export default Loader;
