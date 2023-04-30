import { useEffect, useState } from 'react';
import { LinearProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export function ProgressBar({ numberOfSteps }: any) {
  const currentStep = useSelector((state: RootState) => state.step.currentStep);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(((currentStep - 1) / numberOfSteps) * 100);
  }, [currentStep, numberOfSteps]);

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
