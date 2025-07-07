import React from 'react';
import VirtualizedTable from '../../components/VirtualizedTable/VirtualizedTable';
import { mockData } from './mockData';

const columns = ['id', 'name', 'email', 'role'];

export default function App() {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>User List</h1>
      <VirtualizedTable columns={columns} data={mockData} />
    </div>
  );
}
