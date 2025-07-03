import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type TableInfo = {
  selectedRow: number;
};

type TableContextType = {
  tableInfo: TableInfo | null;
  setTableInfo: (tableInfo: TableInfo) => void;
};

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider = ({ children }: { children: ReactNode }) => {
  const [tableInfo, setTableInfo] = useState<TableInfo | null>(null);

  return (
    <TableContext.Provider value={{ tableInfo, setTableInfo }}>
      {children}
    </TableContext.Provider>
  );
}

export const useTable = () => {
  const context = useContext(TableContext);
  if (!context) throw new Error('TableInfo must be used within a TableProvider');
  return context;
}
