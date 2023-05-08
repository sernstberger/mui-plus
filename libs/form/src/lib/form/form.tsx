import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Stack } from '@mui/material';
import { DevTool } from '@hookform/devtools';

export interface FormProps {
  children: React.ReactNode;
  onSubmit: (data: any) => void;
  submitText?: string;
}

export function Form({ children, onSubmit, submitText = 'Submit' }: FormProps) {
  const methods = useForm({
    defaultValues: {
      firstName: 'bill',
      lastName: 'luo',
      phone: '1234567890',
      email: 'woot@lkjadf.com',
      iceCream: 'vanilla',
      freeForm: 'test',
    },
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data: any) => {
          onSubmit(data);
          console.log('**submitted**', data);
        })}
        noValidate
      >
        <Stack spacing={2}>
          {children}

          <Button variant="contained" type="submit">
            {submitText}
          </Button>
        </Stack>
      </form>
      <DevTool control={methods.control} />
    </FormProvider>
  );
}

export default Form;
