import React, { useEffect, useState } from 'react';
import { Message } from '@mui-plus/api-interfaces';
import { ContentGrid } from '@mui-plus/components';

export const App = () => {
  const [m, setMessage] = useState<Message>({ message: '' });

  useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then(setMessage);
  }, []);

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <ContentGrid />
      </div>
      <div>{m.message}</div>
    </>
  );
};

export default App;
