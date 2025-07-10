import { createBrowserRouter } from 'react-router-dom';

import About from '@/pages/About/About';
import WelcomePage from '@/pages/WelcomePage/WelcomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <WelcomePage />,
  },
  {
    path: '/a11y-issue',
    element: <About />,
  },
]);

export default router;