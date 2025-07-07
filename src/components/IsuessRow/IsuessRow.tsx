import React from 'react';
import {map} from 'lodash';

import { COLUMN_KEYS, type Issue } from '@/types/issues';
import './IsuessRow.css'

type RowProps = {
    index: number, 
    style: React.CSSProperties, 
    sortedData: Issue[], 
    sortAsc: boolean, 
    listSize: number 
}

const Row = ({ 
    index,
    style,
    sortAsc,
    listSize,
    sortedData,
 }: RowProps) => {
    
    if (!sortedData || !sortedData[index]) {
        return null;
    }

    const row = sortedData[index];

    return (
      <div
        className="row clickable-row"
        style={style}
        tabIndex={0}
        role="row"
        aria-label={`Row ${row.id}`}
        onClick={() => console.log('Row clicked:', row)}
        onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              window.alert(row);
            }
        }}
      >
        {map(COLUMN_KEYS, (colKey) => {
            const isIndexRow = colKey === 'rowIndex';
            const rowIndex = sortAsc ? index + 1 : listSize - index;

            return (
                <div 
                    key={colKey}
                    className="cell"
                    style={{flex: `${isIndexRow ? 'none': 1}`, width: `${isIndexRow ? '80px' : ''}`}}
                    title={String(isIndexRow ? `Row number ${rowIndex}` : row[colKey as keyof Issue])}
                >
                  {isIndexRow ? rowIndex : String(row[colKey as keyof Issue])}
                </div>
            )})}
      </div>
    );
  };

export default Row;