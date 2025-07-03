import { createBrowserRouter } from 'react-router-dom';
import IsuessTable from '../pages/IsuessTable/IsuessTableContainer';
import About from '../pages/About';

const router = createBrowserRouter([
  {
    path: '/',
    element: <IsuessTable />,
  },
  {
    path: '/a11y-issue',
    element: <About />,
  },
]);

export default router;