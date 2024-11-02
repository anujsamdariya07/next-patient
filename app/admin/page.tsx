import { DataTable } from '@/components/table/DataTable';
import StatCard from '@/components/StatCard';
import { getRecentAppointments } from '@/lib/actions/appointment.actions';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { columns } from '@/components/table/columns';
import { Button } from '@/components/ui/button';


const Admin = async () => {
  
  const appointments = await getRecentAppointments();

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
        <section className='w-full space-y-4 flex justify-between'>
          <div>
            <h1 className='header'>Welcome👋</h1>
            <p className='text-dark-700'>
              Start the day with managing new appointments
            </p>
          </div>
          <div>
            <Link 
              href={'/admin/manage-doctors'}
              className='bg-green-500 text-white p-2 rounded flex gap-2'
            >
              Manage Doctors
              <Image
                src={'/assets/images/manage-doctors.png'}
                alt='manage-logo'
                width={24}
                height={24}
              />
            </Link>
          </div>
        </section>

        <section className='admin-stat'>
          <StatCard
            type='appointments'
            count={appointments.scheduledCount}
            label='Scheduled Appointments'
            icon='/assets/icons/appointments.svg'
          />
          <StatCard
            type='pending'
            count={appointments.pendingCount}
            label='Pending Appointments'
            icon='/assets/icons/pending.svg'
          />
          <StatCard
            type='cancelled'
            count={appointments.cancelledCount}
            label='Cancelled Appointments'
            icon='/assets/icons/cancelled.svg'
          />
        </section>

        <DataTable columns={columns} data={appointments.documents} />
        {/* <DataTable columns={columns} data={data} /> */}
      </main>
    </div>
  );
};

export default Admin;
