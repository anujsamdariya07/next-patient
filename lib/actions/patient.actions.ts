// * 👇
'use server'
// * 👆

import { ID, Query } from "node-appwrite"
import { users } from "../appwrite.config"
import { parseStringify } from "../utils";

// export const createUser = async (user: CreateUserParams) => {
//   try {
//     // Create new user -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create
//     console.log('Here...', user)
    
//     const newuser = await users.create(
//       ID.unique(),
//       user.email,
//       user.phone,
//       undefined,
//       user.name
//     );

//     console.log(`New User: ${newuser}`);

//     return parseStringify(newuser);
//   } catch (error: any) {
//     console.log('An error occurred!', error);
//     if (error && error?.code === 409) {
//       const documents = await users.list([Query.equal('email', [user.email])]);
//       return documents?.users[0];
//     }
//   }
// }

// CREATE APPWRITE USER

export const createUser = async (user: CreateUserParams) => {
  try {
    // Create new user -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    return parseStringify(newUser);
  } catch (error: any) {
    // Check existing user
    if (error && error?.code === 409) {
      const existingUser = await users.list([
        Query.equal('email', [user.email]),
      ]);

      return existingUser.users[0];
    }
    console.error('An error occurred while creating a new user:', error);
  }
};