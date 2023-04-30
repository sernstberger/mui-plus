import { useEffect, useState } from 'react';
import { LinearProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export function ProgressBar({ numberOfSteps }: any) {
  const count = useSelector((state: RootState) => state.step.value);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(count / numberOfSteps * 100);
  }, [count, numberOfSteps]);

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
