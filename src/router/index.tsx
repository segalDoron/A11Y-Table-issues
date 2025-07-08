import { createBrowserRouter } from 'react-router-dom';

import About from '@/pages/About/About';
import WelcomPage from '@/pages/WelcomPage/WelcomPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <WelcomPage />,
  },
  {
    path: '/a11y-issue',
    element: <About />,
  },
]);

export default router;