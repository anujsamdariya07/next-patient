'use client';

import React, { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { decryptKey, encryptKey } from '@/lib/utils';

const PasskeyModal = () => {
  const router = useRouter();
  const path = usePathname()
  const [open, setOpen] = useState(true);
  const [passkey, setPasskey] = useState('')
  const [error, setError] = useState('')

  // We dont want the admin to login again if he already has the encrypted 
  // key in his local storage
  const encryptedKey = typeof window !== 'undefined' ? window.localStorage.getItem('accessKey'): null

  useEffect(() => {
    const accessKey = encryptedKey && decryptKey(encryptedKey)
    
    if (path) {
      if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        setOpen(false);
        router.push('/admin')
      } else {
        setOpen(true)
      }
    }
  }, [encryptedKey])

  const closeModal = () => {
    setOpen(false);
    router.push('/');
  };

  const validatePasskey = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()

    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passkey)

      localStorage.setItem('accessKey', encryptedKey)

      setOpen(false);
    } else {
      setError('Invalid Passkey! Please try again!')
    }
  }

  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className='shad-alert-dialog'>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-white flex items-start justify-between'>
              Admin Access Verification
              <Image
                src={'/assets/icons/close.svg'}
                alt='close'
                width={20}
                height={20}
                onClick={() => closeModal()}
                className='cursor-pointer'
              />
            </AlertDialogTitle>
            <AlertDialogDescription className='text-white'>
              To access the admin page, please enter the passkey!
            </AlertDialogDescription>

            <div>
              <InputOTP maxLength={6} value={passkey} onChange={value => setPasskey(value)}>
                <InputOTPGroup className='shad-otp text-white'>
                  <InputOTPSlot className='shad-otp-slot text-white' index={0} />
                  <InputOTPSlot className='shad-otp-slot text-white' index={1} />
                  <InputOTPSlot className='shad-otp-slot text-white' index={2} />
                  <InputOTPSlot className='shad-otp-slot text-white' index={3} />
                  <InputOTPSlot className='shad-otp-slot text-white' index={4} />
                  <InputOTPSlot className='shad-otp-slot text-white' index={5} />
                </InputOTPGroup>
              </InputOTP>

              {error && <p className='shad-error text-14-regular mt-4 flex justify-center'>{error}</p>}
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={(event) => validatePasskey(event)} className='text-white border border-white rounded shad-primary-btn w-full'>
              Enter Admin Passkey
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PasskeyModal;
