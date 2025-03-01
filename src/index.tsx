import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './services/store';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

const container = document.getElementById('root');

if (!container)
  throw new Error('Root container not found. Unable to render react app.');

createRoot(container).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
