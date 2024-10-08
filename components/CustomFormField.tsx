'use client';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';
import { FormFieldType } from './Forms/PatientForm';
import Image from 'next/image';
import { useState } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput, { Value } from 'react-phone-number-input';

interface CustomProps {
  // TODO: Study this Control<any>
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: string;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

// Functional component for rendering all kinds of input
const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  const { fieldType, iconSrc, iconAlt, placeholder } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className='flex rounded-md border-dark-500 bg-dark-400'>
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || 'icon'}
              className='mx-2'
            />
          )}

          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className='shad-input border-0 focus:border-2'
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry='IN'
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as Value | undefined}
            onChange={field.onChange}
            className='input-phone shad-input border-0 focus:border-2'
          />

          {/* <Input
          placeholder={placeholder}
          type='number'
          {...field}
          className='shad-input border-0 focus:border-2'
        /> */}
        </FormControl>
      );
  }
};

{
  /* Making a custom Formfield component */
}
const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex-1'>
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderInput field={field} props={props} />

          <FormMessage className='shad-error' />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
