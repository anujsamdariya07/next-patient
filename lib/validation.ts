import { z } from 'zod';

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), 'Invalid phone number'),
});

export const PatientFormValidation = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), 'Invalid phone number'),
  birthDate: z.coerce.date(),
  gender: z.enum(['Male', 'Female', 'Other']),
  address: z
    .string()
    .min(5, 'Address must be at least 5 characters')
    .max(500, 'Address must be at most 500 characters'),
  occupation: z
    .string()
    .min(2, 'Occupation must be at least 2 characters')
    .max(500, 'Occupation must be at most 500 characters'),
  emergencyContactName: z
    .string()
    .min(2, 'Contact name must be at least 2 characters')
    .max(50, 'Contact name must be at most 50 characters'),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      'Invalid phone number'
    ),
  primaryPhysician: z.string().min(2, 'Select at least one doctor'),
  insuranceProvider: z
    .string()
    .min(2, 'Insurance name must be at least 2 characters')
    .max(50, 'Insurance name must be at most 50 characters'),
  insurancePolicyNumber: z
    .string()
    .min(2, 'Policy number must be at least 2 characters')
    .max(50, 'Policy number must be at most 50 characters'),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: 'You must consent to treatment in order to proceed',
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: 'You must consent to disclosure in order to proceed',
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: 'You must consent to privacy in order to proceed',
    }),
});

export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, 'Select at least one doctor'),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, 'Reason must be at least 2 characters')
    .max(500, 'Reason must be at most 500 characters'),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, 'Select at least one doctor'),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, 'Select at least one doctor'),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, 'Reason must be at least 2 characters')
    .max(500, 'Reason must be at most 500 characters'),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case 'create':
      return CreateAppointmentSchema;
    case 'cancel':
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}

export const DoctorFormValidation = z.object({
  doctorId: z
    .string()
    .min(2, 'Doctor ID must be at least 2 characters')
    .max(50, 'Doctor ID must be at most 50 characters'),

  fullName: z
    .string()
    .min(2, 'Full Name must be at least 2 characters')
    .max(50, 'Full Name must be at most 50 characters'),

  dob: z.coerce.date(),

  gender: z.enum(['Male', 'Female', 'Other']),

  phoneNumber: z
    .string()
    .refine(
      (phoneNumber) => /^\+\d{10,15}$/.test(phoneNumber),
      'Invalid phone number'
    ),

  email: z.string().email('Invalid email address'),

  address: z
    .string()
    .min(5, 'Address must be at least 5 characters')
    .max(500, 'Address must be at most 500 characters'),

  specialization: z
    .string()
    .min(2, 'Specialization must be at least 2 characters')
    .max(100, 'Specialization must be at most 100 characters'),

  qualifications: z
    .string()
    .min(2, 'Qualifications must be at least 2 characters')
    .max(500, 'Qualifications must be at most 500 characters'),

  yearsOfExperience: z
    .string()
    .refine(
      (value) => /^[0-9]+$/.test(value),
      'Experience must be a valid number'
    ),

  medicalLicenseNumber: z.string().optional(),

  licenseExpiryDate: z.coerce.date(),

  languagesSpoken: z.string().optional(),

  affiliations: z.string().optional(),

  consultationHours: z
    .string()
    .min(2, 'Consultation hours must be at least 2 characters')
    .max(100, 'Consultation hours must be at most 100 characters'),

  preferredConsultationMode: z
    .string()
    .min(2, 'Consultation mode must be at least 2 characters')
    .max(50, 'Consultation mode must be at most 50 characters'),

  consultationFee: z
    .string()
    .optional()
    .refine(
      (value) => /^[0-9]+(\.[0-9]{1,2})?$/.test(value!),
      'Fee must be a valid number'
    ),

  workAddress: z.string().optional(),

  workNumber: z
    .string()
    .optional()
    .refine(
      (workNumber) => /^\+\d{10,15}$/.test(workNumber!),
      'Invalid work number'
    ),

  medicalLicenseDocument: z.custom<File[]>().optional(),

  photoIDProof: z.custom<File[]>().optional(),
});
