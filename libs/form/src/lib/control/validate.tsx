import { FieldValues } from 'react-hook-form';
import { AnySchema } from 'yup';

export const validate = (value: FieldValues, customValidation?: AnySchema) => {
  // console.log('value', value, customValidation)
  if (value) {
    const validator = () => {
      try {
        customValidation?.validateSync(value);
      } catch (e: any /* ValidationError*/) {
        return e.errors;
      }
    };

    const isValid = validator();
    return !isValid || isValid[0]; // if the input is valid, do nothing. If the input is invalid, return the error message.
  }
};
