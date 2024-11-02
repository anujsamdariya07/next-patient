import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ManageDoctors = () => {
  return (
    <div className='text-white mx-auto flex max-w-7xl flex-col space-y-14'>
      <header className='admin-header'>
        <Link href={'/'} className='cursor-pointer'>
          <Image
            src={'/assets/icons/logo-full.svg'}
            height={32}
            width={162}
            alt='Logo'
            className='h-8 w-fit'
          />
        </Link>

        <p className='text-16-semibold'>Admin Dashboard</p>
      </header>

      <main className='admin-main'>
        <section className='w-full '>
          <h1 className='header'>Welcome👋</h1>
          <p className='text-dark-700 italic text-xl m-2'>
            "Easily manage your team of doctors: add new profiles, update
            details, or remove records as required.""
          </p>
        </section>

        <div className='w-full'>
          <h2 className='header'>Registered Doctors</h2>

          <div>{/* TODO: List of Doctors */}</div>

          <Link
            href={'/admin/manage-doctors/new-doctor'}
            className='bg-green-500 text-white p-2 rounded flex gap-2 w-fit'
          >
            Register New Doctor
            <Image
              src={'/assets/images/add-doctor.png'}
              alt='manage-logo'
              width={24}
              height={24}
            />
          </Link>
        </div>
      </main>
    </div>
  );
}

export default ManageDoctors