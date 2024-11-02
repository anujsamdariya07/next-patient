'use server';

export const registerDoctor = async ({
  photoIDProof,
  medicalLicenseDocument,
  ...doctor
}: CreateDoctorParams) => {
  console.log('DOCTOR:', doctor);
};
