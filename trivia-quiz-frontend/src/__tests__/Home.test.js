import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../pages/index';
import { Provider } from 'react-redux';
import { store } from '../store';
import '@testing-library/jest-dom';

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
  }),
}));

test('renders Quiz Maker title and Create button', () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
  expect(screen.getByText(/QUIZ MAKER/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Create/i })).toBeInTheDocument();
});
