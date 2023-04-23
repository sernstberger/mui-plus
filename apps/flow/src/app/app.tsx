import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import UserForm from './components/UserForm';
import UsersTable from './components/UsersTable';

function App() {
  return (
    <Provider store={store}>
      <div style={{ margin: '0 auto', maxWidth: 900, padding: 20 }}>
        <UserForm />
        <UsersTable />
      </div>
    </Provider>
  );
}

export default App;
