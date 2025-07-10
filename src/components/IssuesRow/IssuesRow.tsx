import React from 'react';
import {map} from 'lodash';
import { useNavigate } from 'react-router-dom';

import { useTableContext } from '@/context/TableContext';
import { COLUMN_KEYS, type Issue } from '@/types/issues';
import './IssuesRow.css'

type RowProps = {
    index: number, 
    style: React.CSSProperties, 
    sortedData: Issue[], 
    sortAsc: boolean, 
    listSize: number 
}

const IssuesRow = ({ 
    index,
    style,
    sortAsc,
    listSize,
    sortedData,
  }: RowProps) => {

    const navigate = useNavigate();
    const {setSelectedIssue, selectedIssueNumber, setSelectedIssueNumber } = useTableContext();

    
    if (!sortedData || !sortedData[index]) {
        return null;
    }

    const row = sortedData[index];

    const onClick = () => {
      setSelectedIssue(row);
      setSelectedIssueNumber(index);
      navigate('/a11y-issue')
    }

    return (
      <div
        className={`row clickable-row ${selectedIssueNumber === index?  'slected-row' : ''}`}
        style={style}
        tabIndex={0}
        role="row"
        aria-label={`Row ${row.id}`}
        onClick={onClick}
        onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onClick()
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

export default IssuesRow;