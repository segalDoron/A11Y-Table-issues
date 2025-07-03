import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import router from './router';
import './index.css';
import { TableProvider } from './context/TableContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TableProvider>
      <RouterProvider router={router} />
    </TableProvider>
  </React.StrictMode>
);
