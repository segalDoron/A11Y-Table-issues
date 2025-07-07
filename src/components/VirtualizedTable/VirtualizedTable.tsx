import React, { useRef, useState, useLayoutEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import { type ListChildComponentProps } from 'react-window';

import './VirtualizedTable.css';

type RowData = Record<string, unknown>;

type VirtualizedTableProps = {
  columns: string[];
  data: RowData[];
};

const HEADER_HEIGHT = 48;
const PADDING_HEIGHT = 36;

const VirtualizedTable = ({ columns, data } : VirtualizedTableProps) => {
  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [listHeight, setListHeight] = useState<number>(400);

  const setRowRef = (index: number) => (el: HTMLTableRowElement | null) => {
    rowRefs.current[index] = el;
  };

  useLayoutEffect(() => {
    const resize = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.getBoundingClientRect().height;
        const adjustedHeight = containerHeight - HEADER_HEIGHT - PADDING_HEIGHT;
        setListHeight(Math.max(100, adjustedHeight)); // prevent too small
      }
    };

    resize(); // initial
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const Row = ({ index, style }: ListChildComponentProps) => {
    const row = data[index];
    return (
      <tr
        role="button"
        tabIndex={0}
        ref={setRowRef(index)}
        onClick={() => console.log('Row clicked:', row)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            console.log('Activated row:', row);
          }
          if (e.key === 'ArrowDown' && rowRefs.current[index + 1]) {
            e.preventDefault();
            rowRefs.current[index + 1]?.focus();
          }
          if (e.key === 'ArrowUp' && rowRefs.current[index - 1]) {
            e.preventDefault();
            rowRefs.current[index - 1]?.focus();
          }
        }}
        className="clickable-row"
        aria-label={`View details for ${row[columns[0]]}`}
        style={style} // required by react-window to position row
      >
        {columns.map((colKey) => (
          <td key={colKey}>
            <span title={String(row[colKey] ?? '')}>{String(row[colKey] ?? '')}</span>
          </td>
        ))}
      </tr>
    );
  };

  return (
    <div className="table-container" ref={containerRef}>
      <table className="virtual-table">
        <thead>
          <tr>
            {columns.map((key) => (
              <th key={key}>
                <div className="th-content">
                  <span>{key}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
      </table>

      <div className="table-body-scroll">
        <table className="virtual-table">
          <tbody>
            <List
              height={listHeight}
              itemCount={data.length}
              itemSize={48}
              width="100%"
            >
              {Row}
            </List>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VirtualizedTable;