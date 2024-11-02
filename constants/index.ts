export const GenderOptions = ['Male', 'Female', 'Other'];

export const PatientFormDefaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthDate: new Date(Date.now()),
  gender: 'Male' as Gender,
  address: '',
  occupation: '',
  emergencyContactName: '',
  emergencyContactNumber: '',
  primaryPhysician: '',
  insuranceProvider: '',
  insurancePolicyNumber: '',
  allergies: '',
  currentMedication: '',
  familyMedicalHistory: '',
  pastMedicalHistory: '',
  identificationType: 'Birth Certificate',
  identificationNumber: '',
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  'Birth Certificate',
  "Driver's License",
  'Medical Insurance Card/Policy',
  'Military ID Card',
  'National Identity Card',
  'Passport',
  'Resident Alien Card (Green Card)',
  'Social Security Card',
  'State ID Card',
  'Student ID Card',
  'Voter ID Card',
];

export const Doctors = [
  {
    image: '/assets/images/dr-green.png',
    name: 'John Green',
  },
  {
    image: '/assets/images/dr-cameron.png',
    name: 'Leila Cameron',
  },
  {
    image: '/assets/images/dr-livingston.png',
    name: 'David Livingston',
  },
  {
    image: '/assets/images/dr-peter.png',
    name: 'Evan Peter',
  },
  {
    image: '/assets/images/dr-powell.png',
    name: 'Jane Powell',
  },
  {
    image: '/assets/images/dr-remirez.png',
    name: 'Alex Ramirez',
  },
  {
    image: '/assets/images/dr-lee.png',
    name: 'Jasmine Lee',
  },
  {
    image: '/assets/images/dr-cruz.png',
    name: 'Alyana Cruz',
  },
  {
    image: '/assets/images/dr-sharma.png',
    name: 'Hardik Sharma',
  },
];

export const StatusIcon = {
  scheduled: '/assets/icons/check.svg',
  pending: '/assets/icons/pending.svg',
  cancelled: '/assets/icons/cancelled.svg',
};

export const Specializations = [
  {
    name: 'Cardiology',
    description: 'Heart and cardiovascular system',
  },
  {
    name: 'Dermatology',
    description: 'Skin, hair, and nails',
  },
  {
    name: 'Endocrinology',
    description: 'Hormones and endocrine glands',
  },
  {
    name: 'Gastroenterology',
    description: 'Digestive system and its disorders',
  },
  {
    name: 'Neurology',
    description: 'Nervous system, including the brain and spinal cord',
  },
  {
    name: 'Oncology',
    description: 'Cancer and its treatment',
  },
  {
    name: 'Orthopedics',
    description: 'Bones, joints, and muscles',
  },
  {
    name: 'Pediatrics',
    description: 'Medical care of infants, children, and adolescents',
  },
  {
    name: 'Psychiatry',
    description: 'Mental health and emotional disorders',
  },
  {
    name: 'Radiology',
    description: 'Medical imaging for diagnosis and treatment',
  },
  {
    name: 'Rheumatology',
    description: 'Joints, muscles, and autoimmune diseases',
  },
  {
    name: 'Urology',
    description: 'Urinary system and male reproductive organs',
  },
  {
    name: 'Pulmonology',
    description: 'Respiratory system and lungs',
  },
  {
    name: 'Obstetrics and Gynecology',
    description: 'Pregnancy, childbirth, and female reproductive system',
  },
  {
    name: 'Nephrology',
    description: 'Kidneys and urinary system',
  },
  {
    name: 'Ophthalmology',
    description: 'Eye and vision care',
  },
  {
    name: 'Hematology',
    description: 'Blood and blood-related diseases',
  },
  {
    name: 'Infectious Disease',
    description: 'Diseases caused by pathogens like bacteria and viruses',
  },
  {
    name: 'General Surgery',
    description: 'Operative treatment of injuries and diseases',
  },
  {
    name: 'Emergency Medicine',
    description: 'Immediate treatment of acute illnesses and injuries',
  },
];

export const Qualifications = [
  {
    name: 'MBBS',
    description:
      'Bachelor of Medicine, Bachelor of Surgery - Basic medical degree',
  },
  {
    name: 'MD',
    description:
      'Doctor of Medicine - Postgraduate degree for specialized medical training',
  },
  {
    name: 'DO',
    description:
      'Doctor of Osteopathic Medicine - Focuses on holistic and musculoskeletal approach',
  },
  {
    name: 'PhD',
    description:
      'Doctor of Philosophy - Research-based doctoral degree in a specific medical field',
  },
  {
    name: 'DNB',
    description:
      'Diplomate of National Board - Equivalent to MD/MS in various specializations',
  },
  {
    name: 'DM',
    description:
      'Doctorate of Medicine - Super-specialization postdoctoral degree',
  },
  {
    name: 'MCh',
    description:
      'Master of Chirurgiae - Advanced postgraduate degree in surgery',
  },
  {
    name: 'MSc',
    description:
      'Master of Science - Postgraduate degree in a specific medical or healthcare field',
  },
  {
    name: 'MPH',
    description:
      'Master of Public Health - Specialized in public health and preventive medicine',
  },
  {
    name: 'BDS',
    description: 'Bachelor of Dental Surgery - Basic dental degree',
  },
  {
    name: 'MDS',
    description:
      'Master of Dental Surgery - Postgraduate degree in a dental specialty',
  },
  {
    name: 'BPT',
    description:
      'Bachelor of Physiotherapy - Undergraduate degree for physical therapy',
  },
  {
    name: 'MPT',
    description:
      'Master of Physiotherapy - Advanced degree in physiotherapy specializations',
  },
  {
    name: 'BPharm',
    description:
      'Bachelor of Pharmacy - Undergraduate degree for pharmacy practice',
  },
  {
    name: 'MPharm',
    description:
      'Master of Pharmacy - Postgraduate degree in specialized pharmacy fields',
  },
  {
    name: 'DPharm',
    description: 'Diploma in Pharmacy - Basic diploma for pharmacy practice',
  },
  {
    name: 'BNYS',
    description:
      'Bachelor of Naturopathy and Yogic Sciences - Focus on natural healing and yoga therapy',
  },
  {
    name: 'BHMS',
    description:
      'Bachelor of Homeopathic Medicine and Surgery - Degree in homeopathy',
  },
  {
    name: 'BUMS',
    description:
      'Bachelor of Unani Medicine and Surgery - Degree in Unani system of medicine',
  },
  {
    name: 'BAMS',
    description:
      'Bachelor of Ayurvedic Medicine and Surgery - Degree in Ayurveda',
  },
  {
    name: 'MS',
    description:
      'Master of Surgery - Postgraduate degree focused on surgical specializations',
  },
];

export const PreferredConsultationModes = [
  {
    mode: 'In-Person',
    description: 'Face-to-face consultation at the clinic or hospital',
  },
  {
    mode: 'Telemedicine',
    description: 'Consultation via video call or telehealth platform',
  },
  {
    mode: 'Phone Call',
    description: 'Consultation over a standard phone call',
  },
  {
    mode: 'Home Visit',
    description: 'Doctor visits the patient at their home for consultation',
  },
  {
    mode: 'Online Chat',
    description: 'Consultation through an online chat or messaging service',
  },
];
