'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import CustomFormField from '../CustomFormField';
import SubmitButton from '../SubmitButton';
import { useState } from 'react';
import { getAppointmentSchema, UserFormValidation } from '@/lib/validation';
import { createUser } from '@/lib/actions/patient.actions';
import { useRouter } from 'next/navigation';
import { FormFieldType } from './PatientForm';
import { Doctors } from '@/constants';
import { SelectItem } from '../ui/select';
import Image from 'next/image';
import { createAppointment, updateAppointment } from '@/lib/actions/appointment.actions';
import { Appointment } from '@/types/appwrite.types';

const AppointmentForm = ({
  userId,
  type,
  patientId,
  appointment,
  setOpen,
}: {
  userId: string;
  type: 'cancel' | 'create' | 'schedule';
  patientId: string;
  appointment?: Appointment;
  setOpen?: (open: boolean) => void;
}) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  let buttonLabel;

  switch (type) {
    case 'cancel':
      buttonLabel = 'Cancel Appointment';
      break;
    case 'create':
      buttonLabel = 'Create Appointment';
      break;
    case 'schedule':
      buttonLabel = 'Schedule Appointment';
      break;

    default:
      break;
  }

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment.primaryPhysician: '',
      schedule: appointment ? new Date(appointment.schedule): new Date(Date.now()),
      reason: appointment ? appointment.reason: '',
      // ERROR: Not able to schedule the pending ones but by remving the ternary operator below in note and cancellationReason fixed it
      note: appointment?.note || '',
      cancellationReason: appointment?.cancellationReason! || '',
    },
  });
  
  const onSubmit = async (
    values: z.infer<typeof AppointmentFormValidation>
  ) => {
    console.log('ONSUBMIT called, type:', type);
    console.log('Form values:', values);
    
    setIsLoading(true);

    let status;

    switch (type) {
      case 'cancel':
        status = 'cancelled';
        break;
      case 'schedule':
        status = 'scheduled';
        break;

      default:
        status = 'pending';
        break;
    }

    try {
      if (type === 'create' && patientId) {
        console.log('HERE');

        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          note: values.note,
          status: status as Status,
          reason: values.reason!,
        };

        const appointment = await createAppointment(appointmentData);

        console.log(appointment);

        if (appointment) {
          // Successfully created appointment
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
          );
        }
      } else {
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?.$id!,
          appointment: {
            primaryPhysician: values?.primaryPhysician!,
            schedule: new Date(values?.schedule),
            status: status as Status,
            cancellationReason: type === 'cancel' ? values?.cancellationReason : undefined,
          },
          type,
        };
  
        const updatedAppointment = await updateAppointment(appointmentToUpdate);
        console.log('UP: ', updatedAppointment)
  
        if (updatedAppointment) {
          setOpen && setOpen(false)
          form.reset()
        } else {
          console.log('Hello')
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log('Rendering form, type:', type);
  console.log('Form values:', form.getValues());

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 text-white flex-1'
      >
        {type === 'create' && (<section className='mb-12 space-y-4'>
          <h1 className='header'>New Appointment🆕</h1>
          <p className='text-dark-700'>
            Request a new appointment in 10 seconds
          </p>
        </section>)}

        {type !== 'cancel' && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name='primaryPhysician'
              label='Doctor'
              placeholder='Select a doctor'
              // defaultValue={}
            >
              {Doctors.map((doctor) => (
                <SelectItem key={doctor.name} value={doctor.name}>
                  <div className='flex cursor-pointer items-center gap-2'>
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt={doctor.name}
                      className='rounded-full border border-dark-500'
                    />
                    <p className='text-white'>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name='schedule'
              label='Expected Appointment Date'
              showTimeSelect
              dateFormat='MM/dd/yyyy - h:mm aa'
            />

            <div className='flex flex-col gap-6 xl:flex-row'>
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name='reason'
                label='Reason for appointment'
                placeholder='Enter the reason for appointment'
              />

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name='note'
                label='Note'
                placeholder='Enter a note'
              />
            </div>
          </>
        )}

        {type === 'cancel' && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name='cancellationReason'
            label='Reason for cancellation'
            placeholder='Enter the reason for cancellation'
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${
            type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'
          } w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
