import { createBrowserRouter, Outlet } from 'react-router-dom';
import App from './components/app/app';
import { ProtectedRoute } from '@components';
import {
  ConstructorPage,
  Feed,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword,
  ForgotPassword,
  IngredientDetails,
  OrderInfo
} from '@pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          {
            path: 'profile',
            element: <Profile />
          },
          {
            path: 'profile/orders',
            element: <ProfileOrders />,
            children: [
              {
                path: ':id',
                element: <OrderInfo />
              }
            ]
          }
        ]
      },
      {
        path: '/',
        element: (
          <ProtectedRoute onlyUnAuth>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          {
            path: 'login',
            element: <Login />
          },
          {
            path: 'register',
            element: <Register />
          },
          {
            path: 'forgot-password',
            element: <ForgotPassword />
          },
          {
            path: 'reset-password',
            element: <ResetPassword />
          }
        ]
      },
      {
        index: true,
        element: <ConstructorPage />
      },
      {
        path: '/',
        element: <ConstructorPage />,
        children: [
          {
            path: 'ingredients/:ingredientId',
            element: <IngredientDetails />
          }
        ]
      },
      {
        path: 'feed',
        element: <Feed />,
        children: [
          {
            path: ':id',
            element: <OrderInfo />
          }
        ]
      },
      {
        path: '*',
        element: <NotFound404 />
      }
    ]
  }
]);
