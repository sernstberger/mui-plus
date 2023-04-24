import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from './store';
import UsersTable from './components/UsersTable';
import UserFormPage from './pages/UserFormPage';

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<UsersTable />} />
        <Route path="/add" element={<UserFormPage />} />
        <Route path="/edit/:id" element={<UserFormPage />} />
      </Routes>
    </Provider>
  );
}

export default App;
