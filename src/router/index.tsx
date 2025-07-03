import { createBrowserRouter } from 'react-router-dom';
import IssuesTable from '../pages/IsuessTable/IssuesTableTableContainer';
import About from '../pages/About';

const router = createBrowserRouter([
  {
    path: '/',
    element: <IssuesTable />,
  },
  {
    path: '/a11y-issue',
    element: <About />,
  },
]);

export default router;