import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Stack } from '@mui/material';
import { DevTool } from '@hookform/devtools';

export interface FormProps {
  children: React.ReactNode;
  onSubmit: (data: any) => void;
}

export function Form({ children, onSubmit }: FormProps) {
  const methods = useForm();

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
            Submit
          </Button>
        </Stack>
      </form>
      <DevTool control={methods.control} />
    </FormProvider>
  );
}

export default Form;
