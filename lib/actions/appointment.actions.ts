'use server';

import { ID, Query } from 'node-appwrite';
import {
  APPOINTMENT_COLLECTION_ID,
  BUCKET_ID,
  DATABASE_ID,
  databases,
  ENDPOINT,
  messaging,
  PROJECT_ID,
} from '../appwrite.config';
import { formatDateTime, parseStringify } from '../utils';
import { Appointment, Patient } from '@/types/appwrite.types';
import { revalidatePath } from 'next/cache';

type UpdateAppointmentParams = {
  appointmentId: string;
  userId: string;
  appointment: Appointment;
  type: string;
};

export const createAppointment = async (
  appointmentData: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointmentData
    );

    return parseStringify(newAppointment);
  } catch (error) {
    console.log('🙀ERROR: ', error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );

    return parseStringify(appointment);
  } catch (error) {
    console.log('🙀ERROR: ', error);
  }
};

export const getRecentAppointments = async () => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc('$createdAt')]
    );

    const initialCounts = {
      scheduledCount: 0,
      cancelledCount: 0,
      pendingCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        if (appointment.status === 'scheduled') {
          acc.scheduledCount += 1;
        } else if (appointment.status === 'cancelled') {
          acc.cancelledCount += 1;
        } else if (appointment.status === 'pending') {
          acc.pendingCount += 1;
        }

        return acc;
      },
      initialCounts
    );

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };

    return parseStringify(data);
  } catch (error) {
    console.log('🙀ERROR: ', error);
  }
};

export const updateAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
}: {
  appointmentId: string;
  userId: string;
  appointment: {
    schedule: Date;
    status: Status;
    primaryPhysician: string;
    cancellationReason: string | undefined;
  };
  type: 'cancel' | 'schedule' | 'create';
}) => {
  try {
    const updatedAppointment = databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );

    if (!updatedAppointment) {
      throw new Error('Appointment Not Found!');
    }

    // TODO: Send SMS Notification
    const smsMessage = `
    Hi, it's NextPatient. 
    ${
      type === 'schedule'
        ? `
      Your appointment with ${appointment.primaryPhysician} has been scheduled on 
      ` +
          formatDateTime(appointment.schedule) +
          `🎊🥳`
        : `We regret to inform you that your appointment with ${appointment.primaryPhysician} has been cancelled 😞 for the following reason🧐:
        \n
        ${appointment.cancellationReason}
      Thanks for requesting an appointment.🙏
      You can again request an appointment according to your convinience.`
    }
    `;

    await sendSMSNotification(userId, smsMessage)

    revalidatePath('/admin');

    return parseStringify(updatedAppointment);
  } catch (error) {
    console.log('🙀ERROR: ', error);
  }
};

export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    );

    return parseStringify(message);
  } catch (error) {
    console.log('🙀ERROR: ', error);
  }
};
