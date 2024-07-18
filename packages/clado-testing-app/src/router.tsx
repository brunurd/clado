import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from './components/Home/HomePage';
import { AuthPage } from './components/Auth/AuthPage';
import { WelcomePage } from './components/Welcome/WelcomePage';
import { AuthenticatorProvider } from './contexts/AuthenticatorContext';

const router = createBrowserRouter(
  [
    {
      element: <AuthenticatorProvider />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/login',
          element: <AuthPage />,
        },
        {
          path: '/welcome',
          element: <WelcomePage />,
        },
        {
          path: '*',
          element: (
            <h1>Page not found...</h1>
          ),
        },
      ],
    },
  ],
);

export { router };
