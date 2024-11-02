import RegisterDoctor from '@/components/Forms/RegisterDoctor';
import Image from 'next/image';
import React from 'react';

const NewDoctor = () => {
  return (
    <div className='flex h-screen max-h-screen'>
      <section className='remove-scrollbar container my-auto m-0 ml-0 mr-[50%] overflow-y-auto'>
        <div className='sub-container max-w-[796px]'>
          <Image
            src='/assets/icons/logo-full.svg'
            height={1000}
            width={1000}
            alt='patient'
            className='mb-12 h-10 w-fit'
          />

          <RegisterDoctor />

          <div className='text-14-regular mt-20 flex justify-between'>
            <p className='justify-items-end text-dark-600 xl:text-left'>
              © 2024 Next Patient
            </p>
          </div>
        </div>
      </section>

      <Image
        src='/assets/images/register-img.png'
        height={1000}
        width={1000}
        alt='patient'
        className='side-img fixed top-0 right-0 h-screen max-w-[50%]'
      />
    </div>
  );
};

export default NewDoctor;
