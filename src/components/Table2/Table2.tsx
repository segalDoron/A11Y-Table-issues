import React, { useState } from 'react';
import './SortableTable.css';

export type TableRow = {
  id: number;
  name: string;
  email: string;
  role: string;
  team: string;
  department: string;
  location: string;
};

const SortableTable = () => {
  const data: TableRow[] = [
    {
      id: 1,
      name: 'Catherine Longlastname With Extra Extra Longness',
      email: 'catherine.withaveryverylongemail@example.com',
      role: 'Accessibility Engineering Coordinator of UX',
      team: 'Design Strategy',
      department: 'Human-Centered Design',
      location: 'New York City HQ',
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob@example.com',
      role: 'Editor',
      team: 'UI/UX',
      department: 'Product',
      location: 'Berlin',
    },
    {
      id: 3,
      name: 'Catherine Longlastname',
      email: 'cat@example.com',
      role: 'Viewer',
      team: 'Research',
      department: 'R&D',
      location: 'San Francisco',
    },
  ];

  const [sortKey, setSortKey] = useState<keyof TableRow>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: keyof TableRow) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aVal = a[sortKey]?.toString().toLowerCase() || '';
    const bVal = b[sortKey]?.toString().toLowerCase() || '';
    return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
  });

  const columns: (keyof TableRow)[] = ['name', 'email', 'role', 'team', 'department', 'location'];

  return (
    <div className="table-container" role="region" aria-label="Accecabilty issues Table">
      <table className="table-root">
        <thead>
          <tr>
            {columns.map((key) => (
              <th 
                key={key}
                scope="col"
                className={sortKey === key ? 'active-sorted-cloumn' : undefined}
              >
                <div className="th-content">
                  <span title={key.charAt(0).toUpperCase() + key.slice(1)}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleSort(key)}
                    aria-label={`Sort by ${key}`}
                    className="sort-icon"
                  >
                    {sortKey === key ? (sortOrder === 'asc' ? '▲' : '▼') : '↕'}
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
      </table>
      <div className="table-body-scroll">
        <table className="table-root">
          <tbody>
            {sortedData.map((row) => (
              <tr
                key={row.id}
                onClick={() => window.alert(row)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.alert(row);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${row.name}`}
                className="clickable-row"
              >
                {columns.map((key) => (
                  <td key={key}>
                    <span title={`${row[key]}`}>{row[key]}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SortableTable;