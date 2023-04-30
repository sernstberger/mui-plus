import { IconButton, InputAdornment, TextField } from '@mui/material';
import { string } from 'yup';
import Control, { ControlProps } from '../control/control';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

export interface PasswordProps extends Omit<ControlProps, 'children'> { }

export function Password({ fieldName, ...rest }: PasswordProps) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Control
      {...rest}
      fieldName={fieldName}
    // customValidation={string().email(
    //   `${rest.label} must be a valid Password address.`
    // )}
    >
      {({
        field,
        fieldState,
        formState,
        label,
        defaultValue,
        helperText,
        required,
      }: any) => (
        <TextField
          {...field}
          error={!!fieldState.error}
          defaultValue={defaultValue}
          label={label}
          helperText={helperText}
          required={required}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            'data-testid': "password",
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    </Control>
  );
}

export default Password;
