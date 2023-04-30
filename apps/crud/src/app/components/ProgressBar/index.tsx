import { useEffect, useState } from 'react';
import { LinearProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export function ProgressBar() {
  const count = useSelector((state: RootState) => state.step.value);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(count * 10);
  }, [count]);

  return (
    <div>
      <LinearProgress variant="determinate" value={progress} />
      <br />
      <Typography variant="body2" color="text.secondary">{`${Math.round(
        progress
      )}%`}</Typography>
    </div>
  );
}

export default ProgressBar;
