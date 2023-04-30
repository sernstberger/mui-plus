// import { Controller, RegisterOptions } from 'react-hook-form';
// import { InputProps as MuiInputProps } from '@mui/material';
// import { AnySchema } from 'yup';
// import { useMemo } from 'react';
// import { createValidator } from './createValidator';
// import { ControllerProps } from 'react-hook-form';

// // export interface RulesProps
// //   extends Omit<
// //     // RegisterOptions<TFieldValues, TName>,
// //     RegisterOptions<any, any>,
// //     'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
// //   > {
// //   label: any;
// //   validate: any;
// //   disabled?: boolean;
// //   required?: boolean;
// // }



// export function rules({
//   label,
//   min,
//   max,
//   minLength,
//   maxLength,
//   disabled,
//   required,
//   validate,
// }: RulesProps) {
//   return {
//     required: {
//       value: !disabled && required,
//       message: `${label} is required.`,
//     },

//     min: {
//       value: min as number,
//       message: `${label} has minimum of ${min}.`,
//     },
//     max: {
//       value: max as number,
//       message: `${label} has maximum of ${max}.`,
//     },

//     minLength: {
//       value: minLength as number,
//       message: `${label} has a minimum of ${minLength} characters.`,
//     },
//     maxLength: {
//       value: maxLength as number,
//       message: `${label} has a maximum of ${maxLength} characters.`,
//     },

//     validate: {
//       custom: validate,
//     },
//   };
// }





import { AnySchema } from 'yup';
import { validate } from './validate';

export interface RulesProps {
  // max?: {
  //   value: number;
  //   message: string;
  // };
  // min?: {
  //   value: number;
  //   message: string;
  // };
  // minLength?: {
  //   value: number;
  //   message: string;
  // };
  // maxLength?: {
  //   value: number;
  //   message: string;
  // };
  label: string;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  minDate?: Date;
  maxDate?: Date;
  required?: boolean;
  customValidation?: AnySchema;
  disabled?: boolean;
}

const rules = ({
  label,
  required = false,
  customValidation,
  disabled = false,
  minLength,
  maxLength,
  min,
  max,
  minDate,
  maxDate,
}: any) => {
  return {
    required: {
      value: !disabled && required,
      message: `${label} is required.`,
    },
    // valueAsNumber: true,
    min: {
      value: min,
      message: `${label} has minimum of ${min}.`,
    },
    max: {
      value: max,
      message: `${label} has maximum of ${max}.`,
    },

    minLength: {
      value: minLength,
      message: `${label} has a minimum of ${minLength} characters.`,
    },
    maxLength: {
      value: maxLength,
      message: `${label} has a maximum of ${maxLength} characters.`,
    },

    minDate: {
      value: minDate,
      message: `${label} has a minimum of ${minDate}.`,
    },

    maxDate: {
      value: maxDate,
      message: `${label} has a maximum of ${maxDate}.`,
    },

    validate: {
      // custom: (value: any) => validate(value, customValidation),
      custom: (value: AnySchema) => validate(value, customValidation),
    },
  };
};

export default rules;
