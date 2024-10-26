'use client'

import React, { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import AppointmentForm from './Forms/AppointmentForm';
import { Appointment } from '@/types/appwrite.types';

const AppointmentModal = ({
    type,
    patientId, 
    userId,
    appointment
  }: {
    type: 'schedule' | 'cancel',
    patientId: string,
    userId: string,
    appointment?: Appointment
  }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <h6
          className={`capitalize ${
            type === 'schedule' && 'text-green-500 bg-green-950'
          } ${
            type === 'cancel' && 'text-red-500 bg-red-950'
          } p-1`}
        >
          {type}
        </h6>
      </DialogTrigger>
      <DialogContent className='shad-dialog sm:max-w-md'>
        <DialogHeader className='mb-4 space-y-3'>
          <DialogTitle className='text-white capitalize'>
            {type} Appointment
          </DialogTitle>
          <DialogDescription className='text-white'>
            Please fill in the following details to {type} an appointment
          </DialogDescription>
        </DialogHeader>
        <AppointmentForm
          userId={userId}
          patientId={patientId}
          type={type}
          appointment={appointment}
          setOpen={setOpen}
        />
        <DialogFooter className='sm:justify-start'>
          <DialogClose asChild>
            <Button
              type='button'
              variant='secondary'
              className='text-white border-white border rounded'
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
