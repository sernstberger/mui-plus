import * as React from 'react';
import TextField from '@mui/material/TextField';
import MuiAutocomplete from '@mui/material/Autocomplete';
import Control, { ControlProps } from '../control/control';

export interface AutocompleteProps extends Omit<ControlProps, 'children'> {
  options: any[];
}

export function Autocomplete({ options, ...rest }: AutocompleteProps) {
  const [inputValue, setInputValue] = React.useState('');

  return (
    <Control {...rest}>
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
          <MuiAutocomplete
            {...field}
            defaultValue={defaultValue}
            required={required}
            onChange={(event: any, newValue: string | null) => {
              field.onChange(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={options}
            isOptionEqualToValue={(option: any, value: any) => {
              console.log(
                field.value.label,
                inputValue,
                field.value.label === inputValue
                // option.title, value.title,
                // option.title === value.title
              );
              // return option.title === value.title;
              return field.value.label === inputValue;
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                helperText={helperText}
                error={!!fieldState.error}
              />
            )}
          />
        );
      }}
    </Control>
  );
}

export default Autocomplete;
