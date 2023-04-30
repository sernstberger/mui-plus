import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiSlider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';

export function Slider() {
  const [value, setValue] = React.useState<
    number | string | Array<number | string>
  >(30);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  return (
    <Box>
      <Typography id="input-slider" gutterBottom>
        Volume
      </Typography>

      <MuiSlider
        value={typeof value === 'number' ? value : 0}
        onChange={handleSliderChange}
        aria-labelledby="input-slider"
      />

      <MuiInput
        value={value}
        onChange={handleInputChange}
        onBlur={handleBlur}
        inputProps={{
          step: 10,
          min: 0,
          max: 100,
          type: 'number',
          'aria-labelledby': 'input-slider',
        }}
      />
    </Box>
  );
}

export default Slider;
