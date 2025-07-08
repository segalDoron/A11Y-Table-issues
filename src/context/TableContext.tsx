import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

import type { Issue } from '@/types/issues';

export type TableInfo = {
  tableData: Issue[] | undefined;
  selectedIssue: Issue | null;
  selectedIssueNumber: number | null,
  setSelectedIssueNumber: (number: number) => void
  setTableData: (data: Issue[]) => void;
  setSelectedIssue: (issue: Issue | null) => void;
};

const TableContext = createContext<TableInfo | undefined>(undefined);

export const TableProvider = ({ children }: { children: ReactNode }) => {
  const [tableData, setTableData] = useState<Issue[] | undefined>(undefined);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [selectedIssueNumber, setSelectedIssueNumber] = useState<number | null>(null)

  const value: TableInfo = {
    tableData,
    selectedIssue,
    setTableData,
    setSelectedIssue,
    selectedIssueNumber,
    setSelectedIssueNumber,
  }

  return (
    <TableContext.Provider value={value}>
      {children}
    </TableContext.Provider>
  );
}

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error('TableInfo must be used within a TableProvider');
  }
  return context;
}
