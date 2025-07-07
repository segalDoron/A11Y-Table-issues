import { createBrowserRouter } from 'react-router-dom';
// import IssuesTable from '../pages/IsuessTable/IssuesTableTableContainer';
import About from '@/pages/About';
import Table from '@/components/Table/Table';
import TableTwo from '@/components/Table2/Table2';
import IsuessTablePage from '@/pages/IsuessTablePage/IsuessTablePage';
import WelcomPage from '@/pages/WelcomPage/WelcomPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <WelcomPage />,
  },
  // {
  //   path: '/',
  //   element: <IssuesTable />,
  // },
  {
    path: '/a11y-issue',
    element: <About />,
  },
  {
    path: '/a11y-issue-table',
    element: <Table />,
  },
  {
    path: '/a11y-issue-table-2',
    element: <TableTwo />,
  },
    {
    path: '/a11y-issue-table-virtual',
    element: <IsuessTablePage />,
  },
]);

export default router;