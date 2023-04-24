import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { store } from '../store';
import App from '../App';
import { server, rest } from './testServer';

test('renders user form and table', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen.getByRole('form')).toBeInTheDocument();
  expect(screen.getByRole('grid')).toBeInTheDocument();
});

test('handles form submission and displays new user', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  fireEvent.input(screen.getByLabelText('Name'), {
    target: { value: 'John Doe' },
  });

  fireEvent.input(screen.getByLabelText('Email'), {
    target: { value: 'john.doe@example.com' },
  });

  fireEvent.input(screen.getByLabelText('Favorite Ice Cream'), {
    target: { value: 'Chocolate' },
  });

  fireEvent.click(screen.getByText('Add User'));

  await waitFor(() =>
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  );
});

test('handles server errors', async () => {
  server.use(
    rest.post('/api/users', (req, res, ctx) => {
      return res(ctx.status(500), ctx.json({ message: 'Server error' }));
    })
  );

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  fireEvent.input(screen.getByLabelText('Name'), {
    target: { value: 'John Doe' },
  });

  fireEvent.input(screen.getByLabelText('Email'), {
    target: { value: 'john.doe@example.com' },
  });

  fireEvent.input(screen.getByLabelText('Favorite Ice Cream'), {
    target: { value: 'Chocolate' },
  });

  fireEvent.click(screen.getByText('Add User'));

  await waitFor(() =>
    expect(screen.getByText('Server error')).toBeInTheDocument()
  );
});
