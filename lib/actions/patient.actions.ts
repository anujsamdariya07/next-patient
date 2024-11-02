// * 👇
'use server';
// * 👆

import { ID, Query } from 'node-appwrite';
import { BUCKET_ID, DATABASE_ID, databases, ENDPOINT, PATIENT_COLLECTION_ID, PROJECT_ID, storage, users } from '../appwrite.config';
import { parseStringify } from '../utils';
import { InputFile } from 'node-appwrite/file';

// For creating new user
export const createUser = async (user: CreateUserParams) => {
  try {
    console.log('Here...', user);

    const newuser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    console.log('New User: ', newuser);

    return parseStringify(newuser);
  } catch (error: any) {
    console.log('An error occurred!', error);
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal('email', [user.email])]);
      return documents?.users[0];
    }
  }
};

// For getting the already logged in user
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId)

    return parseStringify(user)
  } catch (error: any) {
    console.log('An error has occurred!', error)
  }
}

// For getting the registered patient
export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal('userId', userId)]
    )

    return parseStringify(patients.documents[0]);
  } catch (error: any) {
    console.log('An error has occurred!', error)
  }
}

// For regsitering patient 
export const registerPatient = async ({identificationDocument, ...patient}: RegisterUserParams) => {
  try {
    let file;
    
    console.log('11111')
    
    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get('blobFile') as Blob,
        identificationDocument?.get('fileName') as string,
      )

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }
    
    console.log('22222')
    console.log('PATIENT HERE: ', patient)

    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
        ...patient,
      }
    );

    return parseStringify(newPatient)
  } catch (error) {
    console.log(`ERROR🙀: ${error}`)
  }
}
