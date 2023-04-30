import {
  Box,
  Checkbox,
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  List,
  ListItem,
  Stack,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';
import Control, { ControlProps } from '../control/control';

interface OptionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  label: string;
}

export interface CheckboxGroupProps
  extends Omit<ControlProps, 'children' | 'min' | 'max'> {
  options: OptionProps[];
}

export function CheckboxGroup({
  fieldName,
  required = false,
  options,
  ...rest
}: CheckboxGroupProps) {
  const { setValue } = useFormContext()

  return (


    <Control {...rest} fieldName={fieldName}>
      {({
        field,
        fieldState,
        formState,
        label,
        defaultValue,
        helperText,
        required,
      }: any) => {

        return (
          // <TextField
          //   {...field}
          //   error={!!fieldState.error}
          //   defaultValue={defaultValue}
          //   label={label}
          //   helperText={helperText}
          //   required={required}
          // />

          <FormControl
            component="fieldset"
            // variant="standard"
            {...field}
            required={required}
          >
            <FormLabel component="legend">{label}</FormLabel>
            <FormGroup>
              {options.map((option: OptionProps, index: number) => {
                return <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={field.value.includes(option.value)}
                      // onChange={field.onChange}
                      onChange={(e: any) => {
                        console.log('!!!', e.target.checked, field.value, option.value)

                        return [...field.value, option.value]
                        //   let foo: any[] = [];
                        //   if (e.target.checked) {
                        //     foo = [...value, 'dog'];
                        //   } else {
                        //     foo = [...value.filter((text: any) => text !== 'dog')];
                        //   }
                        //   console.log('e', option.value, 'isChecked', e.target.checked, { value });
                        //   // onChange(foo);
                        //   setValue(fieldName, foo)
                      }}
                      name={option.value}


                    />
                  }
                  label={option.label}
                />
              })}
            </FormGroup>

            {helperText ? (
              <FormHelperText>
                {helperText}
              </FormHelperText>
            ) : null}
          </FormControl>
        );
      }}
    </Control>
  );
}

export default CheckboxGroup;
